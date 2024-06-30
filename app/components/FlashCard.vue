<script lang="tsx" setup>
const props = defineProps<{
	/** English text */
	en: string
	/** Tagalog text */
	tl: string
	/** Target language */
	target: 'en' | 'tl'
}>()

/** Whether or not the answer is showing */
const showAnswer = defineModel<boolean>('showAnswer', { required: true })

const originalText = computed<string>(() => (props.target === 'en' ? props.tl : props.en))
const translatedText = computed<string>(() => props[props.target])
</script>

<template>
	<div class="card-container flex flex-col justify-evenly gap-4">
		<div class="text-pretty text-xl md:text-3xl lg:text-4xl">
			{{ originalText }}
		</div>
		<button
			class="cursor-pointer text-xl transition-all duration-300 ease-in-out md:text-3xl lg:text-4xl"
			:class="{ 'cursor-pointer blur-sm md:blur-md lg:blur-lg': !showAnswer }"
			type="button"
			aria-label="Show answer"
			@click="showAnswer = true"
		>
			{{ translatedText }}
		</button>
	</div>
</template>
