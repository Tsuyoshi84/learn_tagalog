import { db } from '~~/server/db'
import { texts, userProgress } from '../db/schema'
import { and, asc, eq } from 'drizzle-orm'
import { getUser } from '~~/server/utils/getUser'

export default defineEventHandler(async (event) => {
	const user = await getUser(event)

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
		.where(and(eq(userProgress.userId, user.id), eq(texts.level, 1)))
		.limit(1)
	const text = result[0]

	console.log(text)

	if (!text) {
		throw createError({
			statusCode: 404,
			statusMessage: 'No text found',
		})
	}

	return text
})
