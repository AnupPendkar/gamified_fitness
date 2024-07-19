import { db } from './db';
import { exerciseList } from './schema/Workout';

const main = async () => {
  const exerData = [
    // Back
    {
      id: 1,
      name: 'Pull ups',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back', 'Biceps'],
    },
    {
      id: 100,
      name: 'Conventional Deadlift',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back', 'Biceps'],
    },
    {
      id: 2,
      name: 'Lat pull down',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back'],
    },
    {
      id: 3,
      name: 'Cable pull overs',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back'],
    },
    {
      id: 4,
      name: 'Seated rowing',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back'],
    },
    {
      id: 5,
      name: 'T bar rows',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back'],
    },
    {
      id: 6,
      name: 'Barbel rowing',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back'],
    },

    // Biceps

    {
      id: 7,
      name: 'Barbel curls',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Bicpes'],
    },
    {
      id: 8,
      name: 'Dumbell curls',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Bicpes'],
    },
    {
      id: 9,
      name: 'Rope bicep curls',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Bicpes'],
    },
    {
      id: 10,
      name: 'Hammer curls',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Bicpes'],
    },
    {
      id: 11,
      name: 'Concentration curls',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Bicpes'],
    },

    // Chest

    {
      id: 12,
      name: 'Push-up',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 13,
      name: 'Bench press',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 14,
      name: 'Dumbell chest press',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 15,
      name: 'Inclined Dumbell chest press',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 16,
      name: 'Inclined Barbell chest press',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 17,
      name: 'Smith chest press',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 18,
      name: 'Chest pec deck',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },

    // Shoulders

    {
      id: 19,
      name: 'Dumbbell Shoulder Press',
      desc: 'An exercise that targets the shoulder muscles.',
      targetMuscles: ['Shoulders'],
    },
    {
      id: 20,
      name: 'Barbell Shoulder Press',
      desc: 'An exercise that targets the shoulder muscles.',
      targetMuscles: ['Shoulders'],
    },
    {
      id: 21,
      name: 'Lateral raises',
      desc: 'An exercise that targets the shoulder muscles.',
      targetMuscles: ['Shoulders'],
    },
    {
      id: 22,
      name: 'Rear delts',
      desc: 'An exercise that targets the shoulder muscles.',
      targetMuscles: ['Shoulders'],
    },
    {
      id: 23,
      name: 'Traps',
      desc: 'An exercise that targets the shoulder muscles.',
      targetMuscles: ['Shoulders'],
    },

    // Legs

    {
      id: 24,
      name: 'Squat',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    },
    {
      id: 25,
      name: 'Lunge',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    },
    {
      id: 26,
      name: 'Leg Press',
      desc: 'A lower body exercise that primarily targets the quadriceps.',
      targetMuscles: ['Quadriceps'],
    },
    {
      id: 27,
      name: 'Calf Raise',
      desc: 'An exercise that targets the calf muscles.',
      targetMuscles: ['Calves'],
    },
    {
      id: 28,
      name: 'Hack Squat',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    },
    {
      id: 29,
      name: 'Bulgarian squats',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    },
    {
      id: 30,
      name: 'Leg curl',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Hamstrings', 'Glutes'],
    },
    {
      id: 31,
      name: 'Leg extension',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Glutes'],
    },
    {
      id: 32,
      name: 'Stiffed leg deadlift',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Glutes'],
    },

    // Triceps
    {
      id: 33,
      name: 'Tricep Dip',
      desc: 'An exercise that targets the triceps.',
      targetMuscles: ['Triceps'],
    },
    {
      id: 34,
      name: 'Skull crushers',
      desc: 'An exercise that targets the triceps.',
      targetMuscles: ['Triceps'],
    },
    {
      id: 35,
      name: 'Single hand triceps',
      desc: 'An exercise that targets the triceps.',
      targetMuscles: ['Triceps'],
    },
    {
      id: 36,
      name: 'Cable bar tricep extension',
      desc: 'An exercise that targets the triceps.',
      targetMuscles: ['Triceps'],
    },
    {
      id: 37,
      name: 'Cable rope tricep extension',
      desc: 'An exercise that targets the triceps.',
      targetMuscles: ['Triceps'],
    },
    {
      id: 38,
      name: 'Close grip bench press',
      desc: 'An exercise that targets the triceps.',
      targetMuscles: ['Triceps'],
    },

    // Abs

    {
      id: 39,
      name: 'Plank',
      desc: 'A core exercise that strengthens the abdominals, back, and shoulders.',
      targetMuscles: ['Abdominals', 'Back', 'Shoulders'],
    },
  ];

  console.log('Seed start');
  await db.insert(exerciseList).values(exerData);
  console.log('Seed done');
};

main();
