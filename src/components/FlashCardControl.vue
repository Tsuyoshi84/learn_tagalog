<script setup lang="ts">
type Props = {
	/** Tagalog text */
	tl: string
	/** Whether user can play the text or not */
	canPlay: boolean
}
const props = defineProps<Props>()

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
			class="grid h-12 w-12 place-items-center rounded-full"
			:class="{ 'text-blue-200': !canPlay }"
			:disabled="!canPlay"
			@click="playing ? stop() : speak()"
		>
			<Icon size="3rem" :name="isPlaying ? 'carbon:stop-outline' : 'carbon:play-outline'" />
		</button>
		<button
			aria-label="Next"
			type="button"
			class="grid h-12 w-12 place-items-center rounded-full"
			@click="$emit('next')"
		>
			<Icon size="3rem" name="carbon:next-outline" />
		</button>
	</div>
</template>
