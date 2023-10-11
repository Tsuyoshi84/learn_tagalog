<script lang="ts" setup>
import type { Text } from '~/database.types'

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

	return `<span class="high-light">${wordWithoutPunctuation}</span>${punctuation}`
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
	<div class="container">
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div class="tl" v-html="styledText" />
		<div class="en">
			{{ text.en }}
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}

.tl {
	font-family: var(--font-family-main);
	color: var(--font-color-accent);
	font-size: 2rem;
	font-weight: 500;
	text-wrap: balance;
	text-align: center;
}

.en {
	font-family: var(--font-family-sub);
	font-style: italic;
	font-size: 1.5rem;
	color: var(--font-color-subtle);
	text-wrap: balance;
	text-align: center;
}

:deep(.high-light) {
	font-weight: 700;
	color: var(--font-color-accent-sub);
}
</style>
