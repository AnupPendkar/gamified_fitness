import { relations } from 'drizzle-orm';
import { date, serial, pgEnum, pgTable, text, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 100 }).unique(),
  password: varchar('password', { length: 256 }).notNull(),
});

export const userRelations = relations(users, ({ one }) => ({
  userDetails: one(userDetails),
}));

export const genderEnum = pgEnum('gender', ['Male', 'Female', 'Trans']);

export const userDetails = pgTable('user_details', {
  userId: integer('user_id').references(() => users.id),
  phoneNo: varchar('phoneNo', { length: 20 }).notNull().unique(),
  profileImg: varchar('profile_img'),
  gender: genderEnum('gender'),
  dob: date('date_of_birth'),
});
