<script lang="ts" setup>
useHead({
	title: 'Flash Cards',
})

const { loading, text, next } = useFlashCard()
const showAnswer = shallowRef(false)

function showNext(): void {
	showAnswer.value = false
	next()
}
</script>

<template>
	<div v-show="!loading" class="flex h-full flex-col items-center justify-center gap-4">
		<FlashCard v-model:show-answer="showAnswer" :en="text.en" :tl="text.tl" />
		<FlashCardControl
			:tl="text.tl"
			:can-play="showAnswer"
			:can-go-next="showAnswer"
			@next="showNext"
		/>
	</div>
</template>
