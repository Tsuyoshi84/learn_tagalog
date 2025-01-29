/**
 * Shuffle the array.
 * This does not mutate the original array.
 * @param array - The array to shuffle
 * @returns The shuffled array
 */
export function shuffle<T>(array: readonly T[]): T[] {
	return array.toSorted(() => Math.random() - 0.5)
}
