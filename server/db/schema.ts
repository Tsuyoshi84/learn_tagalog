import { pgSchema, pgTable, smallint, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const authSchema = pgSchema('auth')

const users = authSchema.table('users', {
	id: uuid('id').primaryKey(),
})

export const texts = pgTable('texts', {
	id: uuid('id').defaultRandom().primaryKey(),
	en: text('en').notNull(),
	tl: text('tl').notNull(),
	level: smallint('level').default(1).notNull(),
})

export const userProgress = pgTable('user_progress', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	textId: uuid('text_id')
		.notNull()
		.references(() => texts.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	memoryLevel: smallint('memory_level').default(1).notNull(), // Assuming `1` is the default value
	lastAnsweredAt: timestamp('last_answered_at'),
	nextDueDate: timestamp('next_due_date').defaultNow().notNull(),
})

export type InsertText = typeof texts.$inferInsert
export type SelectText = typeof texts.$inferSelect
export type InsertUserProgress = typeof userProgress.$inferInsert
export type SelectUserProgress = typeof userProgress.$inferSelect
