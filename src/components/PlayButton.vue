<script lang="ts" setup>
type Props = {
	/** Text to play */
	text: string
}
const props = defineProps<Props>()

const playing = defineModel<boolean>('playing')

const { speak, stop, isPlaying } = useSpeechSynthesis(() => props.text, {
	lang: 'fil-PH',
})

function toggle(): void {
	if (playing.value) {
		stop()
	} else {
		speak()
	}
}

watch(playing, () => {
	if (!playing.value) {
		stop()
	}
})

watch(isPlaying, () => {
	playing.value = isPlaying.value
})
</script>

<template>
	<div class="flex">
		<button
			:aria-label="playing ? 'Stop' : 'Play'"
			type="button"
			class="grid h-12 w-12 place-items-center rounded-full text-red-400"
			@click="toggle()"
		>
			<Icon size="2rem" :name="isPlaying ? 'carbon:stop-outline' : 'carbon:play-outline'" />
		</button>
		<button
			aria-label="Next"
			type="button"
			class="grid h-12 w-12 place-items-center rounded-full text-red-400"
			@click="toggle()"
		>
			<Icon size="2rem" name="carbon:next-outline" />
		</button>
	</div>
</template>
