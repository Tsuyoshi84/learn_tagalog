<script setup lang="ts">
/**
 * A button component for displaying a word in the matching game
 */

defineProps<{
	/** The word text to display */
	text: string
	/** Whether the word is currently selected */
	selected: boolean
	/** Whether the word has been matched */
	matched: boolean
	/** Whether the button is disabled */
	disabled: boolean
}>()

defineEmits<{
	/** Emitted when the word is clicked */
	click: []
}>()
</script>

<template>
	<button
		type="button"
		class="w-full transform cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-300"
		:class="{
			'border-gray-200 bg-white hover:scale-105 hover:border-blue-500 hover:shadow-md':
				!matched && !selected,
			'scale-105 animate-pulse border-blue-500 bg-blue-50 shadow-md': selected,
			'scale-100 border-green-500 bg-green-50 shadow-sm': matched,
			'cursor-not-allowed opacity-50': disabled,
		}"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<span
			class="font-medium"
			:class="{
				'text-gray-700': !matched && !selected,
				'text-blue-700': selected,
				'text-green-700': matched,
			}"
		>
			{{ text }}
		</span>
	</button>
</template>
