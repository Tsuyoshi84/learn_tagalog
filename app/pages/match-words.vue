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
			<AppButton
				class="next-button"
				@click="nextSession"
			>
				<span>Continue Learning</span>
			</AppButton>
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
	margin-block-end: 1rem;
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-align: center;
	text-transform: uppercase;
	color: oklch(60% 0.15 140);
}

/* Game Info */
.game-info {
	margin-block-end: 2rem;
	text-align: center;
}

.game-title {
	margin-block-end: 0.5rem;
	font-family:
		'SF Pro Display',
		-apple-system,
		system-ui,
		sans-serif;
	font-size: 1.75rem;
	font-weight: 700;
	color: oklch(20% 0.02 120);
}

.game-subtitle {
	font-size: 1rem;
	line-height: 1.5;
	color: oklch(45% 0.02 120);
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
	display: flex;
	padding-inline: 1rem;
	justify-content: center;
}

.next-button {
	position: relative;
	z-index: 1;
	inline-size: 100%;
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.container {
		padding-inline: 0.75rem;
		padding-block: 1.5rem;
	}

	.level-label {
		margin-block-end: 0.75rem;
		font-size: 0.75rem;
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
}

@media (min-width: 768px) {
	.container {
		padding-inline: 1.5rem;
	}
}
</style>
