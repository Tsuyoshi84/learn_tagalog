import type { H3Event } from 'h3'
import {
	type ErrorMessage,
	type InferOutput,
	type ObjectEntries,
	type ObjectIssue,
	type ObjectSchema,
	ValiError,
	parse,
} from 'valibot'

/**
 * Parses the request body of an event using a Valibot schema and returns the parsed data.
 * @param event - The H3Event object containing the request body.
 * @param schema - The Valibot schema used to parse the request body.
 * @returns The parsed data based on the Valibot schema.
 */
export async function parseRequestBody<
	TEntries extends ObjectEntries,
	TMessage extends ErrorMessage<ObjectIssue> | undefined,
	T extends ObjectSchema<TEntries, TMessage>,
>(event: H3Event, schema: T): Promise<InferOutput<T>> {
	const body = await readBody(event)

	try {
		return parse(schema, body)
	} catch (error) {
		if (!(error instanceof ValiError)) throw error

		throw createError({
			statusCode: 400,
			message: `Invalid request body. ${error.message}`,
		})
	}
}
