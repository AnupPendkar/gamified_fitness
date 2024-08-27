'use server';

import { IExercise } from '@/app/typings/common';
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

export async function putWorkout(id: number, exercises: IExercise[], exercise: IExercise, userId: number) {
  await db
    .update(workout)
    .set({
      exercises,
    })
    .where(eq(workout?.id, id));

  if (isExerciseComplete(exercise)) {
    await db
      .update(users)
      .set({ xp: sql`${users?.xp} + 10` })
      .where(eq(users?.id, userId));
  }
}
