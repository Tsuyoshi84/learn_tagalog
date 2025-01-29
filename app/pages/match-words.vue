<script setup lang="ts">
import { shuffle } from '~/utils/shuffle'
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'

const queryParamsSchema = object({
	/** The level of quiz */
	level: pipe(
		string(),
		transform((value) => parseInt(value, 10)),
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
	() => words.value.length !== 0 && matchedWordIdSet.value.size === words.value.length,
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
	<div class="container mx-auto px-4 py-8">
		<h1 class="mb-8 text-2xl font-bold">Match the words</h1>

		<div v-if="isCompleted" class="mb-8 text-center">
			<p class="mb-4 text-xl">Great job! All words matched correctly!</p>
			<button
				type="button"
				class="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
				@click="nextSession"
			>
				Next Session
			</button>
		</div>

		<div class="mx-auto grid max-w-2xl grid-cols-2 gap-8">
			<!-- English words -->
			<div class="space-y-4">
				<button
					v-for="word in shuffledEnWords"
					:key="`en-${word.id}`"
					type="button"
					class="w-full cursor-pointer rounded-lg border-2 p-4 text-center transition-colors"
					:class="{
						'border-gray-200 hover:border-blue-500':
							!matchedWordIdSet.has(word.id) && selectedEnWord?.id !== word.id,
						'border-blue-500': selectedEnWord?.id === word.id,
						'border-green-500': matchedWordIdSet.has(word.id),
					}"
					:disabled="matchedWordIdSet.has(word.id)"
					@click="selectWord(word, 'en')"
				>
					{{ word.en }}
				</button>
			</div>

			<!-- Tagalog words -->
			<div class="space-y-4">
				<button
					v-for="word in shuffledTlWords"
					:key="`tl-${word.id}`"
					type="button"
					class="w-full cursor-pointer rounded-lg border-2 p-4 text-center transition-colors"
					:class="{
						'border-gray-200 hover:border-blue-500':
							!matchedWordIdSet.has(word.id) && selectedTlWord?.id !== word.id,
						'border-blue-500': selectedTlWord?.id === word.id,
						'border-green-500': matchedWordIdSet.has(word.id),
					}"
					:disabled="matchedWordIdSet.has(word.id)"
					@click="selectWord(word, 'tl')"
				>
					{{ word.tl }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	min-height: 100vh;
}
</style>
