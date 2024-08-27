'use server';

import { db } from '@/lib/db';
import { getStartAndEndOfByDate } from '@/app/utils/timeFormatUtils';

export async function getWorkout(userId: number, date: Date) {
  const { startOfDay, endOfDay } = getStartAndEndOfByDate(date);
  if (!startOfDay || !endOfDay) {
    return;
  }

  const _data = await db.query.workout.findFirst({
    where: (workout, { eq, between, and }) => and(between(workout?.createdAt, startOfDay, endOfDay), eq(workout?.userId, userId)),
  });

  return _data;
}
