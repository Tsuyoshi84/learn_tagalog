<script lang="ts" setup>
import type { Text } from '~/database.types.ts'

type FetchedText = Pick<Text, 'id' | 'en' | 'tl'>

const { text, highLightWords = [] } = defineProps<{
	/** Fetched text */
	text: FetchedText
	/** Words should be high-lighted */
	highLightWords?: string[]
}>()

function highLight(word: string): string {
	const match = word.match(/^(.*?)([,.!?])?$/)
	const [, wordWithoutPunctuation = word, punctuation = ''] = match ?? []

	return `<span class="font-bold text-accent-2">${wordWithoutPunctuation}</span>${punctuation}`
}

function sanitize(text: string): string {
	return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function removePunctuation(word: string): string {
	return word.replace(/[,.!?]/g, '')
}

const styledText = computed<string>(() => {
	if (highLightWords.length === 0) {
		return sanitize(text.tl)
	}

	const words = sanitize(text.tl).split(' ')
	const highLightWordSet = new Set(highLightWords.map((word) => word.toLowerCase()))

	return words
		.map((word) =>
			highLightWordSet.has(removePunctuation(word).toLowerCase()) ? highLight(word) : word,
		)
		.join(' ')
})
</script>

<template>
	<div class="text-list-item-root">
		<div
			class="text-list-item-tl"
			v-html="styledText"
		/>
		<div class="text-list-item-en">{{ text.en }}</div>
	</div>
</template>

<style scoped>
.text-list-item-root {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
}
.text-list-item-tl {
	font-family: var(--font-main, sans-serif);
	color: var(--color-primary, #222);
	text-align: center;
	font-size: 2.5rem;
	font-weight: 500;
	line-height: 1.2;
	text-wrap: balance;
}
.text-list-item-en {
	color: var(--color-accent, #888);
	text-align: center;
	font-family: var(--font-sans, sans-serif);
	font-size: 1.5rem;
	font-style: italic;
	line-height: 1.2;
	text-wrap: balance;
}
.font-bold {
	font-weight: bold;
}
.text-accent-2 {
	color: var(--color-accent-2, #e57373);
}
</style>
