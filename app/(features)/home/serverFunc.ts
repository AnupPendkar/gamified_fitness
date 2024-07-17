'use server';

import { isPropEmpty } from '@/app/utils/utilfunctions';
import { auth, signIn } from '@/auth';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@/lib/schema/User';
import { getStartAndEndOfByDate } from '@/app/utils/timeFormatUtils';

export async function handleGoogleOAuthLogin() {
  await signIn('google');
}

export async function handleGitOAuthLogin() {
  await signIn('github');
}

export async function handleCrendentialLogin(email: any, password: string) {
  await signIn('credentials', { email, password });
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

export async function getWorkout(userId: number, date: Date) {
  const { startOfDay, endOfDay } = getStartAndEndOfByDate(date);
  if (!startOfDay || !endOfDay) {
    return;
  }

  const _data = await db.query.workout.findFirst({
    where: (workout, { eq, between, and }) => and(between(workout?.createdAt, startOfDay, endOfDay), eq(workout?.userId, userId)),
    with: {
      exercises: {
        with: {
          sets: true,
        },
      },
    },
  });

  return _data;
}
