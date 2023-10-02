<script lang="ts" setup>
import type { Text } from '~/database.types'

type FetchedText = Pick<Text, 'id' | 'en' | 'tl'>

defineProps<{
  text: FetchedText
}>()
</script>

<template>
  <div class="tl">
    {{ text.tl }}
  </div>
  <div class="en">
    {{ text.en }}
  </div>
</template>

<style scoped></style>
