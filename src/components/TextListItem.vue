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

<template lang="pug">
.flex.flex-col.items-center.justify-center.gap-4
	.font-main.text-primary.text-balance.text-center.text-4xl.font-medium(v-html='styledText')
	.text-accent.text-balance.text-center.font-sans.text-2xl.italic {{ text.en }}
</template>
