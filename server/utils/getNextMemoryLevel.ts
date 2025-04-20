import { clamp } from '#shared/utils/clamp'

/** Minimum memory level */
const MIN_MEMORY_LEVEL = 1 as const

/** Maximum memory level */
const MAX_MEMORY_LEVEL = 8 as const

/** Maps memory levels to the number of days until the next review is due  */
const MEMORY_LEVEL_TO_NEXT_DUE_DATE = {
	1: 1, // 1 day
	2: 2, // 2 days
	3: 5, // 5 days
	4: 11, // 11 days
	5: 24, // 24 days
	6: 52, // ~2 months
	7: 114, // ~4 months
	8: 230, // ~8 months
} as const

type GetNextMemoryLevelParams = {
	/** The current memory level of the text */
	currentMemoryLevel: number
	/** Whether the user remembered the text or not */
	remembered: boolean
}

type ReturnType = {
	/** The next memory level */
	nextMemoryLevel: keyof typeof MEMORY_LEVEL_TO_NEXT_DUE_DATE
	/** The interval in hours */
	interval: number
}

/**
 * Get the next memory level and interval for a given text
 * @param params - The parameters for the next memory level
 * @returns The next memory level and interval
 */
export function getNextMemoryLevel(params: GetNextMemoryLevelParams): ReturnType {
	const { currentMemoryLevel, remembered } = params

	const nextMemoryLevel = clamp(
		currentMemoryLevel + (remembered ? 1 : -1),
		MIN_MEMORY_LEVEL,
		MAX_MEMORY_LEVEL,
	) as keyof typeof MEMORY_LEVEL_TO_NEXT_DUE_DATE

	const interval = MEMORY_LEVEL_TO_NEXT_DUE_DATE[nextMemoryLevel] * 24

	return {
		nextMemoryLevel,
		interval,
	}
}
