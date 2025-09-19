<script lang="ts" setup>
import LevelSelectorModal from '~/components/LevelSelectorModal.vue'
import { useAuthStore } from '~/stores/auth.ts'

const authStore = useAuthStore()
const { userName } = storeToRefs(authStore)

/** The maximum level of the quiz */
const maxLevel = shallowRef(3)

/** Whether the level selector modal is shown */
const showLevelSelector = shallowRef(false)

type PageName = 'quiz' | 'match-words'

let pageNameToNavigate: undefined | PageName

/** Handle the quiz click event */
function handleQuizClick(pageName: PageName, maxLevelValue: number): void {
	maxLevel.value = maxLevelValue
	pageNameToNavigate = pageName
	showLevelSelector.value = true
}

/** Handle the level select event */
async function handleLevelSelect(level: number): Promise<void> {
	if (pageNameToNavigate === undefined) return

	await navigateTo({
		name: pageNameToNavigate,
		query: { level: level.toString() },
	})
}

interface MenuItem {
	name: string
	icon: string
	description: string
	gradient: string
	pageName: 'quiz' | 'match-words'
	type: 'button'
	maxLevel: number
}

const menuItems = [
	{
		type: 'button',
		name: 'Translation challenge',
		icon: '✨',
		description: 'Try translating texts',
		gradient: 'from-red-300 to-red-500',
		pageName: 'quiz',
		maxLevel: 3,
	},
	{
		type: 'button',
		name: 'Match words',
		icon: '🎴',
		description: 'Practice with interactive cards',
		gradient: 'from-blue-300 to-blue-500',
		pageName: 'match-words',
		maxLevel: 5,
	},
] as const satisfies MenuItem[]
</script>

<template>
	<div class="main-container">
		<!-- Learning Activities Section -->
		<section class="activities-section">
			<div class="section-header">
				<h1 class="section-title">Hey {{ userName }}! 👋</h1>
				<p class="section-subtitle">Choose your learning activity to get started</p>
			</div>

			<div class="activities-grid">
				<article
					v-for="(item, index) in menuItems"
					:key="item.name"
					class="activity-card"
					:class="{ 'animation-delay-200': index === 1 }"
					@click="handleQuizClick(item.pageName, item.maxLevel)"
				>
					<div class="card-content">
						<h2 class="card-title">{{ item.name }}</h2>
						<p class="card-description">{{ item.description }}</p>
					</div>

					<div class="card-action">
						<button
							type="button"
							class="action-button"
						>
							<span>Start Learning</span>
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
						</button>
					</div>
				</article>
			</div>
		</section>

		<LevelSelectorModal
			:open="showLevelSelector"
			:max-level="maxLevel"
			@close="showLevelSelector = false"
			@select="handleLevelSelect"
		/>
	</div>
</template>

<style scoped>
/* Main Layout */
.main-container {
	min-block-size: 100vh;
	background: linear-gradient(135deg, oklch(98% 0.02 120) 0%, oklch(96% 0.03 140) 100%);
	padding-block: 1rem;
	padding-inline: 0.5rem;
}

/* Activities Section */
.activities-section {
	padding-inline: 0.5rem;
	padding-block-start: 2rem;
}

.section-header {
	text-align: center;
	margin-block-end: 1.5rem;
	animation: fadeInUp 0.8s ease-out 0.2s both;
}

.section-title {
	font-size: 1.875rem;
	font-weight: 700;
	color: oklch(20% 0.02 120);
	margin-block-end: 0.5rem;
}

.section-subtitle {
	font-size: 1rem;
	color: oklch(45% 0.02 120);
	max-inline-size: 40rem;
	margin-inline: auto;
}

.activities-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;
	max-inline-size: 80rem;
	margin-inline: auto;
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.hero-title {
		font-size: 2rem;
	}

	.hero-subtitle {
		font-size: 1rem;
	}

	.section-title {
		font-size: 1.5rem;
	}

	.section-subtitle {
		font-size: 0.875rem;
	}

	.progress-ring {
		inline-size: 3.5rem;
		block-size: 3.5rem;
	}

	.progress-number {
		font-size: 1rem;
	}

	.progress-label {
		font-size: 0.625rem;
	}
}

@media (min-width: 640px) {
	.activities-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
}

/* Activity Cards */
.activity-card {
	background: oklch(100% 0 0);
	border-radius: 1rem;
	padding: 1.25rem;
	box-shadow:
		0 4px 6px -1px oklch(0% 0 0 / 0.1),
		0 2px 4px -1px oklch(0% 0 0 / 0.06);
	transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	cursor: pointer;
	position: relative;
	overflow: hidden;
	animation: slideInUp 0.8s ease-out both;
}

.activity-card:hover {
	transform: translateY(-4px);
	box-shadow:
		0 10px 15px -3px oklch(0% 0 0 / 0.1),
		0 4px 6px -2px oklch(0% 0 0 / 0.05);
}

.activity-card:active {
	transform: translateY(-2px) scale(0.98);
}

.animation-delay-200 {
	animation-delay: 0.2s;
}

.card-content {
	margin-block-end: 1rem;
}

.card-title {
	font-size: 1.25rem;
	font-weight: 700;
	color: oklch(20% 0.02 120);
	margin-block-end: 0.5rem;
}

.card-description {
	font-size: 0.875rem;
	color: oklch(45% 0.02 120);
	line-height: 1.5;
}

.card-action {
	display: flex;
	justify-content: flex-end;
}

.action-button {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background: linear-gradient(135deg, oklch(60% 0.15 140) 0%, oklch(50% 0.2 160) 100%);
	color: oklch(100% 0 0);
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 0.75rem;
	font-size: 0.875rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease-out;
	box-shadow: 0 2px 4px oklch(0% 0 0 / 0.1);
}

.action-button:hover {
	transform: translateY(-1px);
	box-shadow: 0 4px 8px oklch(0% 0 0 / 0.15);
}

.action-button:active {
	transform: translateY(0);
	box-shadow: 0 1px 2px oklch(0% 0 0 / 0.1);
}

.arrow-icon {
	inline-size: 1rem;
	block-size: 1rem;
	transition: transform 0.2s ease-out;
}

.action-button:hover .arrow-icon {
	transform: translateX(2px);
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
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
