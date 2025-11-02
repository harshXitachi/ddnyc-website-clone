import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews, users, jobPostings } from '@/db/schema';
import { eq, and, gte, desc } from 'drizzle-orm';

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

      const review = await db
        .select()
        .from(reviews)
        .where(eq(reviews.id, parseInt(id)))
        .limit(1);

      if (review.length === 0) {
        return NextResponse.json(
          { error: 'Review not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(review[0], { status: 200 });
    }

    // List with filters and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const reviewerId = searchParams.get('reviewerId');
    const revieweeId = searchParams.get('revieweeId');
    const jobId = searchParams.get('jobId');
    const minRating = searchParams.get('minRating');

    let query = db.select().from(reviews);

    // Build WHERE conditions
    const conditions = [];
    if (reviewerId) {
      conditions.push(eq(reviews.reviewerId, parseInt(reviewerId)));
    }
    if (revieweeId) {
      conditions.push(eq(reviews.revieweeId, parseInt(revieweeId)));
    }
    if (jobId) {
      conditions.push(eq(reviews.jobId, parseInt(jobId)));
    }
    if (minRating) {
      conditions.push(gte(reviews.rating, parseInt(minRating)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(reviews.createdAt))
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
    const { reviewerId, revieweeId, rating, jobId, comment } = body;

    // Validate required fields
    if (!reviewerId) {
      return NextResponse.json(
        { error: 'reviewerId is required', code: 'MISSING_REVIEWER_ID' },
        { status: 400 }
      );
    }

    if (!revieweeId) {
      return NextResponse.json(
        { error: 'revieweeId is required', code: 'MISSING_REVIEWEE_ID' },
        { status: 400 }
      );
    }

    if (rating === undefined || rating === null) {
      return NextResponse.json(
        { error: 'rating is required', code: 'MISSING_RATING' },
        { status: 400 }
      );
    }

    // Validate reviewerId != revieweeId
    if (reviewerId === revieweeId) {
      return NextResponse.json(
        { error: 'Cannot review yourself', code: 'SELF_REVIEW_NOT_ALLOWED' },
        { status: 400 }
      );
    }

    // Validate rating is integer between 1 and 5
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5', code: 'INVALID_RATING' },
        { status: 400 }
      );
    }

    // Validate reviewerId exists in users table
    const reviewer = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(reviewerId)))
      .limit(1);

    if (reviewer.length === 0) {
      return NextResponse.json(
        { error: 'Reviewer not found', code: 'REVIEWER_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Validate revieweeId exists in users table
    const reviewee = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(revieweeId)))
      .limit(1);

    if (reviewee.length === 0) {
      return NextResponse.json(
        { error: 'Reviewee not found', code: 'REVIEWEE_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Validate jobId if provided
    if (jobId !== undefined && jobId !== null) {
      const job = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.id, parseInt(jobId)))
        .limit(1);

      if (job.length === 0) {
        return NextResponse.json(
          { error: 'Job posting not found', code: 'JOB_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Create new review
    const newReview = await db
      .insert(reviews)
      .values({
        reviewerId: parseInt(reviewerId),
        revieweeId: parseInt(revieweeId),
        rating: ratingNum,
        jobId: jobId ? parseInt(jobId) : null,
        comment: comment ? comment.trim() : null,
        createdAt: Date.now(),
      })
      .returning();

    return NextResponse.json(newReview[0], { status: 201 });
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

    // Check if review exists
    const existingReview = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, parseInt(id)))
      .limit(1);

    if (existingReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { reviewerId, revieweeId, rating, jobId, comment } = body;

    // Validate reviewerId if provided
    if (reviewerId !== undefined) {
      const reviewer = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(reviewerId)))
        .limit(1);

      if (reviewer.length === 0) {
        return NextResponse.json(
          { error: 'Reviewer not found', code: 'REVIEWER_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Validate revieweeId if provided
    if (revieweeId !== undefined) {
      const reviewee = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(revieweeId)))
        .limit(1);

      if (reviewee.length === 0) {
        return NextResponse.json(
          { error: 'Reviewee not found', code: 'REVIEWEE_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Validate that reviewerId != revieweeId if both are provided or one is being updated
    const finalReviewerId = reviewerId !== undefined ? parseInt(reviewerId) : existingReview[0].reviewerId;
    const finalRevieweeId = revieweeId !== undefined ? parseInt(revieweeId) : existingReview[0].revieweeId;

    if (finalReviewerId === finalRevieweeId) {
      return NextResponse.json(
        { error: 'Cannot review yourself', code: 'SELF_REVIEW_NOT_ALLOWED' },
        { status: 400 }
      );
    }

    // Validate rating if provided
    if (rating !== undefined) {
      const ratingNum = parseInt(rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return NextResponse.json(
          { error: 'Rating must be an integer between 1 and 5', code: 'INVALID_RATING' },
          { status: 400 }
        );
      }
    }

    // Validate jobId if provided
    if (jobId !== undefined && jobId !== null) {
      const job = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.id, parseInt(jobId)))
        .limit(1);

      if (job.length === 0) {
        return NextResponse.json(
          { error: 'Job posting not found', code: 'JOB_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updates: any = {};
    if (reviewerId !== undefined) updates.reviewerId = parseInt(reviewerId);
    if (revieweeId !== undefined) updates.revieweeId = parseInt(revieweeId);
    if (rating !== undefined) updates.rating = parseInt(rating);
    if (jobId !== undefined) updates.jobId = jobId ? parseInt(jobId) : null;
    if (comment !== undefined) updates.comment = comment ? comment.trim() : null;

    const updatedReview = await db
      .update(reviews)
      .set(updates)
      .where(eq(reviews.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedReview[0], { status: 200 });
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

    // Check if review exists
    const existingReview = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, parseInt(id)))
      .limit(1);

    if (existingReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(reviews)
      .where(eq(reviews.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Review deleted successfully',
        review: deleted[0],
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