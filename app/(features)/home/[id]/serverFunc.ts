'use server';

import { IExercise } from '@/app/typings/common';
import { isPropEmpty } from '@/app/utils/utilfunctions';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema/User';
import { workout } from '@/lib/schema/Workout';
import { eq, sql } from 'drizzle-orm';

function isExerciseComplete(exer: IExercise): boolean {
  const totSets = exer?.sets?.length;
  const completedSets = exer?.sets?.reduce((prev, curr) => {
    if (curr?.completedReps >= (2 * curr?.totalReps) / 3) {
      return prev + 1;
    }
    return prev;
  }, 0);

  return completedSets === totSets;
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

export async function putWorkout(id: number, exercises: IExercise[], exercise: IExercise) {
  await db
    .update(workout)
    .set({
      exercises,
    })
    .where(eq(workout?.id, id));

  if (isExerciseComplete(exercise)) {
    const session = await getSession();
    const { user } = await checkUserExists(session?.user?.email);
    const userId = user?.id;

    await db
      .update(users)
      .set({ xp: sql`${users?.xp} + 10` })
      .where(eq(users?.id, userId));
  }
}
