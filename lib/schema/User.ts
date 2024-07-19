import { relations } from 'drizzle-orm';
import { date, serial, pgEnum, pgTable, text, varchar, integer, timestamp, primaryKey, jsonb, decimal } from 'drizzle-orm/pg-core';
import { rewards } from './Rewards';
import { workout } from './Workout';
import type { AdapterAccount } from '@auth/core/adapters';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 100 }).unique(),
  xp: integer('xp').default(0),
  password: varchar('password', { length: 256 }).notNull(),
  profileImg: varchar('profile_img'),
});

export const userRelations = relations(users, ({ one, many }) => ({
  rewards: many(rewards),
  workouts: many(workout),
  userDetails: one(userDetails),
  sessions: many(sessions),
}));

export const genderEnum = pgEnum('gender', ['Male', 'Female', 'Trans']);

export const userDetails = pgTable('user_details', {
  phoneNo: varchar('phoneNo', { length: 20 }).notNull().unique(),
  gender: genderEnum('gender'),
  dob: date('date_of_birth'),
  weight: decimal('weight'),
  height: decimal('height'),
  plan: jsonb('plan')
    .$type<{
      day: number;
      split: Array<number>;
      exercises: Array<{
        exerciseId: number;
        sets: Array<{
          setNo: number;
          totalReps: number;
          completedReps: number;
          intensity: number;
          weight: string;
        }>;
      }>;
    }>()
    .array(),
  userId: integer('user_id').references(() => users.id),
});

export const userDetailsRelations = relations(userDetails, ({ one }) => ({
  user: one(users, {
    fields: [userDetails?.userId],
    references: [users?.id],
  }),
}));

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: integer('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions?.userId],
    references: [users?.id],
  }),
}));

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires').notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
