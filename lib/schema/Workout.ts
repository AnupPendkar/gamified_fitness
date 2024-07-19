import { relations } from 'drizzle-orm';
import { serial, pgTable, integer, timestamp, pgEnum, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './User';

// b: 1
// c: 2
// l: 3
// t: 4
// b: 5
// s: 6
// r: 7

export const statusEnum = pgEnum('status', ['1', '0']);
export const intensityEnum = pgEnum('intensity', ['1', '2', '3']);
export const splitEnum = pgEnum('split', ['1', '2', '3', '4', '5', '6', '7']);

export const workout = pgTable('workout', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  status: statusEnum('status'),
  split: splitEnum('split').array(),
  exercises: jsonb('exercises')
    .$type<{
      exerciseId: number;
      sets: Array<{
        setNo: number;
        totalReps: number;
        completedReps: number;
        intensity: number;
        weight: number;
      }>;
    }>()
    .array(),
  userId: integer('user_id').references(() => users.id),
});

export const workoutRelations = relations(workout, ({ one }) => ({
  user: one(users, {
    fields: [workout?.userId],
    references: [users?.id],
  }),
}));

export const exerciseList = pgTable('exercise_list', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  desc: text('desc'),
  targetMuscles: text('target_muscles').array(),
});
