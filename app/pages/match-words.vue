<script setup lang="ts">
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import AppButton from '~/components/AppButton.vue'
import WordBlock from '~/components/WordBlock.vue'
import { useMatchWords } from '~/composables/useMatchWords.ts'

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

const {
	matchedWordIdSet,
	isCompleted,
	shuffledEnWords,
	shuffledTlWords,
	selectedEnWord,
	selectedTlWord,
	setWords,
	selectWord,
} = useMatchWords()

/**
 * Fetch words from the API
 */
async function fetchWords(): Promise<void> {
	const response = await $fetch('/api/words', {
		query: { level: parsedQueryParams.value.level },
	})

	if (response === undefined) return

	setWords(response)
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
			v-if="isCompleted"
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
