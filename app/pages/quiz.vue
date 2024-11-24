<script lang="ts" setup>
const { texts, loading, fetchTexts, answer } = useTextQuiz()

onMounted(async () => {
	await fetchTexts()
})

/** The index of the current text */
const index = shallowRef(0)
/** The text that the user is currently answering */
const currentText = computed(() => texts.value[index.value])
/** Whether the answer is shown or not */
const showsAnswer = shallowRef(false)
/** Whether the session is ended or not */
const isSessionEnded = shallowRef(false)

async function answerText(textId: string, remembered: boolean): Promise<void> {
	await answer(textId, remembered)

	if (index.value < texts.value.length - 1) {
		index.value++
		showsAnswer.value = false
	} else {
		isSessionEnded.value = true
	}
}

/** Start a new session */
async function startNewSession(): Promise<void> {
	await fetchTexts()
	index.value = 0
	showsAnswer.value = false
	isSessionEnded.value = false
}
</script>

<template>
	<div v-if="!loading && currentText !== undefined" class="flex flex-col items-center gap-4">
		<QuizProgress :quiz-texts="texts" />
		<article class="flex flex-col gap-4">
			<p class="text-pretty text-center text-2xl">{{ currentText.en }}</p>
			<p
				class="text-pretty text-center text-2xl font-bold transition-all duration-300 ease-in-out"
				:class="{
					'cursor-pointer blur-sm md:blur-md lg:blur-lg': !showsAnswer,
					'cursor-default': showsAnswer,
				}"
				@click="showsAnswer = true"
			>
				{{ currentText.tl }}
			</p>

			<div class="flex justify-center gap-4">
				<button
					v-show="!showsAnswer"
					aria-label="Show answer"
					class="grid place-items-center rounded-full text-red-400"
					type="button"
					@click="showsAnswer = true"
				>
					<Icon size="4rem" name="fluent:eye-24-filled" />
				</button>
				<button
					v-show="showsAnswer"
					aria-label="Forgot"
					type="button"
					class="grid place-items-center rounded-full"
					:class="{
						'cursor-pointer text-blue-400': showsAnswer,
						'text-blue-200': !showsAnswer,
					}"
					@click="answerText(currentText.id, false)"
				>
					<Icon size="4rem" name="fluent:emoji-sad-24-filled" />
				</button>

				<button
					v-show="showsAnswer"
					aria-label="Remembered"
					type="button"
					:class="{
						'cursor-pointer text-green-400': showsAnswer,
						'text-green-200': !showsAnswer,
					}"
					class="grid place-items-center rounded-full"
					@click="answerText(currentText.id, true)"
				>
					<Icon size="4rem" name="fluent:emoji-smile-slight-24-filled" />
				</button>
			</div>
		</article>
		<button
			v-if="isSessionEnded"
			type="button"
			class="text-pretty text-center text-2xl"
			@click="startNewSession"
		>
			Continue?
		</button>
	</div>
</template>
