<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

const { loggedIn } = storeToRefs(useAuthStore())
</script>

<template>
	<NuxtErrorBoundary>
		<div class="grid h-full grid-rows-[auto_1fr]">
			<NavigationMenu v-if="loggedIn" />
			<main class="p-4">
				<slot />
			</main>
		</div>

		<template #error="{ error }">
			<p>An error occurred: {{ error }}</p>
		</template>
	</NuxtErrorBoundary>
</template>
