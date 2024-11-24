<script lang="ts" setup>
import type { QuizText } from '~/types/quiz'

const props = defineProps<{
	/** The current index of the quiz */
	quizTexts: QuizText[]
}>()

type QuizStatus = 'correct' | 'incorrect' | 'pending' | 'current'

/** The index of the current quiz text */
const currentIndex = computed<number>(() => {
	return props.quizTexts.findIndex(({ remembered }) => remembered === undefined)
})

function getQuizStatus(index: number): QuizStatus {
	const remembered = props.quizTexts[index]?.remembered
	if (remembered !== undefined) return remembered ? 'correct' : 'incorrect'
	if (index === currentIndex.value) return 'current'
	return 'pending'
}

function getLineClass(index: number): string {
	const currentStatus = getQuizStatus(index)
	const nextStatus = getQuizStatus(index + 1)

	if (currentStatus === 'pending' || currentStatus === 'current') return 'bg-transparent'
	return `bg-gradient-to-r ${currentStatus === 'correct' ? 'from-green-500' : 'from-gray-500'} ${
		nextStatus === 'correct' ? 'to-green-500' : 'to-gray-500'
	}`
}
</script>

<template>
	<div class="flex items-center justify-center">
		<template v-for="index in quizTexts.length" :key="`progress-${index}`">
			<div
				class="size-5 rounded-full border-2 transition-colors duration-300"
				:class="
					{
						pending: 'border-gray-200 bg-transparent',
						current: 'border-gray-400 bg-transparent',
						correct: 'border-green-500 bg-green-500',
						incorrect: 'border-gray-500 bg-gray-500',
					}[getQuizStatus(index - 1)]
				"
			/>
			<div
				v-if="index < quizTexts.length"
				class="h-0.5 w-8 transition-colors duration-300"
				:class="getLineClass(index - 1)"
			/>
		</template>
	</div>
</template>
