<script lang="tsx" setup>
defineProps<{
	/** English text */
	en: string
	/** Tagalog text */
	tl: string
}>()

/** Whether or not the answer is showing */
const showAnswer = defineModel<boolean>('showAnswer', { required: true })
</script>

<template>
	<div class="card-container flex flex-col justify-evenly gap-4">
		<div class="text-pretty text-center text-xl md:text-3xl lg:text-4xl">
			{{ en }}
		</div>
		<button
			class="cursor-pointer text-xl transition-all duration-300 ease-in-out md:text-3xl lg:text-4xl"
			:class="{
				'cursor-pointer blur-sm md:blur-md lg:blur-lg': !showAnswer,
				'cursor-default': showAnswer,
			}"
			type="button"
			aria-label="Show answer"
			@click="showAnswer = true"
		>
			{{ tl }}
		</button>
	</div>
</template>
