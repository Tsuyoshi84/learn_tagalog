<script lang="ts" setup>
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import MemoryLevelMeter from '~/components/MemoryLevelMeter.vue'
import { useQueryParamsWithSchema } from '~/composables/useQueryParamsWithSchema.ts'
import { useTextQuiz } from '~/composables/useTextQuiz.ts'

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

const { text, answer, hasQuiz } = useTextQuiz(parsedQueryParams.value.level)

/** Whether the answer is shown or not */
const showsAnswer = shallowRef(false)

async function answerText(textId: string, remembered: boolean) {
	showsAnswer.value = false
	answer(textId, remembered)
}
</script>

<template>
	<div class="quiz-root">
		<p class="quiz-level"> Level {{ parsedQueryParams.level }} </p>

		<div v-if="hasQuiz === false">
			<p class="quiz-complete-message">
				You answered all the quizzes for this level today 🎉 Keep the good work!
			</p>
		</div>

		<div
			v-if="text !== undefined"
			class="quiz-content"
		>
			<article class="quiz-article">
				<div class="quiz-article-content">
					<MemoryLevelMeter :memory-level="text.memoryLevel" />
					<p class="quiz-question">
						{{ text.en }}
					</p>
					<div
						class="quiz-answer-group"
						@click="showsAnswer = true"
					>
						<p
							class="quiz-answer"
							:class="{
								'shows-answer': showsAnswer,
								'hides-answer': !showsAnswer,
							}"
						>
							{{ showsAnswer ? text.tl : 'See the answer' }}
						</p>
					</div>
				</div>

				<div class="quiz-actions">
					<button
						aria-label="Forgot"
						type="button"
						class="quiz-action-btn forgot"
						:class="{
							'shows-action': showsAnswer,
							'hides-action': !showsAnswer,
						}"
						@click="answerText(text.id, false)"
					>
						<Icon
							size="2.5rem"
							name="fluent:emoji-sad-24-filled"
						/>
					</button>

					<button
						aria-label="Remembered"
						type="button"
						class="quiz-action-btn remembered"
						:class="{
							'shows-action': showsAnswer,
							'hides-action': !showsAnswer,
							'delayed-action': showsAnswer,
						}"
						@click="answerText(text.id, true)"
					>
						<Icon
							size="2.5rem"
							name="fluent:emoji-smile-slight-24-filled"
						/>
					</button>
				</div>
			</article>
		</div>
	</div>
</template>

<style scoped>
.quiz-root {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-block-size: calc(100vh - 4rem);
	padding-block: 2rem 8rem;
	padding-inline: 1rem;
}

.quiz-level {
	margin-block-end: 1rem;
	text-align: center;
	font-size: 2rem;
	color: oklch(60% 0.02 270);
}

.quiz-complete-message {
	text-align: center;
	font-size: 1.25rem;
	color: oklch(60% 0.02 270);
}

.quiz-content {
	animation: fadeIn 0.8s ease-out;
	inline-size: 100%;
	max-inline-size: 48rem;
}

.quiz-article {
	border-radius: 1rem;
	border: 1px solid oklch(90% 0.02 270);
	background: oklch(100% 0 0);
	padding: 2rem;
	box-shadow: 0 2px 16px 0 oklch(80% 0.02 270 / 0.15);
}

.quiz-article-content {
	margin-block-end: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.quiz-question {
	text-align: center;
	font-size: 1.25rem;
	color: oklch(30% 0.02 270);
	word-break: break-word;
}

@media (min-width: 640px) {
	.quiz-question {
		font-size: 2rem;
	}
	.quiz-answer {
		font-size: 2rem;
	}
}
@media (min-width: 768px) {
	.quiz-question {
		font-size: 2.5rem;
	}
	.quiz-answer {
		font-size: 2.5rem;
	}
}

.quiz-answer-group {
	cursor: pointer;
	border-radius: 0.75rem;
	border: 2px dashed oklch(85% 0.1 270);
	padding: 1rem;
	transition: border-color 0.2s;
}
.quiz-answer-group:hover {
	border-color: oklch(70% 0.2 270);
}

.quiz-answer {
	border-radius: 0.75rem;
	padding: 1rem;
	text-align: center;
	font-weight: bold;
	font-size: 1.25rem;
	transition:
		background 0.2s,
		color 0.2s;
}

.shows-answer {
	animation: fadeIn 0.8s ease-out;
	background: oklch(97% 0.05 270);
	color: oklch(30% 0.02 270);
}
.hides-answer {
	color: oklch(80% 0.01 270);
}

.quiz-actions {
	display: flex;
	inline-size: 100%;
	justify-content: center;
	gap: 1.5rem;
	block-size: 4rem;
}

.quiz-action-btn {
	display: grid;
	place-items: center;
	inline-size: 4rem;
	block-size: 4rem;
	border-radius: 50%;
	color: oklch(100% 0 0);
	box-shadow: 0 2px 8px 0 oklch(80% 0.02 270 / 0.15);
	transition:
		transform 0.2s,
		box-shadow 0.2s;
	border: none;
	font: inherit;
	cursor: pointer;
}
.quiz-action-btn:active,
.quiz-action-btn:hover {
	transform: scale(1.05);
	box-shadow: 0 4px 16px 0 oklch(80% 0.02 270 / 0.25);
}

.quiz-action-btn.forgot {
	background: linear-gradient(135deg, oklch(80% 0.18 30), oklch(60% 0.18 30));
}
.quiz-action-btn.remembered {
	background: linear-gradient(135deg, oklch(80% 0.18 140), oklch(60% 0.18 140));
}

.shows-action {
	animation: slideIn 0.8s ease-out both;
	opacity: 1;
	pointer-events: auto;
}
.hides-action {
	opacity: 0;
	pointer-events: none;
}
.delayed-action {
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
