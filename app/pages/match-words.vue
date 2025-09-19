<script setup lang="ts">
import { integer, maxValue, minValue, object, pipe, string, transform } from 'valibot'
import AppButton from '~/components/AppButton.vue'
import WordBlock from '~/components/WordBlock.vue'
import { useMatchWords, type Word } from '~/composables/useMatchWords.ts'

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

const words = ref<Word[]>([])

const {
	matchedWordIdSet,
	isCompleted,
	shuffledEnWords,
	shuffledTlWords,
	selectedEnWord,
	selectedTlWord,
	selectWord,
} = useMatchWords(words)

/**
 * Fetch words from the API
 */
async function fetchWords(): Promise<void> {
	const response = await $fetch('/api/words', {
		query: { level: parsedQueryParams.value.level },
	})

	if (response === undefined) return

	words.value = response
}

/**
 * Start next session
 */
function nextSession(): void {
	fetchWords()
}

// Initial fetch
onMounted(async () => {
	await fetchWords()
})
</script>

<template>
	<div class="container">
		<!-- Level Label -->
		<div class="level-label">Level {{ parsedQueryParams.level }}</div>

		<!-- Game Title and Instructions -->
		<div class="game-info">
			<h1 class="game-title">Match Words</h1>
			<p class="game-subtitle">Tap the matching pairs</p>
		</div>

		<!-- Two Column Word Grid -->
		<div class="word-grid">
			<!-- English words column -->
			<div class="word-column">
				<WordBlock
					v-for="word in shuffledEnWords"
					:key="`en-${word.id}`"
					:text="word.en"
					:selected="selectedEnWord?.id === word.id"
					:matched="matchedWordIdSet.has(word.id)"
					:disabled="matchedWordIdSet.has(word.id)"
					@click="selectWord(word, 'en')"
				/>
			</div>

			<!-- Tagalog words column -->
			<div class="word-column">
				<WordBlock
					v-for="word in shuffledTlWords"
					:key="`tl-${word.id}`"
					:text="word.tl"
					:selected="selectedTlWord?.id === word.id"
					:matched="matchedWordIdSet.has(word.id)"
					:disabled="matchedWordIdSet.has(word.id)"
					@click="selectWord(word, 'tl')"
				/>
			</div>
		</div>

		<!-- Completion Section -->
		<section
			v-if="isCompleted"
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
				<h2 class="completion-title">Excellent Work! 🎉</h2>
				<p class="completion-subtitle"
					>You've successfully matched all the words. Ready for the next challenge?</p
				>
				<AppButton
					class="next-button"
					@click="nextSession"
				>
					<span>Continue Learning</span>
					<svg
						class="arrow-icon"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</AppButton>
			</div>
		</section>
	</div>
</template>

<style scoped>
/* Main Container - Centered Vertically */
.container {
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

/* Game Info */
.game-info {
	text-align: center;
	margin-block-end: 2rem;
}

.game-title {
	font-size: 1.75rem;
	font-weight: 700;
	color: oklch(20% 0.02 120);
	margin-block-end: 0.5rem;
	font-family:
		'SF Pro Display',
		-apple-system,
		system-ui,
		sans-serif;
}

.game-subtitle {
	font-size: 1rem;
	color: oklch(45% 0.02 120);
	line-height: 1.5;
}

/* Two Column Word Grid */
.word-grid {
	display: grid;
	inline-size: 100%;
	max-inline-size: 45rem;
	margin-inline: auto;
	margin-block-end: 2rem;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5rem;
}

.word-column {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

/* Completion Section */
.completion-section {
	padding-inline: 1rem;
	display: flex;
	justify-content: center;
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
	margin-block-end: 1.5rem;
	position: relative;
	z-index: 1;
}

.next-button {
	inline-size: 100%;
	position: relative;
	z-index: 1;
}

.arrow-icon {
	inline-size: 1rem;
	block-size: 1rem;
	margin-inline-start: 0.5rem;
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.container {
		padding-inline: 0.75rem;
		padding-block: 1.5rem;
	}

	.level-label {
		font-size: 0.75rem;
		margin-block-end: 0.75rem;
	}

	.game-title {
		font-size: 1.5rem;
	}

	.game-subtitle {
		font-size: 0.875rem;
	}

	.word-grid {
		gap: 1rem;
	}

	.word-column {
		gap: 0.5rem;
	}

	.completion-card {
		padding: 1.5rem;
	}

	.completion-title {
		font-size: 1.25rem;
	}
}

@media (min-width: 768px) {
	.container {
		padding-inline: 1.5rem;
	}

	.completion-card {
		padding: 2.5rem;
	}
}
</style>
