'use server';

import { db } from '@/lib/db';
import { workout } from '@/lib/schema/Workout';
import { and, between, eq } from 'drizzle-orm';
import { getMonthTimestamps } from '../utils/timeFormatUtils';

export async function fetchActiveDays(date: Date, userId: number) {
  const { startTimestamp, endTimestamp } = getMonthTimestamps(date);
  const activeDays = await db
    .select()
    .from(workout)
    .where(and(eq(workout?.userId, userId), eq(workout?.status, '1'), between(workout?.createdAt, startTimestamp, endTimestamp)));

  return activeDays;
}
