import type { NumberRange } from '#imports'

/**
 * Checks if an array has at least a certain number of elements.
 * @param value The array to check.
 * @param n The minimum number of elements required. Must be greater than or equal to 0.
 * @returns `true` if the array has at least n elements, `false` otherwise.
 * @example
 * const arr = [1, 2, 3];
 * hasAtLeast(arr, 3); // true
 * hasAtLeast(arr, 4); // false
 */
export function hasAtLeast<T, N extends NumberRange<1, 10>>(
	value: readonly T[],
	n: N,
): value is ArrayAtLeast<T, N> {
	if (n < 0) {
		throw new TypeError(`The given value ${n} is invalid. n must be greater than or equal to 0`)
	}

	return value.length >= n
}
