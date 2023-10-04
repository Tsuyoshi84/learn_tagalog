<script lang="ts" setup>
import type { Text } from '~/database.types'

type FetchedText = Pick<Text, 'id' | 'en' | 'tl'>

const { text, highLightWords = [] } = defineProps<{
  text: FetchedText
  highLightWords?: string[]
}>()

function highLight (word: string): string {
  const match = word.match(/^(.*?)([,.!?])?$/)
  const [, wordWithoutPunctuation = word, punctuation = ''] = match ?? []

  return `<span class="high-light">${wordWithoutPunctuation}</span>${punctuation}`
}

function sanitize (text: string): string {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function removePunctuation (word: string): string {
  return word.replace(/[,.!?]/g, '')
}

const styledText = computed<string>(() => {
  if (highLightWords.length === 0) { return sanitize(text.tl) }

  const words = sanitize(text.tl).split(' ')
  const highLightWordSet = new Set(highLightWords.map(word => word.toLowerCase()))

  return words.map(word => (highLightWordSet.has(removePunctuation(word).toLowerCase()) ? highLight(word) : word)).join(' ')
})
</script>

<template>
  <div class="container">
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
  font-family: 'Gabarito', cursive;
  color: oklch(0.53 0.16 276.05);
  font-size: 2rem;
  font-weight: 500;
  text-wrap: balance;
  text-align: center;
}

.en {
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-size: 1.5rem;
  color: oklch(0.63 0 0);
  text-wrap: balance;
  text-align: center;
}

:deep(.high-light) {
  font-weight: 700;
  color: oklch(0.58 0.21 24.34);
}
</style>
