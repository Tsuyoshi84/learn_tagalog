<script lang="ts" setup>
const authStore = useAuthStore()
const { userName } = storeToRefs(authStore)
</script>

<template>
	<div class="flex h-[calc(100%-4rem)] flex-col justify-center gap-4 text-center">
		<div>
			<p class="w-full text-center text-3xl font-bold">Hey {{ userName }}</p>
			<p>Let's learn Tagalog 💪</p>
		</div>
		<nav class="flex items-center">
			<ul class="w-full">
				<li class="w-full rounded-md bg-blue-200 p-4 text-center">
					<NuxtLink class="block h-full w-full font-sans text-2xl" to="/flash-cards"
						>Flash Cards</NuxtLink
					>
				</li>
			</ul>
		</nav>
	</div>
</template>
