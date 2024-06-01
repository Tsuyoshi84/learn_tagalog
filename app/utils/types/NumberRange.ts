/**
 * Make a range of numbers from `L` to `H`.
 * See: https://github.com/type-challenges/type-challenges/issues/17927
 *
 * @example
 * type Range1 = NumberRange<2, 5>
 * //   ^? 2 | 3 | 4 | 5
 */
export type NumberRange<L, H, F extends unknown[] = [], R extends unknown[] = []> = L extends H
	? R[number] | H
	: F['length'] extends L
		? NumberRange<[...F, unknown]['length'], H, [...F, unknown], [...R, L]>
		: NumberRange<L, H, [...F, unknown]>
