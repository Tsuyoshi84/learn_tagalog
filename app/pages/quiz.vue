<script lang="ts" setup>
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import { useQueryParamsWithSchema } from '~/composables/useQueryParamsWithSchema'
import { useTextQuiz } from '~/composables/useTextQuiz'

const queryParamsSchema = object({
	/** The level of quiz */
	level: pipe(
		string(),
		transform((value) => Number.parseInt(value, 10)),
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
		<p class="text-md mb-4 text-center text-gray-600">Level {{ parsedQueryParams.level }}</p>

		<div v-if="text !== undefined" class="animate-fade-in w-full max-w-3xl">
			<article class="rounded-xl bg-white p-8 shadow-lg">
				<div class="mb-8 space-y-6">
					<p class="text-pretty text-center text-xl text-gray-800 sm:text-2xl md:text-3xl">{{
						text.en
					}}</p>
					<div
						class="group cursor-pointer rounded-lg border-2 border-dashed border-indigo-200 p-4 transition-all duration-300 hover:border-indigo-400 sm:p-6"
						@click="showsAnswer = true"
					>
						<p
							class="text-pretty rounded-lg p-4 text-center text-xl font-bold transition-all duration-300 sm:text-2xl md:text-3xl"
							:class="{
								'animate-fade-in bg-indigo-50 text-gray-800': showsAnswer,
								'text-gray-400': !showsAnswer,
							}"
						>
							{{ showsAnswer ? text.tl : 'See the answer' }}
						</p>
					</div>
				</div>

				<div class="flex h-16 justify-center gap-6">
					<button
						aria-label="Forgot"
						type="button"
						class="grid h-16 w-16 transform place-items-center rounded-full bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
						:class="[
							buttonGradients.forgot,
							{
								'animate-slide-in opacity-100': showsAnswer,
								'pointer-events-none opacity-0': !showsAnswer,
							},
						]"
						@click="answerText(text.id, false)"
					>
						<Icon size="2.5rem" name="fluent:emoji-sad-24-filled" />
					</button>

					<button
						aria-label="Remembered"
						type="button"
						class="grid h-16 w-16 transform place-items-center rounded-full bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
						:class="[
							buttonGradients.remembered,
							{
								'animate-slide-in animation-delay-200 opacity-100': showsAnswer,
								'pointer-events-none opacity-0': !showsAnswer,
							},
						]"
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
