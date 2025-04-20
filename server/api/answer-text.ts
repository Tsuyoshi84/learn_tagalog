import { Temporal } from '@js-temporal/polyfill'
import { and, eq } from 'drizzle-orm'
import { boolean, object, parse, pipe, string, uuid } from 'valibot'
import { db } from '~~/server/db'
import { userProgress } from '~~/server/db/schema'
import { getNextMemoryLevel } from '~~/server/utils/getNextMemoryLevel'
import { getUser } from '~~/server/utils/getUser'

const requestBodySchema = object({
	/** The ID of the text being answered */
	textId: pipe(string(), uuid()),
	/** Whether the user remembered the text or not */
	remembered: boolean(),
})

/**
 * API endpoint to handle user's text memory response and update their progress
 */
export default defineEventHandler(async (event) => {
	const { textId, remembered } = await readValidatedBody(event, (responseBody) =>
		parse(requestBodySchema, responseBody),
	)

	const user = await getUser(event)

	// Get current progress
	const currentProgressResult = await db
		.select()
		.from(userProgress)
		.where(and(eq(userProgress.textId, textId), eq(userProgress.userId, user.id)))

	const currentMemoryLevel = currentProgressResult[0]?.memoryLevel ?? 1

	const { nextMemoryLevel, interval } = getNextMemoryLevel({
		currentMemoryLevel,
		remembered,
	})

	// Calculate next due date
	const now = new Date()
	const nextDueDate = new Date(Temporal.Now.instant().add({ hours: interval }).toString())

	// Update progress
	await db
		.insert(userProgress)
		.values({
			textId,
			createdAt: now,
			userId: user.id,
			memoryLevel: nextMemoryLevel,
			lastAnsweredAt: now,
			nextDueDate,
		})
		.onConflictDoUpdate({
			target: [userProgress.textId, userProgress.userId],
			set: {
				memoryLevel: nextMemoryLevel,
				lastAnsweredAt: now,
				nextDueDate,
			},
		})

	return {
		memoryLevel: nextMemoryLevel,
		nextDueDate,
	}
})
