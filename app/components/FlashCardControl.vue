<script setup lang="ts">
const props = defineProps<{
	/** Tagalog text */
	tl: string
	/** Whether user can play the text or not */
	canPlay: boolean
	/** Whether user can go to the next text or not */
	canGoNext: boolean
}>()

defineEmits<{
	next: []
}>()

const playing = defineModel<boolean>('playing')

const { speak, stop, isPlaying } = useSpeechSynthesis(() => props.tl, {
	lang: 'fil-PH',
})

watch(
	() => props.tl,
	() => {
		stop()
	},
)

watch(isPlaying, () => {
	playing.value = isPlaying.value
})
</script>

<template>
	<div class="flex gap-8 rounded-full bg-blue-300 px-4 py-2 text-white">
		<button
			:aria-label="playing ? 'Stop' : 'Play'"
			type="button"
			:class="['grid h-12 w-12 place-items-center rounded-full', { 'text-blue-200': !canPlay }]"
			:disabled="!canPlay"
			@click="playing ? stop() : speak()"
		>
			<Icon size="3rem" :name="isPlaying ? 'carbon:stop-outline' : 'carbon:play-outline'" />
		</button>
		<button
			aria-label="Next"
			type="button"
			class="grid h-12 w-12 place-items-center rounded-full disabled:text-blue-200"
			:disabled="!canGoNext"
			@click="$emit('next')"
		>
			<Icon size="3rem" name="carbon:next-outline" />
		</button>
	</div>
</template>
