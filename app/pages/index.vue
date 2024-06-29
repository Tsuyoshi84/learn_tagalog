<script lang="ts" setup>
const authStore = useAuthStore()
const { signOut } = authStore
const { userName } = storeToRefs(authStore)
</script>

<template>
	<div>
		<h1>{{ userName }}</h1>
		<button type="button" @click="signOut()">Sign out</button>
		<nav class="flex items-center">
			<ul class="w-full">
				<li class="w-full bg-blue-400 p-4 text-center text-white">
					<NuxtLink class="block h-full w-full font-sans text-2xl" to="/flash-cards"
						>Flash Cards</NuxtLink
					>
				</li>
			</ul>
		</nav>
	</div>
</template>
