<script setup lang="ts">
/**
 * A button component for displaying a word in the matching game
 */

defineProps<{
	/** The word text to display */
	text: string
	/** Whether the word is currently selected */
	selected: boolean
	/** Whether the word has been matched */
	matched: boolean
	/** Whether the button is disabled */
	disabled: boolean
}>()
</script>

<template>
	<button
		type="button"
		class="word-card"
		:class="{
			'word-card--default': !matched && !selected,
			'word-card--selected': selected,
			'word-card--matched': matched,
			'word-card--disabled': disabled,
		}"
		:disabled="disabled"
	>
		<div class="word-content">
			<span class="word-text">{{ text }}</span>
			<div
				v-if="matched"
				class="success-indicator"
			>
				<svg
					class="check-icon"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</div>
	</button>
</template>

<style scoped>
.word-card {
	position: relative;
	inline-size: 100%;
	block-size: 3.5rem;
	border: 2px solid oklch(90% 0.02 120);
	border-radius: 1rem;
	overflow: hidden;
	background: oklch(100% 0 0);
	box-shadow: 0 2px 4px oklch(0% 0 0 / 0.05);
	transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	cursor: pointer;
}

.word-card::before {
	position: absolute;
	inset: 0;
	opacity: 0;
	background: linear-gradient(
		135deg,
		oklch(70% 0.15 140 / 0.02) 0%,
		oklch(60% 0.2 160 / 0.01) 100%
	);
	transition: opacity 0.3s ease;
	pointer-events: none;
	content: '';
}

.word-card--default:hover {
	border-color: oklch(60% 0.15 140);
	background: linear-gradient(135deg, oklch(98% 0.05 140) 0%, oklch(96% 0.08 160) 100%);
	box-shadow: 0 4px 12px oklch(60% 0.15 140 / 0.15);
	transform: translateY(-2px);
}

.word-card--default:hover::before {
	opacity: 1;
}

.word-card--selected {
	border-color: oklch(60% 0.15 140);
	background: linear-gradient(135deg, oklch(95% 0.08 140) 0%, oklch(92% 0.12 160) 100%);
	box-shadow: 0 6px 16px oklch(60% 0.15 140 / 0.2);
	transform: translateY(-3px) scale(1.02);
	animation: word-card-pulse 2s infinite;
}

.word-card--selected::before {
	opacity: 1;
}

.word-card--matched {
	border-color: oklch(50% 0.2 160);
	background: linear-gradient(135deg, oklch(96% 0.08 160) 0%, oklch(94% 0.12 180) 100%);
	box-shadow: 0 4px 12px oklch(50% 0.2 160 / 0.2);
	transform: translateY(-1px) scale(1.01);
}

.word-card--matched::before {
	opacity: 1;
}

.word-card--disabled {
	border-color: oklch(85% 0.02 120);
	opacity: 0.5;
	background: oklch(95% 0.02 120);
	box-shadow: 0 1px 2px oklch(0% 0 0 / 0.05);
	transform: scale(0.98);
	cursor: not-allowed;
}

.word-content {
	position: relative;
	z-index: 1;
	display: flex;
	block-size: 100%;
	padding-inline: 1rem;
	align-items: center;
	justify-content: center;
}

.word-text {
	font-size: 1rem;
	font-weight: 600;
	color: oklch(20% 0.02 120);
	transition: color 0.3s ease;
}

.word-card--selected .word-text {
	color: oklch(30% 0.15 140);
}

.word-card--matched .word-text {
	color: oklch(25% 0.2 160);
}

.word-card--disabled .word-text {
	color: oklch(50% 0.02 120);
}

.success-indicator {
	display: flex;
	inline-size: 1.25rem;
	block-size: 1.25rem;
	border-radius: 50%;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, oklch(60% 0.15 140) 0%, oklch(50% 0.2 160) 100%);
	box-shadow: 0 2px 4px oklch(0% 0 0 / 0.1);
	animation: success-bounce 0.6s ease-out;
}

.check-icon {
	inline-size: 0.75rem;
	block-size: 0.75rem;
	color: oklch(100% 0 0);
}

@keyframes word-card-pulse {
	0%,
	100% {
		box-shadow: 0 6px 16px oklch(60% 0.15 140 / 0.2);
	}
	50% {
		box-shadow: 0 8px 20px oklch(60% 0.15 140 / 0.3);
	}
}

@keyframes success-bounce {
	0% {
		opacity: 0;
		transform: scale(0);
	}
	50% {
		opacity: 1;
		transform: scale(1.2);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.word-card {
		block-size: 3rem;
	}

	.word-text {
		font-size: 0.875rem;
	}

	.success-indicator {
		inline-size: 1rem;
		block-size: 1rem;
	}

	.check-icon {
		inline-size: 0.625rem;
		block-size: 0.625rem;
	}
}
</style>
