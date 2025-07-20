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
			v-if="true"
			class="next-button"
			@click="nextSession"
			>Next</AppButton
		>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	box-sizing: border-box;
	max-inline-size: 45rem;
	min-block-size: 100vh;
	margin-inline: auto;
	padding-inline: 1rem;
	padding-block: 2rem;
	flex-direction: column;
	align-items: center;
}

.level-label {
	position: relative;
	margin-block-end: 2rem;
	font-size: 1.5rem;
	font-weight: 700;
	text-align: center;
	text-shadow: 0 2px 4px oklch(0.25 0.1 240 / 0.1);
	color: oklch(0.25 0.1 240);

	&::after {
		position: absolute;
		inset-inline-start: 50%;
		inset-block-end: -0.5rem;
		inline-size: 3rem;
		block-size: 3px;
		border-radius: 2px;
		background: linear-gradient(90deg, oklch(0.7 0.2 264), oklch(0.75 0.2 142));
		transform: translateX(-50%);
		content: '';
	}
}

.word-grid {
	display: grid;
	inline-size: 100%;
	max-inline-size: 45rem;
	margin-inline: auto;
	margin-block-end: 2rem;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem;
}

.word-list {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
}

.next-button {
	inline-size: 100%;
	margin-inline: auto;
	margin-block-start: 2rem;
}
</style>
