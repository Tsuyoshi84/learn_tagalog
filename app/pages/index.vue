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
		<div class="greeting-container">
			<h1 class="greeting-title"> Hey {{ userName }}! 👋 </h1>
			<p class="greeting-subtitle">Let's make learning Tagalog fun! 🎉</p>
		</div>

		<nav class="menu-nav">
			<ul class="menu-list">
				<li
					v-for="(item, index) in menuItems"
					:key="item.name"
					class="menu-item"
					:class="{ 'animation-delay-200': index === 1 }"
				>
					<button
						type="button"
						class="menu-button"
						:class="item.gradient"
						@click.prevent="handleQuizClick(item.pageName, item.maxLevel)"
					>
						<span class="menu-icon">{{ item.icon }}</span>
						<span class="menu-title">
							{{ item.name }}
						</span>
						<span class="menu-description">{{ item.description }}</span>
					</button>
				</li>
			</ul>
		</nav>

		<LevelSelectorModal
			:open="showLevelSelector"
			:max-level="maxLevel"
			@close="showLevelSelector = false"
			@select="handleLevelSelect"
		/>
	</div>
</template>

<style scoped>
.main-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-block-size: calc(100vh - 4rem);
	padding-block: 2rem;
}
.greeting-container {
	margin-block-end: 3rem;
	text-align: center;
}
.greeting-title {
	font-size: 2.25rem;
	font-weight: bold;
	color: oklch(54.5% 0.2 276);
	animation: fadeIn 0.8s ease-out;
}
.greeting-subtitle {
	font-size: 1.25rem;
	color: oklch(80% 0.05 270 / 1);
	animation: fadeIn 0.8s ease-out 0.2s both;
}
.menu-nav {
	inline-size: 100%;
	max-inline-size: 40rem;
}
.menu-list {
	display: grid;
	gap: 1.5rem;
	padding-inline: 1rem;
	grid-template-columns: 1fr;
}
@media (min-width: 640px) {
	.menu-list {
		grid-template-columns: 1fr 1fr;
	}
}
.menu-item {
	transition: transform 0.3s;
	animation: slideIn 0.8s ease-out both;
}
.menu-item:hover {
	transform: scale(1.05);
}
.animation-delay-200 {
	animation-delay: 0.2s;
}
.menu-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	inline-size: 100%;
	block-size: 100%;
	padding: 1.5rem;
	border-radius: 1rem;
	box-shadow: 0 4px 16px oklch(0% 0 0 / 0.15);
	transition: box-shadow 0.3s;
	border: none;
	cursor: pointer;
	background: var(--menu-gradient, oklch(60% 0.15 30));
	color: #fff;
}
.menu-button:hover {
	box-shadow: 0 8px 24px oklch(0% 0 0 / 0.18);
}
.menu-button.from-red-300 {
	--menu-gradient: linear-gradient(135deg, oklch(80% 0.18 30) 0%, oklch(60% 0.18 30) 100%);
}
.menu-button.to-red-500 {
	--menu-gradient: linear-gradient(135deg, oklch(80% 0.18 30) 0%, oklch(54% 0.22 30) 100%);
}
.menu-button.from-blue-300 {
	--menu-gradient: linear-gradient(135deg, oklch(80% 0.18 250) 0%, oklch(60% 0.18 250) 100%);
}
.menu-button.to-blue-500 {
	--menu-gradient: linear-gradient(135deg, oklch(80% 0.18 250) 0%, oklch(54% 0.22 250) 100%);
}
.menu-icon {
	margin-block-end: 0.5rem;
	font-size: 1.875rem;
}
.menu-title {
	font-size: 1.5rem;
	font-weight: bold;
	color: #fff;
	transition: transform 0.3s;
}
.menu-button:hover .menu-title {
	transform: scale(1.05);
}
.menu-description {
	margin-block-start: 0.5rem;
	font-size: 0.875rem;
	color: oklch(100% 0 0 / 0.9);
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
