<script lang="ts" setup></script>

<template>
	<NuxtErrorBoundary>
		<slot />

		<template #error="{ error }">
			<p>An error occurred: {{ error }}</p>
		</template>
	</NuxtErrorBoundary>
</template>
