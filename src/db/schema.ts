import { pgTable, serial, text, varchar, real, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  rating: real('rating').default(0),
  totalEarnings: real('total_earnings').default(0),
  totalSpent: real('total_spent').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  employerId: integer('employer_id').notNull().references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  reward: real('reward').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  maxSubmissions: integer('max_submissions').default(1),
  currentSubmissions: integer('current_submissions').default(0),
  deadline: timestamp('deadline'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  taskId: integer('task_id').notNull().references(() => tasks.id),
  workerId: integer('worker_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  attachmentUrl: text('attachment_url'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  employerFeedback: text('employer_feedback'),
  workerRating: integer('worker_rating'),
  submittedAt: timestamp('submitted_at').notNull().defaultNow(),
  reviewedAt: timestamp('reviewed_at'),
});

export const disputes = pgTable('disputes', {
  id: serial('id').primaryKey(),
  submissionId: integer('submission_id').notNull().references(() => submissions.id),
  raisedBy: integer('raised_by').notNull().references(() => users.id),
  reason: text('reason').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('open'),
  adminNotes: text('admin_notes'),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  type: varchar('type', { length: 50 }).notNull(),
  amount: real('amount').notNull(),
  description: text('description').notNull(),
  taskId: integer('task_id').references(() => tasks.id),
  status: varchar('status', { length: 50 }).notNull().default('completed'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});