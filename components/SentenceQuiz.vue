<script lang="ts" setup>
import { Text } from '~/database.types'

const { text } = defineProps<{
	/** An object that includes English and Tagalog sentences that are used for quiz  */
	text: Text
}>()

const { english, words, selectedWords, selectWord, deselectWord } = useSentenceQuiz(text)
</script>

<template>
	<div class="container">
		<div class="english-sentence"> {{ english }} </div>

		<div class="word-container selected">
			<div
				v-for="word in selectedWords"
				:key="word.id"
				type="button"
				class="word selected"
				@click="deselectWord(word)"
			>
				{{ word.word }}
			</div>
		</div>

		<div class="word-container">
			<div
				v-for="word in words"
				:key="word.id"
				type="button"
				class="word"
				@click="selectWord(word)"
			>
				{{ word.word }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
}

.word-container {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	font-size: 2rem;
	padding: 0.4rem 0.5rem;
}

.word {
	padding: 0.4rem 0.5rem;
	border: 1px solid var(--color-primary);
	border-radius: 1rem;
	cursor: pointer;
	user-select: none;
	line-height: 100%;

	&:not(.selected) {
		background-color: var(--bg-color-accent-sub);
	}

	&.selected {
		background-color: var(--bg-color-accent);
		color: var(--color-primary-text);
	}
}

.english-sentence {
	font-family: var(--font-family-sub);
	font-size: 2rem;
	font-style: italic;
}
</style>
