'use server';

import { db } from '@/lib/db';
import { workout } from '@/lib/schema/Workout';
import { and, between, eq } from 'drizzle-orm';
import { getMonthTimestamps } from '../utils/timeFormatUtils';
import { auth } from '@/auth';
import { users } from '@/lib/schema/User';
import { isPropEmpty } from '../utils/utilfunctions';

export async function getSession() {
  const user = await auth();
  return user;
}

export async function checkUserExists(email): Promise<{ status: number; message: string; user?: any }> {
  const [user, ...rest] = await db.select().from(users).where(eq(users?.email, email));

  if (isPropEmpty(user)) {
    return { status: 403, message: 'User not found.' };
  } else {
    return { status: 200, message: 'User exists!', user };
  }
}

export async function fetchActiveDays(date: Date) {
  const { startTimestamp, endTimestamp } = getMonthTimestamps(date);
  const session = await getSession();
  if (!session) {
    return;
  }

  const { user } = await checkUserExists(session?.user?.email);
  if (!user) {
    return;
  }

  const activeDays = await db
    .select()
    .from(workout)
    .where(and(eq(workout?.userId, user?.id as unknown as number), eq(workout?.status, '1'), between(workout?.createdAt, startTimestamp, endTimestamp)));

  return activeDays;
}
