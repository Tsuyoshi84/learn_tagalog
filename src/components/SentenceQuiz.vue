<script lang="ts" setup>
import { Text } from '~/database.types'

const { text } = defineProps<{
	/** An object that includes English and Tagalog sentences that are used for quiz  */
	text: Text
}>()

const { english, words, selectedWords, selectWord, deselectWord } = useSentenceQuiz(text)
</script>

<template>
	<div>
		<div class="font-sans text-3xl italic"> {{ english }} </div>

		<div class="flex flex-wrap gap-2 px-2 py-2 text-4xl">
			<div
				v-for="word in selectedWords"
				:key="word.id"
				type="button"
				class="cursor-pointer rounded-xl bg-green-300 px-2 py-1 text-2xl"
				@click="deselectWord(word)"
			>
				{{ word.word }}
			</div>
		</div>

		<div class="flex flex-wrap gap-2 px-2 py-2 text-4xl">
			<div
				v-for="word in words"
				:key="word.id"
				type="button"
				class="cursor-pointer rounded-xl bg-blue-200 px-2 py-1 text-2xl"
				@click="selectWord(word)"
			>
				{{ word.word }}
			</div>
		</div>
	</div>
</template>
