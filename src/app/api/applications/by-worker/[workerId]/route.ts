import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jobApplications, jobPostings, employerProfiles, workerProfiles } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { workerId: string } }
) {
  try {
    const { workerId } = params;
    const { searchParams } = new URL(request.url);

    // Validate workerId
    const workerIdNum = parseInt(workerId);
    if (!workerId || isNaN(workerIdNum)) {
      return NextResponse.json(
        {
          error: 'Valid worker ID is required',
          code: 'INVALID_WORKER_ID',
        },
        { status: 400 }
      );
    }

    // Check if worker exists
    const workerExists = await db
      .select()
      .from(workerProfiles)
      .where(eq(workerProfiles.id, workerIdNum))
      .limit(1);

    if (workerExists.length === 0) {
      return NextResponse.json(
        {
          error: 'Worker not found',
          code: 'WORKER_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Parse and validate status filter
    const statusParam = searchParams.get('status');
    const validStatuses = ['pending', 'reviewing', 'accepted', 'rejected'];

    if (statusParam && !validStatuses.includes(statusParam)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
          code: 'INVALID_STATUS',
        },
        { status: 400 }
      );
    }

    // Build where conditions
    const whereConditions = [eq(jobApplications.workerId, workerIdNum)];
    if (statusParam) {
      whereConditions.push(eq(jobApplications.status, statusParam));
    }

    // Fetch applications with job and employer details
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
        job: {
          id: jobPostings.id,
          title: jobPostings.title,
          description: jobPostings.description,
          category: jobPostings.category,
          employmentType: jobPostings.employmentType,
          location: jobPostings.location,
          salaryRange: jobPostings.salaryRange,
          status: jobPostings.status,
        },
        employer: {
          id: employerProfiles.id,
          companyName: employerProfiles.companyName,
          industry: employerProfiles.industry,
          location: employerProfiles.location,
        },
      })
      .from(jobApplications)
      .innerJoin(jobPostings, eq(jobApplications.jobId, jobPostings.id))
      .innerJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.id))
      .where(and(...whereConditions))
      .orderBy(desc(jobApplications.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalResult = await db
      .select({ count: jobApplications.id })
      .from(jobApplications)
      .where(and(...whereConditions));

    const total = totalResult.length;

    return NextResponse.json({
      applications,
      total,
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      },
      { status: 500 }
    );
  }
}