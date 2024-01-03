<script lang="ts" setup>
const { loading, text, fetch, next } = useFlashCard()

useHead({
	title: 'Flash Cards',
})

await fetch()
const showAnswer = shallowRef(false)

function showNext(): void {
	showAnswer.value = false
	next()
}

const target = shallowRef<'tl' | 'en'>('tl')
function toggleTarget(): void {
	target.value = target.value === 'tl' ? 'en' : 'tl'
}
const currentTarget = computed<string>(() => (target.value === 'tl' ? 'Tagalog' : 'English'))
</script>

<template>
	<div v-show="!loading" class="flex h-[100dvh] flex-col items-center justify-center gap-4 p-4">
		<button type="button" class="rounded-lg bg-red-100 p-2 text-xl" @click="toggleTarget">{{
			currentTarget
		}}</button>
		<FlashCard v-model:show-answer="showAnswer" :en="text.en" :tl="text.tl" :target="target" />
		<button type="button" class="rounded-2xl bg-green-200 p-4 text-3xl" @click="showNext"
			>Next</button
		>
	</div>
</template>
