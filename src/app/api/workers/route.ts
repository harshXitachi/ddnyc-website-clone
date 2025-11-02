import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { workerProfiles, users } from '@/db/schema';
import { eq, like, and, or, gte, lte, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const record = await db.select()
        .from(workerProfiles)
        .where(eq(workerProfiles.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ 
          error: 'Worker profile not found',
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const availability = searchParams.get('availability');
    const minRate = searchParams.get('minRate');
    const maxRate = searchParams.get('maxRate');
    const location = searchParams.get('location');

    let query = db.select().from(workerProfiles);
    const conditions = [];

    // Search in skills, bio, location
    if (search) {
      conditions.push(
        or(
          like(workerProfiles.skills, `%${search}%`),
          like(workerProfiles.bio, `%${search}%`),
          like(workerProfiles.location, `%${search}%`)
        )
      );
    }

    // Filter by availability
    if (availability) {
      conditions.push(eq(workerProfiles.availability, availability));
    }

    // Filter by location
    if (location) {
      conditions.push(like(workerProfiles.location, `%${location}%`));
    }

    // Filter by hourly rate range
    if (minRate) {
      const minRateNum = parseFloat(minRate);
      if (!isNaN(minRateNum)) {
        conditions.push(gte(workerProfiles.hourlyRate, minRateNum));
      }
    }

    if (maxRate) {
      const maxRateNum = parseFloat(maxRate);
      if (!isNaN(maxRateNum)) {
        conditions.push(lte(workerProfiles.hourlyRate, maxRateNum));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(workerProfiles.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, skills, hourlyRate, availability, bio, location, yearsExperience, resumeUrl } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ 
        error: "userId is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!skills) {
      return NextResponse.json({ 
        error: "skills is required",
        code: "MISSING_SKILLS" 
      }, { status: 400 });
    }

    if (!hourlyRate) {
      return NextResponse.json({ 
        error: "hourlyRate is required",
        code: "MISSING_HOURLY_RATE" 
      }, { status: 400 });
    }

    if (!availability) {
      return NextResponse.json({ 
        error: "availability is required",
        code: "MISSING_AVAILABILITY" 
      }, { status: 400 });
    }

    // Validate userId exists
    const userExists = await db.select()
      .from(users)
      .where(eq(users.id, parseInt(userId)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json({ 
        error: "User does not exist",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    // Validate availability
    const validAvailability = ['full-time', 'part-time', 'contract'];
    if (!validAvailability.includes(availability)) {
      return NextResponse.json({ 
        error: "availability must be one of: full-time, part-time, contract",
        code: "INVALID_AVAILABILITY" 
      }, { status: 400 });
    }

    // Validate hourlyRate is positive
    const rate = parseFloat(hourlyRate);
    if (isNaN(rate) || rate <= 0) {
      return NextResponse.json({ 
        error: "hourlyRate must be a positive number",
        code: "INVALID_HOURLY_RATE" 
      }, { status: 400 });
    }

    // Validate skills is valid JSON array
    let skillsString = skills;
    if (typeof skills === 'object') {
      try {
        skillsString = JSON.stringify(skills);
      } catch (e) {
        return NextResponse.json({ 
          error: "skills must be a valid JSON array",
          code: "INVALID_SKILLS_FORMAT" 
        }, { status: 400 });
      }
    } else {
      try {
        const parsed = JSON.parse(skills);
        if (!Array.isArray(parsed)) {
          return NextResponse.json({ 
            error: "skills must be a JSON array",
            code: "INVALID_SKILLS_FORMAT" 
          }, { status: 400 });
        }
      } catch (e) {
        return NextResponse.json({ 
          error: "skills must be a valid JSON array",
          code: "INVALID_SKILLS_FORMAT" 
        }, { status: 400 });
      }
    }

    const now = Date.now();

    const newProfile = await db.insert(workerProfiles)
      .values({
        userId: parseInt(userId),
        skills: skillsString,
        hourlyRate: rate,
        availability,
        bio: bio ?? null,
        location: location ?? null,
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : 0,
        resumeUrl: resumeUrl ?? null,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(newProfile[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(workerProfiles)
      .where(eq(workerProfiles.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Worker profile not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const body = await request.json();
    const { userId, skills, hourlyRate, availability, bio, location, yearsExperience, resumeUrl } = body;

    const updates: any = {
      updatedAt: Date.now()
    };

    // Validate and update userId if provided
    if (userId !== undefined) {
      const userExists = await db.select()
        .from(users)
        .where(eq(users.id, parseInt(userId)))
        .limit(1);

      if (userExists.length === 0) {
        return NextResponse.json({ 
          error: "User does not exist",
          code: "INVALID_USER_ID" 
        }, { status: 400 });
      }
      updates.userId = parseInt(userId);
    }

    // Validate and update skills if provided
    if (skills !== undefined) {
      let skillsString = skills;
      if (typeof skills === 'object') {
        try {
          skillsString = JSON.stringify(skills);
        } catch (e) {
          return NextResponse.json({ 
            error: "skills must be a valid JSON array",
            code: "INVALID_SKILLS_FORMAT" 
          }, { status: 400 });
        }
      } else {
        try {
          const parsed = JSON.parse(skills);
          if (!Array.isArray(parsed)) {
            return NextResponse.json({ 
              error: "skills must be a JSON array",
              code: "INVALID_SKILLS_FORMAT" 
            }, { status: 400 });
          }
        } catch (e) {
          return NextResponse.json({ 
            error: "skills must be a valid JSON array",
            code: "INVALID_SKILLS_FORMAT" 
          }, { status: 400 });
        }
      }
      updates.skills = skillsString;
    }

    // Validate and update hourlyRate if provided
    if (hourlyRate !== undefined) {
      const rate = parseFloat(hourlyRate);
      if (isNaN(rate) || rate <= 0) {
        return NextResponse.json({ 
          error: "hourlyRate must be a positive number",
          code: "INVALID_HOURLY_RATE" 
        }, { status: 400 });
      }
      updates.hourlyRate = rate;
    }

    // Validate and update availability if provided
    if (availability !== undefined) {
      const validAvailability = ['full-time', 'part-time', 'contract'];
      if (!validAvailability.includes(availability)) {
        return NextResponse.json({ 
          error: "availability must be one of: full-time, part-time, contract",
          code: "INVALID_AVAILABILITY" 
        }, { status: 400 });
      }
      updates.availability = availability;
    }

    // Update optional fields if provided
    if (bio !== undefined) updates.bio = bio;
    if (location !== undefined) updates.location = location;
    if (yearsExperience !== undefined) updates.yearsExperience = parseInt(yearsExperience);
    if (resumeUrl !== undefined) updates.resumeUrl = resumeUrl;

    const updated = await db.update(workerProfiles)
      .set(updates)
      .where(eq(workerProfiles.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(workerProfiles)
      .where(eq(workerProfiles.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Worker profile not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(workerProfiles)
      .where(eq(workerProfiles.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Worker profile deleted successfully',
      deletedProfile: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}