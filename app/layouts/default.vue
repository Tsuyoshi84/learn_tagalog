<script lang="ts" setup>
const authStore = useAuthStore()
const { signOut } = authStore
</script>

<template>
	<NuxtErrorBoundary>
		<div class="grid h-full grid-rows-[4rem_1fr]">
			<header class="flex justify-end px-4 py-2">
				<button type="button" @click="signOut()">Sign out</button>
			</header>
			<main class="p-4">
				<slot></slot>
			</main>
		</div>
		<template #error="{ error }">
			<p>An error occurred: {{ error }}</p>
		</template>
	</NuxtErrorBoundary>
</template>
