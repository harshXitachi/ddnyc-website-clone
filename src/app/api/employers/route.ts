import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { employerProfiles, users } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

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

      const profile = await db
        .select()
        .from(employerProfiles)
        .where(eq(employerProfiles.id, parseInt(id)))
        .limit(1);

      if (profile.length === 0) {
        return NextResponse.json(
          { error: 'Employer profile not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(profile[0], { status: 200 });
    }

    // List with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const industry = searchParams.get('industry');
    const location = searchParams.get('location');

    let query = db.select().from(employerProfiles);

    const conditions = [];

    // Search across multiple fields
    if (search) {
      conditions.push(
        or(
          like(employerProfiles.companyName, `%${search}%`),
          like(employerProfiles.companyDescription, `%${search}%`),
          like(employerProfiles.industry, `%${search}%`)
        )
      );
    }

    // Filter by industry
    if (industry) {
      conditions.push(eq(employerProfiles.industry, industry));
    }

    // Filter by location
    if (location) {
      conditions.push(eq(employerProfiles.location, location));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(employerProfiles.createdAt))
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
    const {
      userId,
      companyName,
      companyDescription,
      companyLogoUrl,
      industry,
      website,
      location,
    } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!companyName || companyName.trim() === '') {
      return NextResponse.json(
        { error: 'companyName is required', code: 'MISSING_COMPANY_NAME' },
        { status: 400 }
      );
    }

    // Validate userId exists in users table
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(userId)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json(
        { error: 'User does not exist', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    // Create new employer profile
    const now = Date.now();
    const newProfile = await db
      .insert(employerProfiles)
      .values({
        userId: parseInt(userId),
        companyName: companyName.trim(),
        companyDescription: companyDescription?.trim() || null,
        companyLogoUrl: companyLogoUrl?.trim() || null,
        industry: industry?.trim() || null,
        website: website?.trim() || null,
        location: location?.trim() || null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newProfile[0], { status: 201 });
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
    const {
      userId,
      companyName,
      companyDescription,
      companyLogoUrl,
      industry,
      website,
      location,
    } = body;

    // Check if profile exists
    const existingProfile = await db
      .select()
      .from(employerProfiles)
      .where(eq(employerProfiles.id, parseInt(id)))
      .limit(1);

    if (existingProfile.length === 0) {
      return NextResponse.json(
        { error: 'Employer profile not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate userId if provided
    if (userId !== undefined) {
      const userExists = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(userId)))
        .limit(1);

      if (userExists.length === 0) {
        return NextResponse.json(
          { error: 'User does not exist', code: 'INVALID_USER_ID' },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updateData: any = {
      updatedAt: Date.now(),
    };

    if (userId !== undefined) updateData.userId = parseInt(userId);
    if (companyName !== undefined) updateData.companyName = companyName.trim();
    if (companyDescription !== undefined)
      updateData.companyDescription = companyDescription?.trim() || null;
    if (companyLogoUrl !== undefined)
      updateData.companyLogoUrl = companyLogoUrl?.trim() || null;
    if (industry !== undefined) updateData.industry = industry?.trim() || null;
    if (website !== undefined) updateData.website = website?.trim() || null;
    if (location !== undefined) updateData.location = location?.trim() || null;

    // Update the profile
    const updated = await db
      .update(employerProfiles)
      .set(updateData)
      .where(eq(employerProfiles.id, parseInt(id)))
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

    // Check if profile exists
    const existingProfile = await db
      .select()
      .from(employerProfiles)
      .where(eq(employerProfiles.id, parseInt(id)))
      .limit(1);

    if (existingProfile.length === 0) {
      return NextResponse.json(
        { error: 'Employer profile not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the profile
    const deleted = await db
      .delete(employerProfiles)
      .where(eq(employerProfiles.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Employer profile deleted successfully',
        deletedProfile: deleted[0],
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