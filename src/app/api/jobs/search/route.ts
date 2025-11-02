import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jobPostings } from '@/db/schema';
import { eq, like, and, desc, sql, or } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      category,
      location,
      employmentType,
      salaryRange,
      skills,
      status = 'active',
      search,
      limit = 10,
      offset = 0
    } = body;

    // Validation: employmentType
    if (employmentType && !['full-time', 'part-time', 'contract'].includes(employmentType)) {
      return NextResponse.json({
        error: "Invalid employment type. Must be one of: 'full-time', 'part-time', 'contract'",
        code: "INVALID_EMPLOYMENT_TYPE"
      }, { status: 400 });
    }

    // Validation: status
    if (status && !['active', 'closed', 'draft'].includes(status)) {
      return NextResponse.json({
        error: "Invalid status. Must be one of: 'active', 'closed', 'draft'",
        code: "INVALID_STATUS"
      }, { status: 400 });
    }

    // Validation: limit
    const validatedLimit = Math.min(parseInt(limit) || 10, 100);
    const validatedOffset = parseInt(offset) || 0;

    if (isNaN(validatedLimit) || validatedLimit < 1) {
      return NextResponse.json({
        error: "Invalid limit value",
        code: "INVALID_LIMIT"
      }, { status: 400 });
    }

    if (isNaN(validatedOffset) || validatedOffset < 0) {
      return NextResponse.json({
        error: "Invalid offset value",
        code: "INVALID_OFFSET"
      }, { status: 400 });
    }

    // Validation: skills array
    if (skills && (!Array.isArray(skills) || skills.some(skill => typeof skill !== 'string'))) {
      return NextResponse.json({
        error: "Skills must be an array of strings",
        code: "INVALID_SKILLS_FORMAT"
      }, { status: 400 });
    }

    // Build WHERE conditions
    const conditions = [];

    // Status filter (default to 'active')
    conditions.push(eq(jobPostings.status, status));

    // Category filter (exact match)
    if (category) {
      conditions.push(eq(jobPostings.category, category));
    }

    // Location filter (partial match with LIKE)
    if (location) {
      conditions.push(like(jobPostings.location, `%${location}%`));
    }

    // Employment type filter (exact match)
    if (employmentType) {
      conditions.push(eq(jobPostings.employmentType, employmentType));
    }

    // Salary range filter
    if (salaryRange) {
      conditions.push(like(jobPostings.salaryRange, `%${salaryRange}%`));
    }

    // Skills filter - check if any provided skill exists in requiredSkills JSON array
    if (skills && skills.length > 0) {
      const skillConditions = skills.map(skill => 
        sql`json_extract(${jobPostings.requiredSkills}, '$') LIKE ${'%' + skill + '%'}`
      );
      conditions.push(or(...skillConditions));
    }

    // Search filter (search in title and description)
    if (search) {
      const searchCondition = or(
        like(jobPostings.title, `%${search}%`),
        like(jobPostings.description, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    // Combine all conditions with AND
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Execute query with pagination
    const results = await db.select()
      .from(jobPostings)
      .where(whereClause)
      .orderBy(desc(jobPostings.createdAt))
      .limit(validatedLimit)
      .offset(validatedOffset);

    // Get total count for pagination
    const countQuery = await db.select({ count: sql<number>`count(*)` })
      .from(jobPostings)
      .where(whereClause);

    const total = countQuery[0]?.count || 0;

    // Parse requiredSkills JSON for each job posting
    const jobsWithParsedSkills = results.map(job => ({
      ...job,
      requiredSkills: job.requiredSkills ? JSON.parse(job.requiredSkills) : []
    }));

    return NextResponse.json({
      jobs: jobsWithParsedSkills,
      total,
      limit: validatedLimit,
      offset: validatedOffset
    }, { status: 200 });

  } catch (error) {
    console.error('POST /api/jobs/search error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: "INTERNAL_SERVER_ERROR"
    }, { status: 500 });
  }
}