<script lang="ts" setup>
import type { Text } from '~/database.types'

type FetchedText = Pick<Text, 'id' | 'en' | 'tl'>

defineProps<{
  text: FetchedText
}>()
</script>

<template>
  <div class="container">
    <div class="tl">
      {{ text.tl }}
    </div>
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
  color: oklch(0.43 0 0);
  font-size: 2rem;
  font-weight: 700;
}

.en {
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-size: 1.5rem;
  color: oklch(0.63 0 0);
}
</style>
