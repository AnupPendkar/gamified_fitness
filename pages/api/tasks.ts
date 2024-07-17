import { db } from '@/lib/db';
import { users } from '@/lib/schema/User';
import { exercise, set, workout } from '@/lib/schema/Workout';
import { ETarMuscle } from '@/app/typings/common';

async function getAllUsers() {
  return await db.select().from(users);
}

async function createWorkoutForUser(user) {
  let newWorkout, newExercise: Array<number>, rest;

  [newWorkout, ...rest] = await db
    .insert(workout)
    .values({
      split: [ETarMuscle?.CHEST, ETarMuscle?.SHOULDERS] as Array<any>,
      userId: user?.id,
      status: 0 as any,
    })
    .returning({ id: users?.id });

  newExercise = await Promise.all(
    [1, 6, 7]?.map(async (itm, _idx) => {
      const [newExer, ...reste] = await db
        .insert(exercise)
        .values({
          exerciseId: itm,
          set: 3,
          workoutId: newWorkout?.id,
        })
        .returning({ id: exercise?.id });

      return newExer?.id;
    })
  );

  newExercise?.forEach((exerciseId) => {
    [1, 2, 3]?.forEach(async (_val, idx) => {
      await db.insert(set).values({
        exerciseId: exerciseId,
        reps: 12,
        weight: 80,
        setNo: idx + 1,
      });
    });
  });
}

async function setupCronJob() {
  console.log('<-----------------------setup called--------------------->');
  try {
    const users = await getAllUsers();

    for (const user of users) {
      await createWorkoutForUser(user);
    }

    console.log('Workouts for all users created for the upcoming week');
  } catch (error) {
    console.error('Error creating workouts for users:', error);
  }
  //   return nodeCron.schedule('0 0 * * * *', async () => {
  //   });
}

// setupCronJob();

export default async function handler(req, res) {
  res.status(200).json('Cron job set up');
}
