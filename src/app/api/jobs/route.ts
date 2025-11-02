import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jobPostings, employerProfiles } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

const VALID_EMPLOYMENT_TYPES = ['full-time', 'part-time', 'contract'] as const;
const VALID_STATUSES = ['active', 'closed', 'draft'] as const;

type EmploymentType = typeof VALID_EMPLOYMENT_TYPES[number];
type Status = typeof VALID_STATUSES[number];

function isValidEmploymentType(type: string): type is EmploymentType {
  return VALID_EMPLOYMENT_TYPES.includes(type as EmploymentType);
}

function isValidStatus(status: string): status is Status {
  return VALID_STATUSES.includes(status as Status);
}

function isValidJSON(str: string): boolean {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const record = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Job posting not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      // Auto-increment views counter
      const currentViews = record[0].views || 0;
      await db
        .update(jobPostings)
        .set({ views: currentViews + 1 })
        .where(eq(jobPostings.id, parseInt(id)));

      return NextResponse.json({ ...record[0], views: currentViews + 1 });
    }

    // List with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const employmentType = searchParams.get('employmentType');
    const location = searchParams.get('location');

    let query = db.select().from(jobPostings);

    // Build WHERE conditions
    const conditions = [];

    // Search condition
    if (search) {
      conditions.push(
        or(
          like(jobPostings.title, `%${search}%`),
          like(jobPostings.description, `%${search}%`)
        )
      );
    }

    // Filter conditions
    if (status) {
      conditions.push(eq(jobPostings.status, status));
    }
    if (category) {
      conditions.push(eq(jobPostings.category, category));
    }
    if (employmentType) {
      conditions.push(eq(jobPostings.employmentType, employmentType));
    }
    if (location) {
      conditions.push(like(jobPostings.location, `%${location}%`));
    }

    // Apply conditions if any
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Order by createdAt DESC and apply pagination
    const results = await query
      .orderBy(desc(jobPostings.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);
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
    const {
      employerId,
      title,
      description,
      category,
      employmentType,
      location,
      requiredSkills,
      salaryRange,
      status,
      expiresAt,
    } = body;

    // Validate required fields
    if (!employerId) {
      return NextResponse.json(
        { error: 'Employer ID is required', code: 'MISSING_EMPLOYER_ID' },
        { status: 400 }
      );
    }
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required', code: 'MISSING_DESCRIPTION' },
        { status: 400 }
      );
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return NextResponse.json(
        { error: 'Category is required', code: 'MISSING_CATEGORY' },
        { status: 400 }
      );
    }
    if (!employmentType || typeof employmentType !== 'string') {
      return NextResponse.json(
        { error: 'Employment type is required', code: 'MISSING_EMPLOYMENT_TYPE' },
        { status: 400 }
      );
    }
    if (!location || typeof location !== 'string' || location.trim() === '') {
      return NextResponse.json(
        { error: 'Location is required', code: 'MISSING_LOCATION' },
        { status: 400 }
      );
    }
    if (!requiredSkills) {
      return NextResponse.json(
        { error: 'Required skills is required', code: 'MISSING_REQUIRED_SKILLS' },
        { status: 400 }
      );
    }

    // Validate employmentType
    if (!isValidEmploymentType(employmentType)) {
      return NextResponse.json(
        {
          error: `Employment type must be one of: ${VALID_EMPLOYMENT_TYPES.join(', ')}`,
          code: 'INVALID_EMPLOYMENT_TYPE',
        },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !isValidStatus(status)) {
      return NextResponse.json(
        {
          error: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS',
        },
        { status: 400 }
      );
    }

    // Validate requiredSkills is valid JSON array
    const skillsString = typeof requiredSkills === 'string' ? requiredSkills : JSON.stringify(requiredSkills);
    if (!isValidJSON(skillsString)) {
      return NextResponse.json(
        { error: 'Required skills must be a valid JSON array', code: 'INVALID_REQUIRED_SKILLS' },
        { status: 400 }
      );
    }

    // Validate employerId exists in employerProfiles
    const employerExists = await db
      .select()
      .from(employerProfiles)
      .where(eq(employerProfiles.id, parseInt(employerId)))
      .limit(1);

    if (employerExists.length === 0) {
      return NextResponse.json(
        { error: 'Employer profile not found', code: 'EMPLOYER_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Prepare insert data
    const now = Date.now();
    const insertData = {
      employerId: parseInt(employerId),
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      employmentType,
      location: location.trim(),
      requiredSkills: skillsString,
      salaryRange: salaryRange ? salaryRange.trim() : null,
      status: status || 'active',
      views: 0,
      createdAt: now,
      updatedAt: now,
      expiresAt: expiresAt ? parseInt(expiresAt) : null,
    };

    const newJobPosting = await db
      .insert(jobPostings)
      .values(insertData)
      .returning();

    return NextResponse.json(newJobPosting[0], { status: 201 });
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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      employerId,
      title,
      description,
      category,
      employmentType,
      location,
      requiredSkills,
      salaryRange,
      status,
      expiresAt,
    } = body;

    // Check if record exists
    const existing = await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job posting not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate employerId if provided
    if (employerId) {
      const employerExists = await db
        .select()
        .from(employerProfiles)
        .where(eq(employerProfiles.id, parseInt(employerId)))
        .limit(1);

      if (employerExists.length === 0) {
        return NextResponse.json(
          { error: 'Employer profile not found', code: 'EMPLOYER_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Validate employmentType if provided
    if (employmentType && !isValidEmploymentType(employmentType)) {
      return NextResponse.json(
        {
          error: `Employment type must be one of: ${VALID_EMPLOYMENT_TYPES.join(', ')}`,
          code: 'INVALID_EMPLOYMENT_TYPE',
        },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !isValidStatus(status)) {
      return NextResponse.json(
        {
          error: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS',
        },
        { status: 400 }
      );
    }

    // Validate requiredSkills if provided
    if (requiredSkills) {
      const skillsString = typeof requiredSkills === 'string' ? requiredSkills : JSON.stringify(requiredSkills);
      if (!isValidJSON(skillsString)) {
        return NextResponse.json(
          { error: 'Required skills must be a valid JSON array', code: 'INVALID_REQUIRED_SKILLS' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: Date.now(),
    };

    if (employerId !== undefined) updateData.employerId = parseInt(employerId);
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (employmentType !== undefined) updateData.employmentType = employmentType;
    if (location !== undefined) updateData.location = location.trim();
    if (requiredSkills !== undefined) {
      updateData.requiredSkills = typeof requiredSkills === 'string' ? requiredSkills : JSON.stringify(requiredSkills);
    }
    if (salaryRange !== undefined) updateData.salaryRange = salaryRange ? salaryRange.trim() : null;
    if (status !== undefined) updateData.status = status;
    if (expiresAt !== undefined) updateData.expiresAt = expiresAt ? parseInt(expiresAt) : null;

    const updated = await db
      .update(jobPostings)
      .set(updateData)
      .where(eq(jobPostings.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existing = await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job posting not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(jobPostings)
      .where(eq(jobPostings.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Job posting deleted successfully',
      deletedRecord: deleted[0],
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}