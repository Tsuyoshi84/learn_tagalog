<script lang="ts" setup>
import { useTextQuiz } from '~/composables/useTextQuiz'

const { loading, text, fetchText, answer } = useTextQuiz()

onMounted(async () => {
	await fetchText()
})

/** Whether the answer is shown or not */
const showsAnswer = shallowRef(false)

async function answerText(textId: string, remembered: boolean): Promise<void> {
	await answer(textId, remembered)
	await fetchText()
	showsAnswer.value = false
}
</script>

<template>
	<div v-if="!loading && text !== undefined" class="flex flex-col items-center gap-4">
		<article class="flex flex-col gap-4">
			<p class="text-pretty text-center text-2xl">{{ text.en }}</p>
			<p
				class="text-pretty text-center text-2xl font-bold transition-all duration-300 ease-in-out"
				:class="{
					'cursor-pointer blur-sm md:blur-md lg:blur-lg': !showsAnswer,
					'cursor-default': showsAnswer,
				}"
				@click="showsAnswer = true"
			>
				{{ text.tl }}
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
					@click="answerText(text.id, false)"
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
					@click="answerText(text.id, true)"
				>
					<Icon size="4rem" name="fluent:emoji-smile-slight-24-filled" />
				</button>
			</div>
		</article>
	</div>
</template>
