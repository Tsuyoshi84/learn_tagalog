<script lang="ts" setup>
/**
 * A modal component for selecting quiz difficulty levels.
 * Displays a grid of level cards with descriptions and handles level selection.
 *
 * @example
 * ```vue
 * <LevelSelectorModal
 *   :open="isOpen"
 *   :max-level="5"
 *   :selected-level="currentLevel"
 *   @select="handleLevelSelect"
 *   @close="closeModal"
 * />
 * ```
 */

import BaseModal from '~/components/BaseModal.vue'

const props = defineProps<{
	/** Controls whether the level selector modal is shown or hidden */
	open: boolean
	/** The maximum level of the quiz */
	maxLevel: number
	/** The currently selected level (optional) */
	selectedLevel?: number
}>()

const emit = defineEmits<{
	/** Emitted when the modal should be closed */
	close: []
	/**
	 * Emitted when a level is selected
	 * @param level - The selected quiz level (1-5)
	 */
	select: [level: number]
}>()

const LEVEL_DESCRIPTIONS = {
	1: 'Beginner - Basic words and phrases',
	2: 'Elementary - Simple sentences',
	3: 'Intermediate - Common conversations',
	4: 'Advanced - Complex expressions',
	5: 'Expert - Native-level content',
} as const

const levels = computed<readonly number[]>(() => {
	return Array.from({ length: props.maxLevel }, (_, index) => index + 1)
})

function getLevelDescription(level: number): string {
	return LEVEL_DESCRIPTIONS[level as keyof typeof LEVEL_DESCRIPTIONS] || 'Custom level'
}

function handleLevelSelect(level: number): void {
	emit('select', level)
	emit('close')
}
</script>

<template>
	<BaseModal
		:open="open"
		@close="emit('close')"
	>
		<div class="modal-container">
			<div class="modal-header">
				<div class="header-icon">
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
				<h2 class="modal-title">Choose Your Difficulty</h2>
				<p class="modal-subtitle">Select the level that matches your current Tagalog skills</p>
			</div>

			<div class="levels-grid">
				<button
					v-for="level in levels"
					:key="level"
					type="button"
					class="level-card"
					:class="{ 'level-card--active': level === selectedLevel }"
					:aria-label="`Select level ${level}: ${getLevelDescription(level)}`"
					:aria-pressed="level === selectedLevel"
					@click="handleLevelSelect(level)"
				>
					<div class="level-content">
						<div class="level-info">
							<span class="level-label">Level {{ level }}</span>
							<span
								class="level-description"
								:aria-describedby="`level-${level}-description`"
								>{{ getLevelDescription(level) }}</span
							>
						</div>
					</div>
				</button>
			</div>

			<div class="modal-footer">
				<button
					type="button"
					class="cancel-btn"
					aria-label="Cancel level selection"
					@click="emit('close')"
				>
					Cancel
				</button>
			</div>
		</div>
	</BaseModal>
</template>

<style scoped>
.modal-container {
	position: relative;
	min-inline-size: 20rem;
	max-inline-size: 28rem;
	padding: 2rem;
	border-radius: 1.5rem;
	overflow: hidden;
	background: linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(99% 0.01 120) 100%);
	box-shadow:
		0 20px 25px -5px oklch(0% 0 0 / 0.1),
		0 10px 10px -5px oklch(0% 0 0 / 0.04);
}

.modal-container::before {
	position: absolute;
	inset: 0;
	background: linear-gradient(
		135deg,
		oklch(70% 0.15 140 / 0.03) 0%,
		oklch(60% 0.2 160 / 0.02) 100%
	);
	pointer-events: none;
	content: '';
}

.modal-header {
	position: relative;
	z-index: 1;
	margin-block-end: 2rem;
	text-align: center;
}

.header-icon {
	display: flex;
	inline-size: 3rem;
	block-size: 3rem;
	margin-inline: auto;
	margin-block-end: 1rem;
	border-radius: 1rem;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, oklch(60% 0.15 140) 0%, oklch(50% 0.2 160) 100%);
	box-shadow: 0 4px 8px oklch(0% 0 0 / 0.1);
}

.icon {
	inline-size: 1.5rem;
	block-size: 1.5rem;
	color: oklch(100% 0 0);
}

.modal-title {
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

.modal-subtitle {
	font-size: 0.875rem;
	line-height: 1.5;
	color: oklch(45% 0.02 120);
}

.levels-grid {
	position: relative;
	z-index: 1;
	display: grid;
	margin-block-end: 2rem;
	grid-template-columns: 1fr;
	gap: 0.75rem;
}

.level-card {
	position: relative;
	padding: 1rem;
	border: 2px solid oklch(90% 0.02 120);
	border-radius: 1rem;
	overflow: hidden;
	background: oklch(100% 0 0);
	transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	cursor: pointer;
}

.level-card:hover {
	border-color: oklch(60% 0.15 140);
	box-shadow: 0 8px 16px oklch(0% 0 0 / 0.1);
	transform: translateY(-2px);
}

.level-card--active {
	border-color: oklch(60% 0.15 140);
	background: linear-gradient(135deg, oklch(98% 0.05 140) 0%, oklch(96% 0.08 160) 100%);
	box-shadow: 0 4px 12px oklch(60% 0.15 140 / 0.2);
}

.level-card:active {
	transform: translateY(0) scale(0.98);
}

.level-content {
	display: block;
}

.level-info {
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 0.25rem;
}

.level-label {
	font-size: 1rem;
	font-weight: 600;
	color: oklch(20% 0.02 120);
}

.level-description {
	font-size: 0.75rem;
	line-height: 1.4;
	color: oklch(50% 0.02 120);
}

.modal-footer {
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: center;
}

.cancel-btn {
	padding-inline: 1.5rem;
	padding-block: 0.75rem;
	border: none;
	border-radius: 0.75rem;
	font-size: 0.875rem;
	font-weight: 500;
	color: oklch(45% 0.02 120);
	background: oklch(90% 0.02 120);
	transition: all 0.2s ease;
	cursor: pointer;
}

.cancel-btn:hover {
	color: oklch(30% 0.02 120);
	background: oklch(85% 0.02 120);
}

.cancel-btn:active {
	transform: scale(0.98);
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.modal-container {
		min-inline-size: 18rem;
		max-inline-size: 22rem;
		padding: 1.5rem;
	}

	.modal-title {
		font-size: 1.5rem;
	}

	.modal-subtitle {
		font-size: 0.8125rem;
	}

	.level-card {
		padding: 0.875rem;
	}

	.level-label {
		font-size: 0.875rem;
	}

	.level-description {
		font-size: 0.6875rem;
	}
}

@media (min-width: 768px) {
	.modal-container {
		min-inline-size: 24rem;
		max-inline-size: 32rem;
		padding: 2.5rem;
	}

	.levels-grid {
		gap: 1rem;
	}

	.level-card {
		padding: 1.25rem;
	}
}
</style>
