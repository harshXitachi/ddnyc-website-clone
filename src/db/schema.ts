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