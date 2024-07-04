import { relations } from 'drizzle-orm';
import { serial, pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './User';

export const rewards = pgTable('rewards', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  task: text('task'),
  xp: integer('xp'),
  userId: integer('user_id').references(() => users.id),
});

export const rewardsRelations = relations(rewards, ({ one }) => ({
  user: one(users, {
    fields: [rewards?.userId],
    references: [users?.id],
  }),
}));
