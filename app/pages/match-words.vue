<script setup lang="ts">
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import AppButton from '~/components/AppButton.vue'
import WordBlock from '~/components/WordBlock.vue'
import { shuffle } from '~/utils/shuffle.ts'

const queryParamsSchema = object({
	/** The level of quiz */
	level: pipe(
		string(),
		transform((value) => Number.parseInt(value, 10)),
		integer(),
		minValue(1),
		maxValue(5),
	),
})

const parsedQueryParams = useQueryParamsWithSchema(queryParamsSchema)

/**
 * Word type for the matching game
 */
type Word = {
	id: string
	en: string
	tl: string
	selected?: boolean
}

/** Words to be matched */
const words = shallowRef<Word[]>([])
/** Set of matched word IDs */
const matchedWordIdSet = shallowRef<Set<string>>(new Set())
/** Whether the game is completed */
const isCompleted = computed<boolean>(
	() => words.value.length > 0 && matchedWordIdSet.value.size === words.value.length,
)
/** Shuffled English words */
const shuffledEnWords = shallowRef<Word[]>([])
/** Shuffled Tagalog words */
const shuffledTlWords = shallowRef<Word[]>([])

/**
 * Fetch words from the API
 */
async function fetchWords(): Promise<void> {
	const response = await $fetch('/api/words', {
		query: { level: parsedQueryParams.value.level },
	})

	if (response === undefined) return

	words.value = response
	shuffledEnWords.value = shuffle(words.value)
	shuffledTlWords.value = shuffle(words.value)
	matchedWordIdSet.value = new Set()
}

/** Selected English word */
const selectedEnWord = shallowRef<Word>()
/** Selected Tagalog word */
const selectedTlWord = shallowRef<Word>()

/**
 * Handle word selection
 */
function selectWord(word: Word, language: 'en' | 'tl'): void {
	// Skip if word is already matched
	if (matchedWordIdSet.value.has(word.id)) return

	if (language === 'en') {
		selectedEnWord.value = word
	} else {
		selectedTlWord.value = word
	}

	// Check if we have a pair selected
	if (selectedEnWord.value !== undefined && selectedTlWord.value !== undefined) {
		checkMatch()
	}
}

/**
 * Check if selected words match
 */
function checkMatch(): void {
	if (!selectedEnWord.value || !selectedTlWord.value) return

	if (selectedEnWord.value.id === selectedTlWord.value.id) {
		// Match found
		matchedWordIdSet.value.add(selectedEnWord.value.id)
		triggerRef(matchedWordIdSet)
	}

	// Reset selections
	selectedEnWord.value = undefined
	selectedTlWord.value = undefined
}

/**
 * Start next session
 */
function nextSession(): void {
	fetchWords()
}

// Initial fetch
onMounted(async () => {
	await fetchWords()
})
</script>

<template>
	<div class="container mx-auto py-8 text-center">
		<p class="text-md mb-4 text-center text-gray-600">Level {{ parsedQueryParams.level }}</p>

		<div class="mx-auto grid max-w-2xl grid-cols-2 gap-6">
			<!-- English words -->
			<div class="space-y-4">
				<WordBlock
					v-for="word in shuffledEnWords"
					:key="`en-${word.id}`"
					:text="word.en"
					:selected="selectedEnWord?.id === word.id"
					:matched="matchedWordIdSet.has(word.id)"
					:disabled="matchedWordIdSet.has(word.id)"
					@click="selectWord(word, 'en')"
				/>
			</div>

			<!-- Tagalog words -->
			<div class="space-y-4">
				<WordBlock
					v-for="word in shuffledTlWords"
					:key="`tl-${word.id}`"
					:text="word.tl"
					:selected="selectedTlWord?.id === word.id"
					:matched="matchedWordIdSet.has(word.id)"
					:disabled="matchedWordIdSet.has(word.id)"
					@click="selectWord(word, 'tl')"
				/>
			</div>
		</div>

		<AppButton
			v-if="!isCompleted"
			@click="nextSession"
			>Next</AppButton
		>
	</div>
</template>

<style scoped>
.container {
	min-height: 100vh;
}
</style>
