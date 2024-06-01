<script lang="ts" setup></script>

<template>
	<NuxtErrorBoundary>
		<header></header>
		<main class="grid-cols-page row-span-1 grid h-dvh">
			<div></div>
			<slot></slot>
			<div></div>
		</main>
		<template #error="{ error }">
			<p>An error occurred: {{ error }}</p>
		</template>
	</NuxtErrorBoundary>
</template>
