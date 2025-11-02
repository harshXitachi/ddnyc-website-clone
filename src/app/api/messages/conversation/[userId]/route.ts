import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages, users } from '@/db/schema';
import { eq, and, or, asc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const searchParams = request.nextUrl.searchParams;
    
    // Get query parameters
    const currentUserId = searchParams.get('currentUserId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate userId parameter
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json({ 
        error: "Valid user ID parameter is required",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    // Validate currentUserId query parameter
    if (!currentUserId || isNaN(parseInt(currentUserId))) {
      return NextResponse.json({ 
        error: "Valid currentUserId query parameter is required",
        code: "INVALID_CURRENT_USER_ID" 
      }, { status: 400 });
    }

    const userIdInt = parseInt(userId);
    const currentUserIdInt = parseInt(currentUserId);

    // Validate cannot have conversation with yourself
    if (userIdInt === currentUserIdInt) {
      return NextResponse.json({ 
        error: "Cannot have a conversation with yourself",
        code: "SAME_USER_CONVERSATION" 
      }, { status: 400 });
    }

    // Validate both users exist
    const [currentUser] = await db.select()
      .from(users)
      .where(eq(users.id, currentUserIdInt))
      .limit(1);

    if (!currentUser) {
      return NextResponse.json({ 
        error: "Current user not found",
        code: "CURRENT_USER_NOT_FOUND" 
      }, { status: 404 });
    }

    const [otherUser] = await db.select()
      .from(users)
      .where(eq(users.id, userIdInt))
      .limit(1);

    if (!otherUser) {
      return NextResponse.json({ 
        error: "User not found",
        code: "USER_NOT_FOUND" 
      }, { status: 404 });
    }

    // Fetch conversation messages
    const conversationMessages = await db.select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderId, currentUserIdInt),
            eq(messages.receiverId, userIdInt)
          ),
          and(
            eq(messages.senderId, userIdInt),
            eq(messages.receiverId, currentUserIdInt)
          )
        )
      )
      .orderBy(asc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count of messages in conversation
    const allConversationMessages = await db.select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderId, currentUserIdInt),
            eq(messages.receiverId, userIdInt)
          ),
          and(
            eq(messages.senderId, userIdInt),
            eq(messages.receiverId, currentUserIdInt)
          )
        )
      );

    // Fetch sender and receiver details for each message
    const messagesWithDetails = await Promise.all(
      conversationMessages.map(async (message) => {
        const [sender] = await db.select({
          id: users.id,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl
        })
          .from(users)
          .where(eq(users.id, message.senderId))
          .limit(1);

        const [receiver] = await db.select({
          id: users.id,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl
        })
          .from(users)
          .where(eq(users.id, message.receiverId))
          .limit(1);

        return {
          id: message.id,
          senderId: message.senderId,
          receiverId: message.receiverId,
          jobId: message.jobId,
          content: message.content,
          read: message.read,
          createdAt: message.createdAt,
          sender: sender || null,
          receiver: receiver || null
        };
      })
    );

    return NextResponse.json({
      messages: messagesWithDetails,
      total: allConversationMessages.length,
      otherUser: {
        id: otherUser.id,
        name: otherUser.name,
        email: otherUser.email,
        avatarUrl: otherUser.avatarUrl
      }
    }, { status: 200 });

  } catch (error) {
    console.error('GET conversation messages error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}