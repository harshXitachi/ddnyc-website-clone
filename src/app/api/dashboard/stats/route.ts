import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, workerProfiles, employerProfiles, jobPostings, jobApplications, messages, reviews } from '@/db/schema';
import { eq, gte, count, avg, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - (24 * 60 * 60);
    const oneWeekAgo = now - (7 * 24 * 60 * 60);
    const oneMonthAgo = now - (30 * 24 * 60 * 60);

    const [
      totalUsers,
      usersByRole,
      newUsersThisMonth,
      totalWorkerProfiles,
      totalEmployerProfiles,
      totalJobs,
      jobsByStatus,
      newJobsThisWeek,
      totalApplications,
      applicationsByStatus,
      newApplicationsToday,
      totalMessages,
      unreadMessages,
      messagesToday,
      totalReviews,
      averageRatingResult,
      reviewsByRating
    ] = await Promise.all([
      db.select({ count: count() }).from(users),
      
      db.select({ 
        role: users.role,
        count: count() 
      })
      .from(users)
      .groupBy(users.role),

      db.select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, oneMonthAgo)),

      db.select({ count: count() }).from(workerProfiles),

      db.select({ count: count() }).from(employerProfiles),

      db.select({ count: count() }).from(jobPostings),

      db.select({ 
        status: jobPostings.status,
        count: count() 
      })
      .from(jobPostings)
      .groupBy(jobPostings.status),

      db.select({ count: count() })
      .from(jobPostings)
      .where(gte(jobPostings.createdAt, oneWeekAgo)),

      db.select({ count: count() }).from(jobApplications),

      db.select({ 
        status: jobApplications.status,
        count: count() 
      })
      .from(jobApplications)
      .groupBy(jobApplications.status),

      db.select({ count: count() })
      .from(jobApplications)
      .where(gte(jobApplications.createdAt, oneDayAgo)),

      db.select({ count: count() }).from(messages),

      db.select({ count: count() })
      .from(messages)
      .where(eq(messages.read, false)),

      db.select({ count: count() })
      .from(messages)
      .where(gte(messages.createdAt, oneDayAgo)),

      db.select({ count: count() }).from(reviews),

      db.select({ avgRating: avg(reviews.rating) }).from(reviews),

      db.select({ 
        rating: reviews.rating,
        count: count() 
      })
      .from(reviews)
      .groupBy(reviews.rating)
    ]);

    const roleMap = usersByRole.reduce((acc, item) => {
      acc[item.role] = item.count;
      return acc;
    }, {} as Record<string, number>);

    const jobStatusMap = jobsByStatus.reduce((acc, item) => {
      acc[item.status] = item.count;
      return acc;
    }, {} as Record<string, number>);

    const applicationStatusMap = applicationsByStatus.reduce((acc, item) => {
      acc[item.status] = item.count;
      return acc;
    }, {} as Record<string, number>);

    const reviewRatingMap = reviewsByRating.reduce((acc, item) => {
      acc[item.rating] = item.count;
      return acc;
    }, {} as Record<number, number>);

    const stats = {
      users: {
        total: totalUsers[0].count,
        workers: roleMap['worker'] || 0,
        employers: roleMap['employer'] || 0,
        admins: roleMap['admin'] || 0,
        newThisMonth: newUsersThisMonth[0].count
      },
      jobs: {
        total: totalJobs[0].count,
        active: jobStatusMap['active'] || 0,
        closed: jobStatusMap['closed'] || 0,
        draft: jobStatusMap['draft'] || 0,
        newThisWeek: newJobsThisWeek[0].count
      },
      applications: {
        total: totalApplications[0].count,
        pending: applicationStatusMap['pending'] || 0,
        reviewing: applicationStatusMap['reviewing'] || 0,
        accepted: applicationStatusMap['accepted'] || 0,
        rejected: applicationStatusMap['rejected'] || 0,
        newToday: newApplicationsToday[0].count
      },
      messages: {
        total: totalMessages[0].count,
        unread: unreadMessages[0].count,
        sentToday: messagesToday[0].count
      },
      reviews: {
        total: totalReviews[0].count,
        averageRating: averageRatingResult[0].avgRating ? parseFloat(Number(averageRatingResult[0].avgRating).toFixed(1)) : 0,
        fiveStars: reviewRatingMap[5] || 0,
        fourStars: reviewRatingMap[4] || 0,
        threeStars: reviewRatingMap[3] || 0,
        twoStars: reviewRatingMap[2] || 0,
        oneStar: reviewRatingMap[1] || 0
      },
      activity: {
        profilesCreated: {
          workers: totalWorkerProfiles[0].count,
          employers: totalEmployerProfiles[0].count
        }
      }
    };

    return NextResponse.json(stats, { status: 200 });

  } catch (error) {
    console.error('GET dashboard stats error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}