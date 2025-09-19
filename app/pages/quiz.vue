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
	<div class="quiz-container">
		<!-- Level Label -->
		<div class="level-label">Level {{ parsedQueryParams.level }}</div>

		<!-- Completion Message -->
		<div
			v-if="hasQuiz === false"
			class="completion-section"
		>
			<div class="completion-card">
				<div class="celebration-icon">
					<svg
						class="icon"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
						/>
					</svg>
				</div>
				<h1 class="completion-title">All Done! 🎉</h1>
				<p class="completion-subtitle"
					>You answered all the quizzes for this level today. Keep up the great work!</p
				>
			</div>
		</div>

		<!-- Quiz Content -->
		<div
			v-if="text !== undefined"
			class="quiz-content"
		>
			<!-- Quiz Card -->
			<article class="quiz-card">
				<!-- Memory Level Indicator -->
				<div class="memory-level-section">
					<MemoryLevelMeter :memory-level="text.memoryLevel" />
				</div>

				<!-- Question Section -->
				<div class="question-section">
					{{ text.en }}
				</div>

				<!-- Answer Section -->
				<div class="answer-section">
					<button
						type="button"
						class="answer-reveal-btn"
						:class="{ 'answer-revealed': showsAnswer }"
						@click="showsAnswer = true"
					>
						<div
							v-if="!showsAnswer"
							class="reveal-content"
						>
							<svg
								class="eye-icon"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
								/>
							</svg>
							<span class="reveal-text">See the answer</span>
						</div>
						<div
							v-else
							class="answer-content"
						>
							<span class="answer-text">{{ text.tl }}</span>
						</div>
					</button>
				</div>

				<!-- Action Buttons -->
				<div class="action-buttons">
					<button
						type="button"
						class="action-btn action-btn--forgot"
						:class="{ 'action-btn--visible': showsAnswer }"
						@click="answerText(text.id, false)"
					>
						<svg
							class="action-icon"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
							/>
						</svg>
						<span class="action-label">Forgot</span>
					</button>

					<button
						class="action-btn action-btn--remembered"
						:class="{ 'action-btn--visible': showsAnswer }"
						type="button"
						@click="answerText(text.id, true)"
					>
						<svg
							class="action-icon"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
							/>
						</svg>
						<span class="action-label">Remembered</span>
					</button>
				</div>
			</article>
		</div>
	</div>
</template>

<style scoped>
/* Main Container - Centered Vertically */
.quiz-container {
	display: flex;
	box-sizing: border-box;
	max-inline-size: 45rem;
	min-block-size: 100vh;
	margin-inline: auto;
	padding-inline: 1rem;
	padding-block: 2rem;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, oklch(98% 0.02 120) 0%, oklch(96% 0.03 140) 100%);
}

/* Level Label */
.level-label {
	font-size: 0.875rem;
	font-weight: 600;
	color: oklch(60% 0.15 140);
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-block-end: 1rem;
	text-align: center;
}

/* Completion Section */
.completion-section {
	display: flex;
	justify-content: center;
	width: 100%;
}

.completion-card {
	background: linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(99% 0.01 120) 100%);
	border-radius: 1.5rem;
	padding: 2rem;
	box-shadow:
		0 10px 15px -3px oklch(0% 0 0 / 0.1),
		0 4px 6px -2px oklch(0% 0 0 / 0.05);
	text-align: center;
	max-inline-size: 24rem;
	position: relative;
	overflow: hidden;
}

.completion-card::before {
	content: '';
	position: absolute;
	inset: 0;
	background: linear-gradient(
		135deg,
		oklch(70% 0.15 140 / 0.05) 0%,
		oklch(60% 0.2 160 / 0.03) 100%
	);
	pointer-events: none;
}

.celebration-icon {
	inline-size: 3rem;
	block-size: 3rem;
	background: linear-gradient(135deg, oklch(60% 0.15 140) 0%, oklch(50% 0.2 160) 100%);
	border-radius: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-inline: auto;
	margin-block-end: 1rem;
	box-shadow: 0 4px 8px oklch(0% 0 0 / 0.1);
	position: relative;
	z-index: 1;
}

.celebration-icon .icon {
	inline-size: 1.5rem;
	block-size: 1.5rem;
	color: oklch(100% 0 0);
}

.completion-title {
	font-size: 1.5rem;
	font-weight: 700;
	color: oklch(20% 0.02 120);
	margin-block-end: 0.5rem;
	position: relative;
	z-index: 1;
}

.completion-subtitle {
	font-size: 0.875rem;
	color: oklch(45% 0.02 120);
	line-height: 1.5;
	position: relative;
	z-index: 1;
}

/* Quiz Content */
.quiz-content {
	inline-size: 100%;
	max-inline-size: 40rem;
	animation: fadeInUp 0.6s ease-out;
}

.quiz-card {
	background: linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(99% 0.01 120) 100%);
	border-radius: 1.5rem;
	padding: 2rem;
	box-shadow:
		0 10px 15px -3px oklch(0% 0 0 / 0.1),
		0 4px 6px -2px oklch(0% 0 0 / 0.05);
	position: relative;
	overflow: hidden;
}

