import {
	type ErrorMessage,
	type InferOutput,
	type ObjectEntries,
	type ObjectIssue,
	type ObjectSchema,
	parse,
} from 'valibot'

/**
 * A composable that parses route query parameters using a Valibot schema.
 * @param schema - The Valibot schema to validate query parameters against
 * @returns A computed ref containing the parsed query parameters
 */
export function useQueryParamsWithSchema<
	TEntries extends ObjectEntries,
	TMessage extends ErrorMessage<ObjectIssue> | undefined,
	T extends ObjectSchema<TEntries, TMessage>,
>(schema: T): ComputedRef<InferOutput<T>> {
	const route = useRoute()
	return computed(() => parse(schema, route.query))
}
