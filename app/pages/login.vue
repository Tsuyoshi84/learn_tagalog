<script lang="ts" setup>
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

useHead({ title: 'Login' })
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
	if (isDefined(user)) {
		navigateTo({ name: 'index' })
	}
})
</script>

<template>
	<div>
		<h2 class="u-text-white my-6 text-center text-3xl font-extrabold">Sign in to your account</h2>

		<button
			type="button"
			@click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })"
		>
			Google</button
		>
	</div>
</template>
