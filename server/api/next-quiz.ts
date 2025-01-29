import { and, asc, eq } from 'drizzle-orm'
import { integer, maxValue, minValue, number, object, pipe } from 'valibot'
import { db } from '~~/server/db'
import { texts, userProgress } from '~~/server/db/schema'
import { getUser } from '~~/server/utils/getUser'
import { parseRequestBody } from '~~/server/utils/parseRequestBody'

const requestBodySchema = object({
	/** The level of the text to get */
	level: pipe(number(), integer(), minValue(1), maxValue(5)),
	/** The index of the text to get */
	index: pipe(number(), integer(), minValue(0)),
})

/**
 * API endpoint to get the next quiz for a user
 */
export default defineEventHandler(async (event) => {
	const user = await getUser(event)
	const { level, index } = await parseRequestBody(event, requestBodySchema)

	const result = await db
		.select({
			id: texts.id,
			en: texts.en,
			tl: texts.tl,
			level: texts.level,
			nextDueDate: userProgress.nextDueDate,
			memoryLevel: userProgress.memoryLevel,
			lastAnsweredAt: userProgress.lastAnsweredAt,
		})
		.from(texts)
		.leftJoin(userProgress, eq(userProgress.textId, texts.id))
		.orderBy(asc(userProgress.nextDueDate))
		.where(and(eq(userProgress.userId, user.id), eq(texts.level, level)))
		.offset(index)
		.limit(1)
	const text = result[0]

	if (!text) {
		throw createError({
			statusCode: 404,
			statusMessage: 'No text found',
		})
	}

	return text
})
