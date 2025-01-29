<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'
import type { RouteLocationRaw } from '#vue-router'
import LevelSelectorModal from '~/components/LevelSelectorModal.vue'

const authStore = useAuthStore()
const { userName } = storeToRefs(authStore)

const showLevelSelector = shallowRef(false)

function handleQuizClick(event: MouseEvent): void {
	event.preventDefault()
	showLevelSelector.value = true
}

function handleLevelSelect(level: number): void {
	navigateTo({
		name: 'quiz',
		query: { level: level.toString() },
	})
}

type MenuItem = {
	name: string
	icon: string
	description: string
	gradient: string
} & (
	| {
			type: 'link'
			to: RouteLocationRaw
	  }
	| {
			type: 'button'
			onClick: (event: MouseEvent) => void
	  }
)

const menuItems: MenuItem[] = [
	{
		type: 'link',
		name: 'Flash Cards',
		to: { name: 'flash-cards' },
		icon: '🎴',
		description: 'Practice with interactive cards',
		gradient: 'from-blue-300 to-blue-500',
	},
	{
		type: 'button',
		name: 'Quiz',
		icon: '✨',
		description: 'Test your knowledge',
		gradient: 'from-red-300 to-red-500',
		onClick: handleQuizClick,
	},
] as const
</script>

<template>
	<div class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8">
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
					<NuxtLink
						v-if="item.type === 'link'"
						:to="item.to"
						class="group flex h-full flex-col items-center justify-center rounded-xl bg-gradient-to-br p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
						:class="item.gradient"
					>
						<span class="mb-2 text-3xl">{{ item.icon }}</span>
						<span
							class="text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-105"
						>
							{{ item.name }}
						</span>
						<span class="mt-2 text-sm text-white/90">{{ item.description }}</span>
					</NuxtLink>

					<button
						v-else
						type="button"
						class="group flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
						:class="item.gradient"
						@click="item.onClick"
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
