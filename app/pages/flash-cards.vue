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

const target = shallowRef<'tl' | 'en'>('tl')
function toggleTarget(): void {
	target.value = target.value === 'tl' ? 'en' : 'tl'
}
const currentTarget = computed<string>(() => (target.value === 'tl' ? 'En -> Tl' : 'Tl -> En'))

const canPlay = computed<boolean>(() => {
	return target.value === 'tl' ? showAnswer.value : true
})
</script>

<template>
	<div v-show="!loading" class="flex h-full flex-col items-center justify-center gap-4">
		<button type="button" class="rounded-lg bg-red-100 p-2 text-xl" @click="toggleTarget">{{
			currentTarget
		}}</button>
		<FlashCard v-model:show-answer="showAnswer" :en="text.en" :tl="text.tl" :target="target" />
		<FlashCardControl :tl="text.tl" :can-play="canPlay" @next="showNext" />
	</div>
</template>
