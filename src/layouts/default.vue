<script lang="ts" setup></script>

<template lang="pug">
NuxtErrorBoundary
	header
	main.grid-cols-page.row-span-1.grid.h-dvh
		div
		slot
		div
	template(#error='{ error }')
		p An error occurred: {{ error }}
</template>
