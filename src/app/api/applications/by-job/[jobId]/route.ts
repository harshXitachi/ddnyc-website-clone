import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jobApplications, workerProfiles, users, jobPostings } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;
    const { searchParams } = new URL(request.url);

    // Validate jobId is a valid integer
    const jobIdNum = parseInt(jobId);
    if (!jobId || isNaN(jobIdNum)) {
      return NextResponse.json(
        { 
          error: 'Valid job ID is required',
          code: 'INVALID_JOB_ID'
        },
        { status: 400 }
      );
    }

    // Check if job posting exists
    const jobExists = await db.select()
      .from(jobPostings)
      .where(eq(jobPostings.id, jobIdNum))
      .limit(1);

    if (jobExists.length === 0) {
      return NextResponse.json(
        { 
          error: 'Job posting not found',
          code: 'JOB_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Get pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const statusFilter = searchParams.get('status');

    // Validate status if provided
    const validStatuses = ['pending', 'reviewing', 'accepted', 'rejected'];
    if (statusFilter && !validStatuses.includes(statusFilter)) {
      return NextResponse.json(
        { 
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
          code: 'INVALID_STATUS'
        },
        { status: 400 }
      );
    }

    // Build the where conditions
    const whereConditions = statusFilter
      ? and(
          eq(jobApplications.jobId, jobIdNum),
          eq(jobApplications.status, statusFilter)
        )
      : eq(jobApplications.jobId, jobIdNum);

    // Fetch applications with worker and user details
    const applications = await db
      .select({
        id: jobApplications.id,
        jobId: jobApplications.jobId,
        workerId: jobApplications.workerId,
        status: jobApplications.status,
        coverLetter: jobApplications.coverLetter,
        resumeUrl: jobApplications.resumeUrl,
        createdAt: jobApplications.createdAt,
        updatedAt: jobApplications.updatedAt,
        worker: {
          id: workerProfiles.id,
          userId: workerProfiles.userId,
          skills: workerProfiles.skills,
          hourlyRate: workerProfiles.hourlyRate,
          availability: workerProfiles.availability,
          location: workerProfiles.location,
          yearsExperience: workerProfiles.yearsExperience,
          bio: workerProfiles.bio,
        },
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl,
          rating: users.rating,
        },
      })
      .from(jobApplications)
      .innerJoin(workerProfiles, eq(jobApplications.workerId, workerProfiles.id))
      .innerJoin(users, eq(workerProfiles.userId, users.id))
      .where(whereConditions)
      .orderBy(desc(jobApplications.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: jobApplications.id })
      .from(jobApplications)
      .where(whereConditions);

    const total = totalCountResult.length;

    // Transform the data to match the expected response format
    const formattedApplications = applications.map(app => ({
      id: app.id,
      jobId: app.jobId,
      workerId: app.workerId,
      status: app.status,
      coverLetter: app.coverLetter,
      resumeUrl: app.resumeUrl,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      worker: {
        id: app.worker.id,
        userId: app.worker.userId,
        skills: app.worker.skills ? JSON.parse(app.worker.skills) : [],
        hourlyRate: app.worker.hourlyRate,
        availability: app.worker.availability,
        location: app.worker.location,
        yearsExperience: app.worker.yearsExperience,
        bio: app.worker.bio,
      },
      user: {
        id: app.user.id,
        name: app.user.name,
        email: app.user.email,
        avatarUrl: app.user.avatarUrl,
        rating: app.user.rating,
      },
    }));

    return NextResponse.json({
      applications: formattedApplications,
      total,
    });

  } catch (error) {
    console.error('GET applications by job error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}