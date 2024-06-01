/**
 * Asserts that an array has at least a certain number of elements.
 * @param value The array to check.
 * @param n The minimum number of elements required.
 * @param [msg] An optional error message to throw if the assertion fails.
 * @throws If the array has less than N elements and no error message is provided.
 */
export function assertHasAtLeast<T, N extends NumberRange<1, 10>>(
	value: T[],
	n: N,
	msg?: string,
): asserts value is ArrayAtLeast<T, N> {
	if (value.length < n)
		throw new Error(
			msg ??
				`Expected the array to have at least ${n} elements, but it has ${value.length} elements.`,
		)
}
