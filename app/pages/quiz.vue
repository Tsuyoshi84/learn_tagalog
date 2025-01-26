<script lang="ts" setup>
import { useTextQuiz } from '~/composables/useTextQuiz'
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import { useQueryParamsWithSchema } from '~/composables/useQueryParamsWithSchema'

const queryParamsSchema = object({
	/** The level of quiz */
	level: pipe(
		string(),
		transform((value) => parseInt(value, 10)),
		integer(),
		minValue(1),
		maxValue(5),
	),
})

const parsedQueryParams = useQueryParamsWithSchema(queryParamsSchema)

const { text, loadText, answer } = useTextQuiz(parsedQueryParams.value.level)

onMounted(async () => {
	await loadText()
})

/** Whether the answer is shown or not */
const showsAnswer = shallowRef(false)

async function answerText(textId: string, remembered: boolean): Promise<void> {
	answer(textId, remembered)
	await loadText()
	showsAnswer.value = false
}
</script>

<template>
	<div v-if="text !== undefined" class="flex flex-col items-center gap-4">
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
