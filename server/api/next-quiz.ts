import { db } from '~~/server/db'
import { texts, userProgress } from '../db/schema'
import { and, asc, eq } from 'drizzle-orm'
import { getUser } from '~~/server/utils/getUser'

type RequestBody = {
	level: number
}

/**
 * API endpoint to get the next quiz for a user
 */
export default defineEventHandler(async (event) => {
	const user = await getUser(event)

	const body = await readBody<RequestBody>(event)
	if (!body?.level) {
		throw createError({
			statusCode: 400,
			message: 'Invalid request body. Required: level (number)',
		})
	}

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
		.where(and(eq(userProgress.userId, user.id), eq(texts.level, body.level)))
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
