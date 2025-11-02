import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jobApplications, jobPostings, workerProfiles } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

const VALID_STATUSES = ['pending', 'reviewing', 'accepted', 'rejected'] as const;
type ApplicationStatus = typeof VALID_STATUSES[number];

function isValidStatus(status: string): status is ApplicationStatus {
  return VALID_STATUSES.includes(status as ApplicationStatus);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const application = await db
        .select()
        .from(jobApplications)
        .where(eq(jobApplications.id, parseInt(id)))
        .limit(1);

      if (application.length === 0) {
        return NextResponse.json(
          { error: 'Job application not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(application[0], { status: 200 });
    }

    // List with pagination and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');
    const jobId = searchParams.get('jobId');
    const workerId = searchParams.get('workerId');

    let query = db.select().from(jobApplications);

    // Build filter conditions
    const conditions = [];

    if (status) {
      if (!isValidStatus(status)) {
        return NextResponse.json(
          { error: 'Invalid status. Must be one of: pending, reviewing, accepted, rejected', code: 'INVALID_STATUS' },
          { status: 400 }
        );
      }
      conditions.push(eq(jobApplications.status, status));
    }

    if (jobId) {
      if (isNaN(parseInt(jobId))) {
        return NextResponse.json(
          { error: 'Valid jobId is required', code: 'INVALID_JOB_ID' },
          { status: 400 }
        );
      }
      conditions.push(eq(jobApplications.jobId, parseInt(jobId)));
    }

    if (workerId) {
      if (isNaN(parseInt(workerId))) {
        return NextResponse.json(
          { error: 'Valid workerId is required', code: 'INVALID_WORKER_ID' },
          { status: 400 }
        );
      }
      conditions.push(eq(jobApplications.workerId, parseInt(workerId)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const applications = await query
      .orderBy(desc(jobApplications.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(applications, { status: 200 });
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
    const { jobId, workerId, coverLetter, resumeUrl, status } = body;

    // Validate required fields
    if (!jobId) {
      return NextResponse.json(
        { error: 'jobId is required', code: 'MISSING_JOB_ID' },
        { status: 400 }
      );
    }

    if (!workerId) {
      return NextResponse.json(
        { error: 'workerId is required', code: 'MISSING_WORKER_ID' },
        { status: 400 }
      );
    }

    // Validate jobId is a valid integer
    if (isNaN(parseInt(jobId))) {
      return NextResponse.json(
        { error: 'Valid jobId is required', code: 'INVALID_JOB_ID' },
        { status: 400 }
      );
    }

    // Validate workerId is a valid integer
    if (isNaN(parseInt(workerId))) {
      return NextResponse.json(
        { error: 'Valid workerId is required', code: 'INVALID_WORKER_ID' },
        { status: 400 }
      );
    }

    // Validate jobId exists in jobPostings
    const jobExists = await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.id, parseInt(jobId)))
      .limit(1);

    if (jobExists.length === 0) {
      return NextResponse.json(
        { error: 'Job posting not found', code: 'JOB_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Validate workerId exists in workerProfiles
    const workerExists = await db
      .select()
      .from(workerProfiles)
      .where(eq(workerProfiles.id, parseInt(workerId)))
      .limit(1);

    if (workerExists.length === 0) {
      return NextResponse.json(
        { error: 'Worker profile not found', code: 'WORKER_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Validate status if provided
    const applicationStatus: ApplicationStatus = status || 'pending';
    if (status && !isValidStatus(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, reviewing, accepted, rejected', code: 'INVALID_STATUS' },
        { status: 400 }
      );
    }

    // Create new application
    const now = Date.now();
    const newApplication = await db
      .insert(jobApplications)
      .values({
        jobId: parseInt(jobId),
        workerId: parseInt(workerId),
        status: applicationStatus,
        coverLetter: coverLetter?.trim() || null,
        resumeUrl: resumeUrl?.trim() || null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newApplication[0], { status: 201 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { jobId, workerId, coverLetter, resumeUrl, status } = body;

    // Check if record exists
    const existing = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job application not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate jobId if provided
    if (jobId !== undefined) {
      if (isNaN(parseInt(jobId))) {
        return NextResponse.json(
          { error: 'Valid jobId is required', code: 'INVALID_JOB_ID' },
          { status: 400 }
        );
      }

      const jobExists = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.id, parseInt(jobId)))
        .limit(1);

      if (jobExists.length === 0) {
        return NextResponse.json(
          { error: 'Job posting not found', code: 'JOB_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Validate workerId if provided
    if (workerId !== undefined) {
      if (isNaN(parseInt(workerId))) {
        return NextResponse.json(
          { error: 'Valid workerId is required', code: 'INVALID_WORKER_ID' },
          { status: 400 }
        );
      }

      const workerExists = await db
        .select()
        .from(workerProfiles)
        .where(eq(workerProfiles.id, parseInt(workerId)))
        .limit(1);

      if (workerExists.length === 0) {
        return NextResponse.json(
          { error: 'Worker profile not found', code: 'WORKER_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Validate status if provided
    if (status !== undefined && !isValidStatus(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, reviewing, accepted, rejected', code: 'INVALID_STATUS' },
        { status: 400 }
      );
    }

    // Build update object
    const updates: any = {
      updatedAt: Date.now(),
    };

    if (jobId !== undefined) updates.jobId = parseInt(jobId);
    if (workerId !== undefined) updates.workerId = parseInt(workerId);
    if (status !== undefined) updates.status = status;
    if (coverLetter !== undefined) updates.coverLetter = coverLetter?.trim() || null;
    if (resumeUrl !== undefined) updates.resumeUrl = resumeUrl?.trim() || null;

    // Update application
    const updated = await db
      .update(jobApplications)
      .set(updates)
      .where(eq(jobApplications.id, parseInt(id)))
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existing = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job application not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete application
    const deleted = await db
      .delete(jobApplications)
      .where(eq(jobApplications.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Job application deleted successfully',
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