import type { BaseSchema, Output } from 'valibot'
import { parse } from 'valibot'
import type { H3Event } from 'h3'

/**
 * Parse and validate request query using Valibot schema
 */
export async function parseRequestQuery<T extends BaseSchema>(
	event: H3Event,
	schema: T,
): Promise<Output<T>> {
	const query = getQuery(event)
	return parse(schema, query)
}
