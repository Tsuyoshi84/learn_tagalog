<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.ts'

const { loggedIn } = storeToRefs(useAuthStore())

// If a user is logged in, redirect to protected page
whenever(loggedIn, () => navigateTo('/'), { immediate: true })
</script>

<template>
	<div>Waiting for login...</div>
</template>
