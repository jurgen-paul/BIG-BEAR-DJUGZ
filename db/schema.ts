import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'users' table using Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define 'quiz_scores' to save educational quiz outcomes
export const quizScores = pgTable('quiz_scores', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  score: integer('score').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  earnedBadges: text('earned_badges').notNull(), // Serialized JSON string of earned badges
  createdAt: timestamp('created_at').defaultNow(),
});

// Define relationships for users
export const usersRelations = relations(users, ({ many }) => ({
  quizScores: many(quizScores),
}));

// Define relationships for quiz_scores
export const quizScoresRelations = relations(quizScores, ({ one }) => ({
  user: one(users, {
    fields: [quizScores.userId],
    references: [users.id],
  }),
}));
