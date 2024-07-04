import { db } from './db';
import { exerciseList } from './schema/Workout';

const main = async () => {
  const exerData = [
    {
      id: 1,
      name: 'Push-up',
      desc: 'A bodyweight exercise that primarily works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 2,
      name: 'Squat',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    },
    {
      id: 3,
      name: 'Pull-up',
      desc: 'An upper body exercise that primarily works the back and biceps.',
      targetMuscles: ['Back', 'Biceps'],
    },
    {
      id: 4,
      name: 'Plank',
      desc: 'A core exercise that strengthens the abdominals, back, and shoulders.',
      targetMuscles: ['Abdominals', 'Back', 'Shoulders'],
    },
    {
      id: 5,
      name: 'Lunge',
      desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    },
    {
      id: 6,
      name: 'Bench Press',
      desc: 'A strength training exercise that works the chest, shoulders, and triceps.',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    },
    {
      id: 7,
      name: 'Dumbbell Shoulder Press',
      desc: 'An exercise that targets the shoulder muscles.',
      targetMuscles: ['Shoulders'],
    },
    {
      id: 8,
      name: 'Bicep Curl',
      desc: 'An exercise that targets the biceps.',
      targetMuscles: ['Biceps'],
    },
    {
      id: 9,
      name: 'Tricep Dip',
      desc: 'An exercise that targets the triceps.',
      targetMuscles: ['Triceps'],
    },
    {
      id: 10,
      name: 'Squat',
      desc: ' lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    },
    {
      id: 11,
      name: 'Deadlift',
      desc: 'A compound movement that targets the entire posterior chain.',
      targetMuscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    },
    {
      id: 12,
      name: 'Leg Press',
      desc: 'A lower body exercise that primarily targets the quadriceps.',
      targetMuscles: ['Quadriceps'],
    },
    {
      id: 13,
      name: 'Calf Raise',
      desc: 'An exercise that targets the calf muscles.',
      targetMuscles: ['Calves'],
    },
  ];

  console.log('Seed start');
  await db.insert(exerciseList).values(exerData);
  console.log('Seed done');
};

main();
