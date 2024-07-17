import { relations } from 'drizzle-orm';
import { serial, pgTable, integer, timestamp, pgEnum, text } from 'drizzle-orm/pg-core';
import { users } from './User';

// b: 1
// c: 2
// l: 3
// t: 4
// b: 5
// s: 6

export const statusEnum = pgEnum('status', ['1', '0']);
export const intensityEnum = pgEnum('intensity', ['1', '2', '3']);
export const splitEnum = pgEnum('split', ['1', '2', '3', '4', '5', '6']);

export const workout = pgTable('workout', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  status: statusEnum('status'),
  split: splitEnum('split').array(),
  userId: integer('user_id').references(() => users.id),
});

export const workoutRelations = relations(workout, ({ one, many }) => ({
  user: one(users, {
    fields: [workout?.userId],
    references: [users?.id],
  }),
  exercises: many(exercise),
}));

export const exercise = pgTable('exercise', {
  id: serial('id').primaryKey(),
  set: integer('set').default(3),
  exerciseId: integer('exercise_id').notNull(),
  workoutId: integer('workout_id').references(() => workout.id, { onDelete: 'cascade' }),
});

export const exerciseRelations = relations(exercise, ({ one, many }) => ({
  workout: one(workout, {
    fields: [exercise?.workoutId],
    references: [workout?.id],
  }),
  sets: many(set),
}));

export const set = pgTable('set', {
  id: serial('id').primaryKey(),
  setNo: integer('set_no'),
  reps: integer('reps').default(12),
  intensity: intensityEnum('intensity'),
  weight: integer('weight'),
  completedReps: integer('completed_reps').default(0),

  exerciseId: integer('exercise_id').references(() => exercise.id, { onDelete: 'cascade' }),
});

export const setRelations = relations(set, ({ one }) => ({
  exercise: one(exercise, {
    fields: [set?.exerciseId],
    references: [exercise?.id],
  }),
}));

export const exerciseList = pgTable('exercise_list', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  desc: text('desc'),
  targetMuscles: text('target_muscles').array(),
});
