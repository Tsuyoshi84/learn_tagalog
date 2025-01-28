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

const buttonGradients = {
	forgot: 'from-red-300 to-red-500',
	remembered: 'from-green-300 to-green-500',
} as const

async function answerText(textId: string, remembered: boolean): Promise<void> {
	await loadText()
	showsAnswer.value = false

	answer(textId, remembered)
}
</script>

<template>
	<div class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8">
		<div v-if="text !== undefined" class="animate-fade-in w-full max-w-3xl">
			<article class="rounded-xl bg-white p-8 shadow-lg">
				<div class="mb-8 space-y-6">
					<p class="text-pretty text-center text-3xl text-gray-800">{{ text.en }}</p>
					<div
						class="group cursor-pointer rounded-lg border-2 border-dashed border-indigo-200 p-6 transition-all duration-300 hover:border-indigo-400"
						@click="showsAnswer = true"
					>
						<p
							class="text-pretty rounded-lg p-4 text-center text-3xl font-bold transition-all duration-300"
							:class="{
								'animate-fade-in bg-indigo-50 text-gray-800': showsAnswer,
								'text-gray-400': !showsAnswer,
							}"
						>
							{{ showsAnswer ? text.tl : 'Click to reveal the answer' }}
						</p>
					</div>
				</div>

				<div class="flex justify-center gap-6">
					<button
						v-show="showsAnswer"
						aria-label="Forgot"
						type="button"
						class="animate-slide-in grid h-16 w-16 transform place-items-center rounded-full bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
						:class="buttonGradients.forgot"
						@click="answerText(text.id, false)"
					>
						<Icon size="2.5rem" name="fluent:emoji-sad-24-filled" />
					</button>

					<button
						v-show="showsAnswer"
						aria-label="Remembered"
						type="button"
						class="animate-slide-in animation-delay-200 grid h-16 w-16 transform place-items-center rounded-full bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
						:class="buttonGradients.remembered"
						@click="answerText(text.id, true)"
					>
						<Icon size="2.5rem" name="fluent:emoji-smile-slight-24-filled" />
					</button>
				</div>
			</article>
		</div>
	</div>
</template>

<style scoped>
.animate-fade-in {
	animation: fadeIn 0.8s ease-out;
}

.animate-slide-in {
	animation: slideIn 0.8s ease-out both;
}

.animation-delay-200 {
	animation-delay: 0.2s;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(-20px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
