import '@/lib/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { sql as _sql } from 'drizzle-orm';
import * as userSchema from './schema/User';
import * as workoutSchema from './schema/Workout';
import * as rewardsSchema from './schema/Rewards';

export const db = drizzle(sql, { schema: { ...userSchema, ...rewardsSchema, ...workoutSchema } });

// clearDb();
async function clearDb(): Promise<void> {
  console.log('🗑️ Emptying the entire database');

  // if (!tablesSchema) throw new Error("Schema not loaded");
  const tablesSchema = ['badges', 'users_to_badges'];

  const queries = Object.values(tablesSchema).map((table) => {
    console.log(`🧨 Preparing delete query for table: ${table}`);
    return _sql.raw(`DELETE FROM ${table};`);
  });

  console.log('🛜 Sending delete queries');

  await db.transaction(async (trx) => {
    await Promise.all(
      queries.map(async (query) => {
        if (query) await trx.execute(query);
      })
    );
  });

  console.log('✅ Database emptied');
}
