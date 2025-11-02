import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages, users, jobPostings } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const message = await db
        .select()
        .from(messages)
        .where(eq(messages.id, parseInt(id)))
        .limit(1);

      if (message.length === 0) {
        return NextResponse.json(
          { error: 'Message not found', code: 'MESSAGE_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(message[0], { status: 200 });
    }

    // List with pagination and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const senderId = searchParams.get('senderId');
    const receiverId = searchParams.get('receiverId');
    const jobId = searchParams.get('jobId');
    const read = searchParams.get('read');

    let query = db.select().from(messages);

    // Build filter conditions
    const conditions = [];
    if (senderId) {
      conditions.push(eq(messages.senderId, parseInt(senderId)));
    }
    if (receiverId) {
      conditions.push(eq(messages.receiverId, parseInt(receiverId)));
    }
    if (jobId) {
      conditions.push(eq(messages.jobId, parseInt(jobId)));
    }
    if (read !== null && read !== undefined) {
      conditions.push(eq(messages.read, read === 'true'));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderId, receiverId, content, jobId, read } = body;

    // Validate required fields
    if (!senderId) {
      return NextResponse.json(
        { error: 'Sender ID is required', code: 'MISSING_SENDER_ID' },
        { status: 400 }
      );
    }

    if (!receiverId) {
      return NextResponse.json(
        { error: 'Receiver ID is required', code: 'MISSING_RECEIVER_ID' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required', code: 'MISSING_CONTENT' },
        { status: 400 }
      );
    }

    // Validate senderId exists in users table
    const sender = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(senderId)))
      .limit(1);

    if (sender.length === 0) {
      return NextResponse.json(
        { error: 'Sender user not found', code: 'INVALID_SENDER' },
        { status: 400 }
      );
    }

    // Validate receiverId exists in users table
    const receiver = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(receiverId)))
      .limit(1);

    if (receiver.length === 0) {
      return NextResponse.json(
        { error: 'Receiver user not found', code: 'INVALID_RECEIVER' },
        { status: 400 }
      );
    }

    // Validate jobId if provided
    if (jobId) {
      const job = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.id, parseInt(jobId)))
        .limit(1);

      if (job.length === 0) {
        return NextResponse.json(
          { error: 'Job posting not found', code: 'INVALID_JOB' },
          { status: 400 }
        );
      }
    }

    // Create message
    const messageData: any = {
      senderId: parseInt(senderId),
      receiverId: parseInt(receiverId),
      content: content.trim(),
      read: read !== undefined ? Boolean(read) : false,
      createdAt: Date.now(),
    };

    if (jobId) {
      messageData.jobId = parseInt(jobId);
    }

    const newMessage = await db.insert(messages).values(messageData).returning();

    return NextResponse.json(newMessage[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { senderId, receiverId, content, jobId, read } = body;

    // Check if message exists
    const existingMessage = await db
      .select()
      .from(messages)
      .where(eq(messages.id, parseInt(id)))
      .limit(1);

    if (existingMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message not found', code: 'MESSAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate senderId if provided
    if (senderId) {
      const sender = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(senderId)))
        .limit(1);

      if (sender.length === 0) {
        return NextResponse.json(
          { error: 'Sender user not found', code: 'INVALID_SENDER' },
          { status: 400 }
        );
      }
    }

    // Validate receiverId if provided
    if (receiverId) {
      const receiver = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(receiverId)))
        .limit(1);

      if (receiver.length === 0) {
        return NextResponse.json(
          { error: 'Receiver user not found', code: 'INVALID_RECEIVER' },
          { status: 400 }
        );
      }
    }

    // Validate jobId if provided
    if (jobId) {
      const job = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.id, parseInt(jobId)))
        .limit(1);

      if (job.length === 0) {
        return NextResponse.json(
          { error: 'Job posting not found', code: 'INVALID_JOB' },
          { status: 400 }
        );
      }
    }

    // Build update object
    const updateData: any = {};
    if (senderId !== undefined) updateData.senderId = parseInt(senderId);
    if (receiverId !== undefined) updateData.receiverId = parseInt(receiverId);
    if (content !== undefined) updateData.content = content.trim();
    if (jobId !== undefined) updateData.jobId = parseInt(jobId);
    if (read !== undefined) updateData.read = Boolean(read);

    const updated = await db
      .update(messages)
      .set(updateData)
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if message exists
    const existingMessage = await db
      .select()
      .from(messages)
      .where(eq(messages.id, parseInt(id)))
      .limit(1);

    if (existingMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message not found', code: 'MESSAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(messages)
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Message deleted successfully',
        deleted: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if message exists
    const existingMessage = await db
      .select()
      .from(messages)
      .where(eq(messages.id, parseInt(id)))
      .limit(1);

    if (existingMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message not found', code: 'MESSAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Mark message as read
    const updated = await db
      .update(messages)
      .set({ read: true })
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}