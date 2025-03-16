import { and, eq } from 'drizzle-orm'
import { parse, boolean, object, pipe, string, uuid } from 'valibot'
import { db } from '~~/server/db'
import { userProgress } from '~~/server/db/schema'
import { getUser } from '~~/server/utils/getUser'
import { clamp } from '~~/shared/utils/clamp'

const requestBodySchema = object({
	/** The ID of the text being answered */
	textId: pipe(string(), uuid()),
	/** Whether the user remembered the text or not */
	remembered: boolean(),
})

/** Minimum memory level */
const MIN_MEMORY_LEVEL = 1 as const

/** Maximum memory level */
const MAX_MEMORY_LEVEL = 5 as const

/** Maps memory levels to the number of days until the next review is due  */
const MEMORY_LEVEL_TO_NEXT_DUE_DATE = {
	1: 1,
	2: 3,
	3: 7,
	4: 14,
	5: 30,
} as const

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

	const currentMemoryLevel = currentProgressResult[0]?.memoryLevel ?? MIN_MEMORY_LEVEL

	// Calculate next memory level
	const nextMemoryLevel = clamp(
		currentMemoryLevel + (remembered ? 1 : -1),
		MIN_MEMORY_LEVEL,
		MAX_MEMORY_LEVEL,
	) as keyof typeof MEMORY_LEVEL_TO_NEXT_DUE_DATE

	// Calculate next due date
	const span = MEMORY_LEVEL_TO_NEXT_DUE_DATE[nextMemoryLevel] * 24 * 60 * 60 * 1000
	const now = new Date()
	const nextDueDate = new Date(now.getTime() + span)

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
