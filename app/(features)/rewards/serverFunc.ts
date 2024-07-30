'use server';

import { IExercise, IWorkout } from '@/app/typings/common';
import { getStartAndEndOfByDate } from '@/app/utils/timeFormatUtils';
import { isPropEmpty } from '@/app/utils/utilfunctions';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema/User';
import { eq } from 'drizzle-orm';

export async function getRewards(userId: number, date: Date) {
  const { startOfDay, endOfDay } = getStartAndEndOfByDate(date);

  const data = await db.query.rewards.findMany({
    where: (rewards, { between, and, eq }) => and(between(rewards?.createdAt, startOfDay, endOfDay), eq(rewards?.userId, userId)),
  });

  return data;
}

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

export async function getWorkout(userId: number, date: Date): Promise<IWorkout | undefined> {
  const { startOfDay, endOfDay } = getStartAndEndOfByDate(date);
  if (!startOfDay || !endOfDay) {
    return;
  }

  const _data = await db.query.workout.findFirst({
    where: (workout, { eq, between, and }) => and(between(workout?.createdAt, startOfDay, endOfDay), eq(workout?.userId, userId)),
  });

  return _data as unknown as IWorkout;
}
