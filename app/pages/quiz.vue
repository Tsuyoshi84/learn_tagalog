<script lang="ts" setup>
const { texts, loading, fetchTexts, answer } = useTextQuiz()

const index = shallowRef(0)

onMounted(async () => {
	await fetchTexts()
})

const currentText = computed(() => texts.value[index.value])

async function answerText(textId: string, remembered: boolean): Promise<void> {
	await answer(textId, remembered)
	index.value++
}
</script>

<template>
	<div v-if="!loading && currentText !== undefined">
		<p>{{ currentText.en }}</p>
		<p>{{ currentText.tl }}</p>

		<button type="button" @click="answerText(currentText.id, true)">Remembered</button>
		<button type="button" @click="answerText(currentText.id, false)">Forgot</button>
	</div>
</template>