.quiz-card::before {
	content: '';
	position: absolute;
	inset: 0;
	background: linear-gradient(
		135deg,
		oklch(70% 0.15 140 / 0.03) 0%,
		oklch(60% 0.2 160 / 0.02) 100%
	);
	pointer-events: none;
}

/* Memory Level Section */
.memory-level-section {
	display: flex;
	justify-content: center;
	margin-block-end: 1.5rem;
	position: relative;
	z-index: 1;
}

/* Question Section */
.question-section {
	text-align: center;
	margin-block-end: 2rem;
	position: relative;
	z-index: 1;
}

/* Answer Section */
.answer-section {
	margin-block-end: 2rem;
	position: relative;
	z-index: 1;
}

.answer-reveal-btn {
	inline-size: 100%;
	padding: 1.5rem;
	border: 2px dashed oklch(70% 0.15 140);
	border-radius: 1rem;
	background: linear-gradient(135deg, oklch(98% 0.05 140) 0%, oklch(96% 0.08 160) 100%);
	transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.answer-reveal-btn:hover {
	border-color: oklch(60% 0.15 140);
	background: linear-gradient(135deg, oklch(96% 0.08 140) 0%, oklch(94% 0.12 160) 100%);
	transform: translateY(-2px);
	box-shadow: 0 4px 12px oklch(60% 0.15 140 / 0.15);
}

.answer-reveal-btn.answer-revealed {
	border-color: oklch(50% 0.2 160);
	background: linear-gradient(135deg, oklch(96% 0.08 160) 0%, oklch(94% 0.12 180) 100%);
}

.reveal-content {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
}

.eye-icon {
	inline-size: 1.25rem;
	block-size: 1.25rem;
	color: oklch(60% 0.15 140);
}

.reveal-text {
	font-size: 1rem;
	font-weight: 600;
	color: oklch(60% 0.15 140);
}

.answer-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.answer-text {
	font-size: 1.25rem;
	font-weight: 700;
	color: oklch(25% 0.2 160);
	animation: fadeInUp 0.4s ease-out;
}

/* Action Buttons */
.action-buttons {
	display: flex;
	gap: 1rem;
	justify-content: center;
	position: relative;
	z-index: 1;
}

.action-btn {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 1rem 1.5rem;
	border: none;
	border-radius: 1rem;
	font-size: 0.875rem;
	font-weight: 600;
	transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	cursor: pointer;
	opacity: 0;
	transform: translateY(20px);
	pointer-events: none;
}

.action-btn--visible {
	opacity: 1;
	transform: translateY(0);
	pointer-events: auto;
	animation: slideInUp 0.4s ease-out;
}

.action-btn--forgot {
	background: linear-gradient(135deg, oklch(80% 0.15 30) 0%, oklch(70% 0.18 30) 100%);
	color: oklch(100% 0 0);
	box-shadow: 0 2px 8px oklch(80% 0.15 30 / 0.2);
}

.action-btn--forgot:hover {
	background: linear-gradient(135deg, oklch(75% 0.18 30) 0%, oklch(65% 0.2 30) 100%);
	transform: translateY(-2px);
	box-shadow: 0 4px 12px oklch(80% 0.15 30 / 0.3);
}

.action-btn--remembered {
	background: linear-gradient(135deg, oklch(60% 0.15 140) 0%, oklch(50% 0.2 160) 100%);
	color: oklch(100% 0 0);
	box-shadow: 0 2px 8px oklch(60% 0.15 140 / 0.2);
}

.action-btn--remembered:hover {
	background: linear-gradient(135deg, oklch(55% 0.18 140) 0%, oklch(45% 0.22 160) 100%);
	transform: translateY(-2px);
	box-shadow: 0 4px 12px oklch(60% 0.15 140 / 0.3);
}

.action-icon {
	inline-size: 1rem;
	block-size: 1rem;
}

.action-label {
	font-weight: 600;
}

/* Animations */
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.quiz-container {
		padding-inline: 0.75rem;
		padding-block: 1.5rem;
	}

	.level-label {
		font-size: 0.75rem;
		margin-block-end: 0.75rem;
	}

	.quiz-card {
		padding: 1.5rem;
	}

	.question-text {
		font-size: 1.25rem;
		padding: 1.25rem;
	}

	.answer-reveal-btn {
		padding: 1.25rem;
	}

	.answer-text {
		font-size: 1.125rem;
	}

	.action-buttons {
		flex-direction: column;
		gap: 0.75rem;
	}

	.action-btn {
		justify-content: center;
		padding: 0.875rem 1.25rem;
	}

	.completion-card {
		padding: 1.5rem;
	}

	.completion-title {
		font-size: 1.25rem;
	}
}

@media (min-width: 768px) {
	.quiz-container {
		padding-inline: 1.5rem;
	}

	.quiz-card {
		padding: 2.5rem;
	}

	.question-text {
		font-size: 1.75rem;
	}

	.answer-text {
		font-size: 1.5rem;
	}

	.completion-card {
		padding: 2.5rem;
	}
}
</style>
