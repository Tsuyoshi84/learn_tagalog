<script lang="ts" setup>
import { Text } from '~/database.types'

const { text } = defineProps<{
	/** An object that includes English and Tagalog sentences that are used for quiz  */
	text: Text
}>()

const { english, words, selectedWords, status, selectWord, deselectWord } = useSentenceQuiz(text)
</script>

<template>
	<div> {{ status }} </div>
	<div> {{ english }} </div>

	<div class="word-container">
		<button
			v-for="word in selectedWords"
			:key="word.id"
			type="button"
			class="word"
			@click="deselectWord(word)"
		>
			{{ word.word }}
		</button>
	</div>

	<div class="word-container">
		<button
			v-for="word in words"
			:key="word.id"
			type="button"
			class="word"
			@click="selectWord(word)"
		>
			{{ word.word }}
		</button>
	</div>
</template>

<style scoped></style>
