import { relations } from 'drizzle-orm';
import { serial, pgTable, integer, timestamp, pgEnum, text } from 'drizzle-orm/pg-core';
import { users } from './User';

export const statusEnum = pgEnum('status', ['complete', 'inComplete']);

export const workout = pgTable('workout', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  status: statusEnum('status'),
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
  name: text('name').notNull(),
  sets: integer('sets').default(3),

  workoutId: integer('workout_id').references(() => workout.id),
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
  reps: integer('reps').default(12),
  completedReps: integer('completed_reps').default(0),

  exerciseId: integer('exercise_id').references(() => exercise.id),
});

export const setRelations = relations(set, ({ one }) => ({
  exercise: one(exercise, {
    fields: [set?.exerciseId],
    references: [exercise?.id],
  }),
}));
