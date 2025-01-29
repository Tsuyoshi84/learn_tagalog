<script setup lang="ts">
import { shuffle } from '~/utils/shuffle'

/**
 * Word type for the matching game
 */
type Word = {
	id: string
	en: string
	tl: string
	selected?: boolean
}

const level = shallowRef(1)
const words = shallowRef<Word[]>([])
const selectedEnWord = shallowRef<Word>()
const selectedTlWord = shallowRef<Word>()
const matchedPairs = shallowRef<Set<string>>(new Set())
const isCompleted = computed(() => matchedPairs.value.size === words.value.length)

const shuffledEnWords = shallowRef<Word[]>([])
const shuffledTlWords = shallowRef<Word[]>([])

/**
 * Fetch words from the API
 */
async function fetchWords(): Promise<void> {
	const response = await useFetch('/api/words', {
		query: { level: level.value },
	})

	if (response.data.value) {
		words.value = response.data.value
		shuffledEnWords.value = shuffle(words.value)
		shuffledTlWords.value = shuffle(words.value)
		matchedPairs.value = new Set()
	}
}

/**
 * Handle word selection
 */
function selectWord(word: Word, isEnglish: boolean): void {
	// Skip if word is already matched
	if (matchedPairs.value.has(word.id)) return

	if (isEnglish) {
		selectedEnWord.value = word
	} else {
		selectedTlWord.value = word
	}

	// Check if we have a pair selected
	if (selectedEnWord.value && selectedTlWord.value) {
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
		matchedPairs.value.add(selectedEnWord.value.id)
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
onMounted(() => {
	fetchWords()
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
							!matchedPairs.has(word.id) && selectedEnWord?.id !== word.id,
						'border-blue-500': selectedEnWord?.id === word.id,
						'border-green-500': matchedPairs.has(word.id),
					}"
					:disabled="matchedPairs.has(word.id)"
					@click="selectWord(word, true)"
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
							!matchedPairs.has(word.id) && selectedTlWord?.id !== word.id,
						'border-blue-500': selectedTlWord?.id === word.id,
						'border-green-500': matchedPairs.has(word.id),
					}"
					:disabled="matchedPairs.has(word.id)"
					@click="selectWord(word, false)"
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
