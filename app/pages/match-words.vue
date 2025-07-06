<script setup lang="ts">
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import AppButton from '~/components/AppButton.vue'
import WordBlock from '~/components/WordBlock.vue'
import { useMatchWords, type Word } from '~/composables/useMatchWords.ts'

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

const words = ref<Word[]>([])

const {
	matchedWordIdSet,
	isCompleted,
	shuffledEnWords,
	shuffledTlWords,
	selectedEnWord,
	selectedTlWord,
	selectWord,
} = useMatchWords(words)

/**
 * Fetch words from the API
 */
async function fetchWords(): Promise<void> {
	const response = await $fetch('/api/words', {
		query: { level: parsedQueryParams.value.level },
	})

	if (response === undefined) return

	words.value = response
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
	<div class="container">
		<p class="level-label">Level {{ parsedQueryParams.level }}</p>

		<div class="word-grid">
			<!-- English words -->
			<div class="word-list">
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
			<div class="word-list">
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
			v-if="isCompleted"
			@click="nextSession"
			>Next</AppButton
		>
	</div>
</template>

<style scoped>
.container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-block: 2rem;
	box-sizing: border-box;
}

.level-label {
	font-size: 1.125rem;
	margin-bottom: 1rem;
	text-align: center;
	color: oklch(60% 0 0 / 1); /* gray-600 equivalent */
}

.word-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5rem;
	max-inline-size: 40rem;
	margin-inline: auto;
	width: 100%;
}

.word-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
