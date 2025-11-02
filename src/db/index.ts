import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

// Create a connection URL from Supabase credentials
const connectionString = process.env.DATABASE_URL || 
  `postgresql://postgres:${process.env.SUPABASE_SERVICE_ROLE_KEY}@${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('.supabase.co', '')}.supabase.co:5432/postgres`;

const client = postgres(connectionString);

export const db = drizzle(client, { schema });

export type Database = typeof db;