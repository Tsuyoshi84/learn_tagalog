<script lang="ts" setup>
defineProps<{
	/** The memory level of the text */
	memoryLevel: number
}>()
</script>

<template>
  <div class="flex gap-4 w-full">
    <div
      v-for="i in 8"
      :key="i"
      class="h-4 rounded-full w-full"
      :class="{
        'bg-[oklch(var(--memory-level-color,var(--lightness)_var(--chroma)_var(--hue)))]':
          i <= memoryLevel,
        'border  bg-gray-100': i > memoryLevel,
      }"
      :style="{
        '--hue': `${240 - i * 10}deg`,
        '--lightness': `${50 + i}%`,
        '--chroma': `${0.15 + i * 0.05}`,
      }"
    ></div>
  </div>
</template>
