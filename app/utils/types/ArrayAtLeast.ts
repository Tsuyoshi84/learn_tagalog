/**
 * Make a type that guarantees an array has at least `N` elements.
 *
 * @example
 * type AtLeast2 = ArrayAtLeast<number, 2>
 * // [number, number, ...number[]]
 */
export type ArrayAtLeast<T, N extends number, Result extends T[] = []> = N extends 0
	? never[]
	: Result['length'] extends N
		? [...Result, ...T[]]
		: ArrayAtLeast<T, N, [T, ...Result]>
