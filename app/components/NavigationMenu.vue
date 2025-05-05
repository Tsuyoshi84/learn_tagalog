<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth.ts'

const showMenu = shallowRef(false)
const { signOut } = useAuthStore()

const menuItems = [
	{
		name: 'Top',
		to: { name: 'index' },
		icon: 'carbon:home',
	},
] as const

function toggleMenu(): void {
	showMenu.value = !showMenu.value
}

function closeMenu(): void {
	showMenu.value = false
}
</script>

<template>
	<nav>
		<!-- Desktop Menu -->
		<div class="hidden h-14 justify-between bg-white px-4 py-2 shadow-lg md:flex">
			<NuxtLink
				v-for="item in menuItems"
				:key="item.name"
				:to="item.to"
				class="flex items-center gap-1 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100"
			>
				<Icon :name="item.icon" />
				{{ item.name }}
			</NuxtLink>

			<button
				type="button"
				class="flex items-center gap-1 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100"
				@click="signOut"
			>
				<Icon name="carbon:logout" />
				Logout
			</button>
		</div>

		<!-- Mobile Menu Button -->
		<div class="fixed right-4 top-4 z-50 md:hidden">
			<button
				type="button"
				class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-transform hover:scale-105 active:scale-95"
				aria-label="Toggle menu"
				@click="toggleMenu"
			>
				<div
					v-if="!showMenu"
					class="flex h-4 w-5 flex-col justify-between"
				>
					<div class="h-0.5 w-full bg-current"></div>
					<div class="h-0.5 w-full bg-current"></div>
					<div class="h-0.5 w-full bg-current"></div>
				</div>
				<Icon
					v-else
					name="carbon:close"
					class="h-6 w-6"
				/>
			</button>
		</div>

		<!-- Mobile Menu Dropdown -->
		<div
			v-show="showMenu"
			class="animate-fade-in fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-sm md:hidden"
		>
			<div class="mt-20 flex flex-col items-center justify-center gap-4 p-8">
				<NuxtLink
					v-for="item in menuItems"
					:key="item.name"
					:to="item.to"
					class="flex items-center gap-2 rounded-lg px-6 py-3 text-xl text-gray-600 transition-colors hover:bg-gray-100"
					@click="closeMenu"
				>
					<Icon
						:name="item.icon"
						class="h-6 w-6"
					/>
					{{ item.name }}
				</NuxtLink>

				<button
					type="button"
					class="flex items-center gap-2 rounded-lg px-6 py-3 text-xl text-gray-600 transition-colors hover:bg-gray-100"
					@click="signOut"
				>
					<Icon
						name="carbon:logout"
						class="h-6 w-6"
					/>
					Logout
				</button>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.animate-fade-in {
	animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
