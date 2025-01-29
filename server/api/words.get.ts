import { db } from '~~/server/db'
import { words } from '~~/server/db/schema'
import { eq, sql } from 'drizzle-orm'
import type { H3Event } from 'h3'

/** Number of word pairs to return for the matching game */
const NUMBER_OF_WORDS = 5

/**
 * Get random words for the matching game
 * @param level - The difficulty level of the words
 * @returns Array of word pairs in English and Tagalog
 */
export default defineEventHandler(async (event: H3Event) => {
	const query = getQuery(event)
	const level = Number(query.level) || 1

	// Validate level
	if (level < 1 || level > 5 || !Number.isInteger(level)) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Level must be an integer between 1 and 5',
		})
	}

	const result = await db
		.select({
			id: words.id,
			en: words.en,
			tl: words.tl,
		})
		.from(words)
		.where(eq(words.level, level))
		.orderBy(sql`RANDOM()`)
		.limit(NUMBER_OF_WORDS)

	return result
})
