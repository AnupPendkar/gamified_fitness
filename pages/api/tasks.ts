import { db } from '@/lib/db';
import { userDetails, users } from '@/lib/schema/User';
import { workout } from '@/lib/schema/Workout';
import { ETarMuscle } from '@/app/typings/common';

// M: 1,
// T: 2,
// W: 3,
// T: 4,
// F: 5,
// S: 6,
// S: 7

async function getAllUsers() {
  return await db.select().from(userDetails);
}

async function createPlanForUser(userId) {
  await db.insert(userDetails).values({
    userId: userId,
    phoneNo: Math.random() + '',
    weight: '71.2',
    height: '177.8',
    plan: [
      {
        day: 1,
        split: [ETarMuscle.BACK, ETarMuscle.BICEPS],
        exercises: [
          {
            exerciseId: 1,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '0',
              },
            ],
          },
          {
            exerciseId: 100,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 8,
                completedReps: 0,
                weight: '100',
              },
              {
                setNo: 3,
                totalReps: 4,
                completedReps: 0,
                weight: '120',
              },
              {
                setNo: 4,
                totalReps: 1,
                completedReps: 0,
                weight: '135',
              },
            ],
          },
          {
            exerciseId: 2,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '50',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '50',
              },
              {
                setNo: 3,
                totalReps: 8,
                completedReps: 0,
                weight: '50',
              },
            ],
          },
          {
            exerciseId: 3,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '25',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '25',
              },
              {
                setNo: 3,
                totalReps: 12,
                completedReps: 0,
                weight: '20',
              },
            ],
          },
          {
            exerciseId: 4,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '35',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '35',
              },
              {
                setNo: 3,
                totalReps: 8,
                completedReps: 0,
                weight: '35',
              },
            ],
          },

          {
            exerciseId: 7,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '12',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
            ],
          },
          {
            exerciseId: 10,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '12',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
            ],
          },
        ],
      },
      {
        day: 2,
        split: [ETarMuscle.CHEST, ETarMuscle.SHOULDERS],
        exercises: [
          {
            exerciseId: 13,
            sets: [
              {
                setNo: 1,
                totalReps: 6,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 2,
                completedReps: 0,
                weight: '90',
              },
              {
                setNo: 3,
                totalReps: 1,
                completedReps: 0,
                weight: '95',
              },
            ],
          },
          {
            exerciseId: 18,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '60',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '70',
              },
              {
                setNo: 3,
                totalReps: 8,
                completedReps: 0,
                weight: '70',
              },
            ],
          },
          {
            exerciseId: 17,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '70',
              },
            ],
          },

          {
            exerciseId: 19,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '20',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '22.5',
              },
              {
                setNo: 3,
                totalReps: 6,
                completedReps: 0,
                weight: '25',
              },
            ],
          },
          {
            exerciseId: 21,
            sets: [
              {
                setNo: 1,
                totalReps: 14,
                completedReps: 0,
                weight: '10',
              },
              {
                setNo: 2,
                totalReps: 14,
                completedReps: 0,
                weight: '10',
              },
              {
                setNo: 2,
                totalReps: 14,
                completedReps: 0,
                weight: '7.5',
              },
            ],
          },
          {
            exerciseId: 22,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '20',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '20',
              },
            ],
          },
        ],
      },
      {
        day: 3,
        split: [ETarMuscle.LEGS, ETarMuscle.TRICEPS],
        exercises: [
          {
            exerciseId: 24,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 3,
                completedReps: 0,
                weight: '110',
              },
              {
                setNo: 3,
                totalReps: 1,
                completedReps: 0,
                weight: '130',
              },
            ],
          },
          {
            exerciseId: 30,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '60',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '60',
              },
              {
                setNo: 3,
                totalReps: 12,
                completedReps: 0,
                weight: '50',
              },
            ],
          },
          {
            exerciseId: 26,
            sets: [
              {
                setNo: 1,
                totalReps: 16,
                completedReps: 0,
                weight: '100',
              },
              {
                setNo: 2,
                totalReps: 16,
                completedReps: 0,
                weight: '120',
              },
              {
                setNo: 3,
                totalReps: 14,
                completedReps: 0,
                weight: '140',
              },
            ],
          },
          {
            exerciseId: 27,
            sets: [
              {
                setNo: 1,
                totalReps: 16,
                completedReps: 0,
                weight: '40',
              },
              {
                setNo: 2,
                totalReps: 16,
                completedReps: 0,
                weight: '50',
              },
              {
                setNo: 3,
                totalReps: 14,
                completedReps: 0,
                weight: '50',
              },
            ],
          },
          {
            exerciseId: 34,
            sets: [
              {
                setNo: 1,
                totalReps: 14,
                completedReps: 0,
                weight: '20',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '25',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '30',
              },
            ],
          },
          {
            exerciseId: 36,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '30',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '30',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '30',
              },
            ],
          },
          {
            exerciseId: 38,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '40',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '40',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '40',
              },
            ],
          },
        ],
      },
      {
        day: 4,
        split: [ETarMuscle.BACK, ETarMuscle.BICEPS],
        exercises: [
          {
            exerciseId: 1,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '0',
              },
            ],
          },
          {
            exerciseId: 100,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 8,
                completedReps: 0,
                weight: '100',
              },
              {
                setNo: 3,
                totalReps: 4,
                completedReps: 0,
                weight: '120',
              },
              {
                setNo: 4,
                totalReps: 1,
                completedReps: 0,
                weight: '135',
              },
            ],
          },
          {
            exerciseId: 2,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '50',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '50',
              },
              {
                setNo: 3,
                totalReps: 8,
                completedReps: 0,
                weight: '50',
              },
            ],
          },
          {
            exerciseId: 3,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '25',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '25',
              },
              {
                setNo: 3,
                totalReps: 12,
                completedReps: 0,
                weight: '20',
              },
            ],
          },
          {
            exerciseId: 4,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '35',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '35',
              },
              {
                setNo: 3,
                totalReps: 8,
                completedReps: 0,
                weight: '35',
              },
            ],
          },

          {
            exerciseId: 7,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '12',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
            ],
          },
          {
            exerciseId: 10,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '12',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '15',
              },
            ],
          },
        ],
      },
      {
        day: 5,
        split: [ETarMuscle.CHEST, ETarMuscle.SHOULDERS],
        exercises: [
          {
            exerciseId: 13,
            sets: [
              {
                setNo: 1,
                totalReps: 6,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 2,
                completedReps: 0,
                weight: '90',
              },
              {
                setNo: 3,
                totalReps: 1,
                completedReps: 0,
                weight: '95',
              },
            ],
          },
          {
            exerciseId: 18,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '60',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '70',
              },
              {
                setNo: 3,
                totalReps: 8,
                completedReps: 0,
                weight: '70',
              },
            ],
          },
          {
            exerciseId: 17,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '70',
              },
            ],
          },

          {
            exerciseId: 19,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '20',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '22.5',
              },
              {
                setNo: 3,
                totalReps: 6,
                completedReps: 0,
                weight: '25',
              },
            ],
          },
          {
            exerciseId: 21,
            sets: [
              {
                setNo: 1,
                totalReps: 14,
                completedReps: 0,
                weight: '10',
              },
              {
                setNo: 2,
                totalReps: 14,
                completedReps: 0,
                weight: '10',
              },
              {
                setNo: 2,
                totalReps: 14,
                completedReps: 0,
                weight: '7.5',
              },
            ],
          },
          {
            exerciseId: 22,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '20',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '20',
              },
            ],
          },
        ],
      },

      {
        day: 6,
        split: [ETarMuscle.LEGS, ETarMuscle.TRICEPS],
        exercises: [
          {
            exerciseId: 24,
            sets: [
              {
                setNo: 1,
                totalReps: 10,
                completedReps: 0,
                weight: '80',
              },
              {
                setNo: 2,
                totalReps: 3,
                completedReps: 0,
                weight: '110',
              },
              {
                setNo: 3,
                totalReps: 1,
                completedReps: 0,
                weight: '130',
              },
            ],
          },
          {
            exerciseId: 30,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '60',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '60',
              },
              {
                setNo: 3,
                totalReps: 12,
                completedReps: 0,
                weight: '50',
              },
            ],
          },
          {
            exerciseId: 26,
            sets: [
              {
                setNo: 1,
                totalReps: 16,
                completedReps: 0,
                weight: '100',
              },
              {
                setNo: 2,
                totalReps: 16,
                completedReps: 0,
                weight: '120',
              },
              {
                setNo: 3,
                totalReps: 14,
                completedReps: 0,
                weight: '140',
              },
            ],
          },
          {
            exerciseId: 27,
            sets: [
              {
                setNo: 1,
                totalReps: 16,
                completedReps: 0,
                weight: '40',
              },
              {
                setNo: 2,
                totalReps: 16,
                completedReps: 0,
                weight: '50',
              },
              {
                setNo: 3,
                totalReps: 14,
                completedReps: 0,
                weight: '50',
              },
            ],
          },
          {
            exerciseId: 34,
            sets: [
              {
                setNo: 1,
                totalReps: 14,
                completedReps: 0,
                weight: '20',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '25',
              },
              {
                setNo: 2,
                totalReps: 10,
                completedReps: 0,
                weight: '30',
              },
            ],
          },
          {
            exerciseId: 36,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '30',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '30',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '30',
              },
            ],
          },
          {
            exerciseId: 38,
            sets: [
              {
                setNo: 1,
                totalReps: 12,
                completedReps: 0,
                weight: '40',
              },
              {
                setNo: 2,
                totalReps: 12,
                completedReps: 0,
                weight: '40',
              },
              {
                setNo: 3,
                totalReps: 10,
                completedReps: 0,
                weight: '40',
              },
            ],
          },
        ],
      },
      {
        day: 7,
        split: [ETarMuscle.REST],
        exercises: [],
      },
    ],
  });
}

// Array<{
// }
async function createWorkoutForUser(user) {
  user?.plan?.forEach(async (itm, idx) => {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + idx);
    console.log(nextDate);

    const [newWorkout, ...rest] = await db
      .insert(workout)
      .values({
        createdAt: nextDate,
        split: itm?.split,
        userId: user?.userId,
        status: 0 as any,
        exercises: itm?.exercises,
      })
      .returning({ id: users?.id });
  });
}

async function setupCronJob() {
  console.log('<-----------------------setup called--------------------->');
  try {
    const users = await getAllUsers();

    for (const user of users) {
      // createPlanForUser((user as any)?.id);
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
