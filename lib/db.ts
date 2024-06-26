import '@/lib/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as userSchema from './schema/User';

export const db = drizzle(sql, { schema: { ...userSchema } });
