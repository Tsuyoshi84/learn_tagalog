/**
 * Shuffle the array
 * @param array - The array to shuffle
 * @returns The shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
	return array.sort(() => Math.random() - 0.5)
}
