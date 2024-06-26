import { relations } from 'drizzle-orm';
import { serial, pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './User';

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  task: text('task').notNull(),
  xp: integer('xp'),
  userId: integer('user_id').references(() => users.id),
});

export const achievementRelations = relations(achievements, ({ one }) => ({
  user: one(users, {
    fields: [achievements?.userId],
    references: [users?.id],
  }),
}));
