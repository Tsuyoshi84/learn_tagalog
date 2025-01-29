import { eq, sql } from 'drizzle-orm'
import type { H3Event } from 'h3'
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import { db } from '~~/server/db'
import { words } from '~~/server/db/schema'
import { parseRequestQuery } from '~~/server/utils/parseRequestQuery'

/** Number of word pairs to return for the matching game */
const NUMBER_OF_WORDS = 5

const requestQuerySchema = object({
	/** The difficulty level of the words */
	level: pipe(
		string(),
		transform((value) => Number.parseInt(value, 10)),
		integer(),
		minValue(1),
		maxValue(5),
	),
})

/**
 * Get random words for the matching game
 * @param level - The difficulty level of the words
 * @returns Array of word pairs in English and Tagalog
 */
export default defineEventHandler(async (event: H3Event) => {
	const { level } = await parseRequestQuery(event, requestQuerySchema)

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
