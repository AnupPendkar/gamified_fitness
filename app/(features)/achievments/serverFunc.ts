'use server';

import { isPropEmpty } from '@/app/utils/utilfunctions';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema/User';
import { eq } from 'drizzle-orm';

export async function getUserById(userId: number) {
  const [user, ...rest] = await db
    .select()
    .from(users)
    .where((users) => eq(users?.id, userId));

  return user;
}
