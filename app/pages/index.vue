<script lang="ts" setup>
import LevelSelectorModal from '~/components/LevelSelectorModal.vue'
import { useAuthStore } from '~/stores/auth'

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

type MenuItem = {
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
	<div class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-8">
		<div class="mb-12 space-y-2 text-center">
			<h1 class="animate-fade-in text-4xl font-bold text-indigo-600 md:text-5xl">
				Hey {{ userName }}! 👋
			</h1>
			<p class="animate-fade-in-delay text-xl text-gray-600">Let's make learning Tagalog fun! 🎉</p>
		</div>

		<nav class="w-full max-w-2xl">
			<ul class="grid gap-6 px-4 sm:grid-cols-2">
				<li
					v-for="(item, index) in menuItems"
					:key="item.name"
					class="transform transition-all duration-300 hover:scale-105"
					:class="{ 'animate-slide-in': true, 'animation-delay-200': index === 1 }"
				>
					<button
						type="button"
						class="group flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
						:class="item.gradient"
						@click.prevent="handleQuizClick(item.pageName, item.maxLevel)"
					>
						<span class="mb-2 text-3xl">{{ item.icon }}</span>
						<span
							class="text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-105"
						>
							{{ item.name }}
						</span>
						<span class="mt-2 text-sm text-white/90">{{ item.description }}</span>
					</button>
				</li>
			</ul>
		</nav>

		<LevelSelectorModal
			:is-open="showLevelSelector"
			:max-level="maxLevel"
			@close="showLevelSelector = false"
			@select="handleLevelSelect"
		/>
	</div>
</template>

<style scoped>
.animate-fade-in {
	animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
	animation: fadeIn 0.8s ease-out 0.2s both;
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
