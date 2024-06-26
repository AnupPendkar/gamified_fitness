import { relations } from 'drizzle-orm';
import { date, serial, pgEnum, pgTable, text, varchar, integer } from 'drizzle-orm/pg-core';
import { achievements } from './Achievements';
import { workout } from './Workout';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 100 }).unique(),
  xp: integer('xp').default(0),
  password: varchar('password', { length: 256 }).notNull(),
});

export const userRelations = relations(users, ({ one, many }) => ({
  achievements: many(achievements),
  workouts: many(workout),
  userDetails: one(userDetails),
}));

export const genderEnum = pgEnum('gender', ['Male', 'Female', 'Trans']);

export const userDetails = pgTable('user_details', {
  phoneNo: varchar('phoneNo', { length: 20 }).notNull().unique(),
  profileImg: varchar('profile_img'),
  gender: genderEnum('gender'),
  dob: date('date_of_birth'),
  userId: integer('user_id').references(() => users.id),
});
