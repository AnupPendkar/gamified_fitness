'use server';

import { IExercise } from '@/app/typings/common';
import { db } from '@/lib/db';
import { workout } from '@/lib/schema/Workout';
import { eq } from 'drizzle-orm';

export async function putWorkout(id: number, exercises: IExercise[]) {
  await db
    .update(workout)
    .set({
      exercises,
    })
    .where(eq(workout?.id, id));
}
