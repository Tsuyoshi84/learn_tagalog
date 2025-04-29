import { Temporal } from '@js-temporal/polyfill'
import { and, asc, eq } from 'drizzle-orm'
import { readValidatedBody } from 'h3'
import { integer, maxValue, minValue, number, object, parse, pipe } from 'valibot'
import { db } from '~~/server/db'
import { texts, userProgress } from '~~/server/db/schema'
import { getUser } from '~~/server/utils/getUser'

const requestBodySchema = object({
	/** The level of the text to get */
	level: pipe(number(), integer(), minValue(1), maxValue(5)),
	/** The index of the text to get */
	index: pipe(number(), integer(), minValue(0)),
})

type Response =
	| {
			hasQuiz: true
			text: {
				id: string
				en: string
				tl: string
				level: number
				nextDueDate: Date | null
				memoryLevel: number
				lastAnsweredAt: Date | null
			}
	  }
	| {
			hasQuiz: false
			nextDueDate: Date | null
	  }

/**
 * API endpoint to get the next quiz for a user.
 * If there is no quiz for the user to show, it will return undefined.
 */
export default defineEventHandler(async (event): Promise<Response> => {
	const user = await getUser(event)
	const { level, index } = await readValidatedBody(event, (responseBody) =>
		parse(requestBodySchema, responseBody),
	)

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

	const text = result.at(0)

	if (text === undefined) {
		return {
			hasQuiz: false,
			nextDueDate: null,
		}
	}

	const now = Temporal.Now.instant()
	if (
		text.nextDueDate !== null &&
		Temporal.Instant.compare(Temporal.Instant.from(text.nextDueDate.toISOString()), now) > 0
	) {
		// If the next due date is in the future, we don't have a quiz for the user yet
		return {
			hasQuiz: false,
			nextDueDate: text.nextDueDate,
		}
	}

	const { memoryLevel, ...rest } = text

	return {
		hasQuiz: true,
		text: {
			...rest,
			memoryLevel: memoryLevel ?? 0,
		},
	}
})
