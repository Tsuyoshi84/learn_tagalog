/**
 * Drizzle schema definition.
 * It defines the tables and their columns.
 * See for more information:
 * - https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 * - https://supabase.com/docs/guides/database/drizzle
 */

import { pgEnum, pgSchema, pgTable, smallint, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const authSchema = pgSchema('auth')

/**
 * Users table.
 * It stores the users of the application.
 */
const users = authSchema.table('users', {
	/** The ID of the user */
	id: uuid('id').primaryKey(),
})

/**
 * Texts table.
 * It stores the texts both in English and Tagalog for the quiz and the translation challenge.
 */
export const texts = pgTable('texts', {
	/** The ID of the text */
	id: uuid('id').defaultRandom().primaryKey(),
	/** The English text */
	en: text('en').notNull(),
	/** The Tagalog text */
	tl: text('tl').notNull(),
	/** The level of the text. 1 is the easiest, 5 is the hardest */
	level: smallint('level').default(1).notNull(),
})
export type InsertText = typeof texts.$inferInsert
export type SelectText = typeof texts.$inferSelect

/**
 * User progress table.
 * It stores the progress of the user for each text.
 */
export const userProgress = pgTable('user_progress', {
	/** The ID of the user progress */
	id: uuid('id').defaultRandom().primaryKey(),
	/** The date when the user progress was created */
	createdAt: timestamp('created_at').defaultNow().notNull(),
	/** The ID of the text */
	textId: uuid('text_id')
		.notNull()
		.references(() => texts.id, { onDelete: 'cascade' }),
	/** The ID of the user */
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	/** The memory level of the user for the text */
	memoryLevel: smallint('memory_level').default(1).notNull(), // Assuming `1` is the default value
	/** The date when the user last answered the text */
	lastAnsweredAt: timestamp('last_answered_at'),
	/** The date when the user next due date for the text */
	nextDueDate: timestamp('next_due_date').defaultNow().notNull(),
})
export type InsertUserProgress = typeof userProgress.$inferInsert
export type SelectUserProgress = typeof userProgress.$inferSelect

/**
 * Word category enum.
 * It defines the possible categories of the word.
 */
export const wordCategoryEnum = pgEnum('word_category', ['verb', 'adjective', 'noun'])

/**
 * Words table.
 * It stores the various words both in English and Tagalog.
 */
export const words = pgTable('words', {
	/** The ID of the word */
	id: uuid('id').defaultRandom().primaryKey(),
	/** The English word */
	en: text('en').notNull(),
	/** The Tagalog word */
	tl: text('tl').notNull(),
	/** The category of the word. Can be 'verb', 'adjective', or 'noun' */
	category: wordCategoryEnum('category').notNull(),
	/** The level of the word. 1 is the easiest, 5 is the hardest */
	level: smallint('level').default(1).notNull(),
})
export type InsertWord = typeof words.$inferInsert
export type SelectWord = typeof words.$inferSelect
