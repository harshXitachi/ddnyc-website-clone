import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  rating: real('rating').default(0),
  totalEarnings: real('total_earnings').default(0),
  totalSpent: real('total_spent').default(0),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  employerId: integer('employer_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  reward: real('reward').notNull(),
  status: text('status').notNull().default('active'),
  maxSubmissions: integer('max_submissions').default(1),
  currentSubmissions: integer('current_submissions').default(0),
  deadline: integer('deadline'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const submissions = sqliteTable('submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  taskId: integer('task_id').notNull().references(() => tasks.id),
  workerId: integer('worker_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  attachmentUrl: text('attachment_url'),
  status: text('status').notNull().default('pending'),
  employerFeedback: text('employer_feedback'),
  workerRating: integer('worker_rating'),
  submittedAt: integer('submitted_at').notNull(),
  reviewedAt: integer('reviewed_at'),
});

export const disputes = sqliteTable('disputes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  submissionId: integer('submission_id').notNull().references(() => submissions.id),
  raisedBy: integer('raised_by').notNull().references(() => users.id),
  reason: text('reason').notNull(),
  status: text('status').notNull().default('open'),
  adminNotes: text('admin_notes'),
  resolvedAt: integer('resolved_at'),
  createdAt: integer('created_at').notNull(),
});

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  type: text('type').notNull(),
  amount: real('amount').notNull(),
  description: text('description').notNull(),
  taskId: integer('task_id').references(() => tasks.id),
  status: text('status').notNull().default('completed'),
  createdAt: integer('created_at').notNull(),
});

export const workerProfiles = sqliteTable('worker_profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  skills: text('skills').notNull(), // JSON array as text
  hourlyRate: real('hourly_rate').notNull(),
  availability: text('availability').notNull(), // 'full-time' | 'part-time' | 'contract'
  bio: text('bio'),
  location: text('location'),
  yearsExperience: integer('years_experience').default(0),
  resumeUrl: text('resume_url'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const employerProfiles = sqliteTable('employer_profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  companyName: text('company_name').notNull(),
  companyDescription: text('company_description'),
  companyLogoUrl: text('company_logo_url'),
  industry: text('industry'),
  website: text('website'),
  location: text('location'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const jobPostings = sqliteTable('job_postings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  employerId: integer('employer_id').notNull().references(() => employerProfiles.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  employmentType: text('employment_type').notNull(), // 'full-time' | 'part-time' | 'contract'
  location: text('location').notNull(),
  salaryRange: text('salary_range'),
  requiredSkills: text('required_skills').notNull(), // JSON array as text
  status: text('status').notNull().default('active'), // 'active' | 'closed' | 'draft'
  views: integer('views').default(0),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  expiresAt: integer('expires_at'),
});

export const jobApplications = sqliteTable('job_applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  jobId: integer('job_id').notNull().references(() => jobPostings.id),
  workerId: integer('worker_id').notNull().references(() => workerProfiles.id),
  status: text('status').notNull().default('pending'), // 'pending' | 'reviewing' | 'accepted' | 'rejected'
  coverLetter: text('cover_letter'),
  resumeUrl: text('resume_url'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  senderId: integer('sender_id').notNull().references(() => users.id),
  receiverId: integer('receiver_id').notNull().references(() => users.id),
  jobId: integer('job_id').references(() => jobPostings.id),
  content: text('content').notNull(),
  read: integer('read', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at').notNull(),
});

export const reviews = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  reviewerId: integer('reviewer_id').notNull().references(() => users.id),
  revieweeId: integer('reviewee_id').notNull().references(() => users.id),
  jobId: integer('job_id').references(() => jobPostings.id),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: integer('created_at').notNull(),
});


// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});