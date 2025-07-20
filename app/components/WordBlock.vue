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
		class="word-button"
		:class="{
			default: !matched && !selected,
			selected: selected,
			matched: matched,
			disabled: disabled,
		}"
		:disabled="disabled"
	>
		<span
			class="text"
			:class="{
				default: !matched && !selected,
				selected: selected,
				matched: matched,
			}"
		>
			{{ text }}
		</span>
	</button>
</template>

<style scoped>
.word-button {
	position: relative;
	inline-size: 100%;
	padding: 1.25rem;
	border: 2px solid oklch(0.9 0.02 240);
	border-radius: 0.5rem;
	overflow: hidden;
	text-align: center;
	box-shadow:
		0 2px 8px oklch(0.9 0.02 240 / 0.1),
		0 1px 3px oklch(0.9 0.02 240 / 0.05);
	translate: 0 0;
	rotate: 0deg;
	scale: 1;
	transition: all 0.2s ease-out;

	&::before {
		position: absolute;
		inset: 0;
		opacity: 0;
		background: linear-gradient(135deg, oklch(1 0 0 / 0.1) 0%, oklch(1 0 0 / 0.05) 100%);
		transition: opacity 0.2s ease-out;
		content: '';
	}

	&.default:hover {
		border-color: oklch(0.7 0.2 264);
		background: linear-gradient(135deg, oklch(0.97 0.05 264) 0%, oklch(0.94 0.05 264) 100%);
		box-shadow:
			0 8px 25px oklch(0.7 0.2 264 / 0.2),
			0 4px 12px oklch(0.7 0.2 264 / 0.1);
		translate: 0 -2px;
		scale: 1.02;

		&::before {
			opacity: 1;
		}
	}

	&.selected {
		border-color: oklch(0.65 0.25 264);
		background: linear-gradient(135deg, oklch(0.95 0.08 264) 0%, oklch(0.92 0.08 264) 100%);
		box-shadow:
			0 8px 25px oklch(0.65 0.25 264 / 0.25),
			0 4px 12px oklch(0.65 0.25 264 / 0.15);
		translate: 0 -3px;
		scale: 1.03;
		animation: word-button-pulse 1.5s infinite;

		&::before {
			opacity: 1;
		}
	}

	&.matched {
		border-color: oklch(0.75 0.2 142);
		background: linear-gradient(135deg, oklch(0.96 0.06 142) 0%, oklch(0.93 0.06 142) 100%);
		box-shadow:
			0 6px 20px oklch(0.75 0.2 142 / 0.2),
			0 3px 10px oklch(0.75 0.2 142 / 0.1);
		translate: 0 -1px;
		scale: 1.01;

		&::before {
			opacity: 1;
		}
	}

	&.disabled {
		opacity: 0.6;
		box-shadow: 0 1px 3px oklch(0.9 0.02 240 / 0.1);
		translate: 0 0;
		scale: 0.98;
		cursor: not-allowed;
	}
}

@keyframes word-button-pulse {
	0% {
		box-shadow:
			0 8px 25px oklch(0.65 0.25 264 / 0.25),
			0 4px 12px oklch(0.65 0.25 264 / 0.15);
	}
	50% {
		box-shadow:
			0 12px 35px oklch(0.65 0.25 264 / 0.35),
			0 6px 18px oklch(0.65 0.25 264 / 0.2);
	}
	100% {
		box-shadow:
			0 8px 25px oklch(0.65 0.25 264 / 0.25),
			0 4px 12px oklch(0.65 0.25 264 / 0.15);
	}
}

.text {
	position: relative;
	z-index: 1;
	font-size: 1.25rem;
	font-weight: 600;

	&.default {
		color: oklch(0.3 0.05 240);
	}
	&.selected {
		color: oklch(0.35 0.15 264);
	}
	&.matched {
		color: oklch(0.38 0.15 142);
	}
}
</style>
