<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth.ts'

const authStore = useAuthStore()
const { loggedIn } = storeToRefs(authStore)
const { signIn } = authStore

definePageMeta({ layout: false })

useHead({ title: 'Login' })

watchEffect(() => {
	if (loggedIn.value) {
		navigateTo({ name: 'index' })
	}
})
</script>

<template>
	<div class="login-container">
		<h2 class="login-title">Sign in to your account</h2>
		<button
			class="login-btn"
			type="button"
			@click="signIn('google')"
		>
			<div class="icon">
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 48 48"
					style="display: block"
				>
					<path
						fill="#EA4335"
						d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
					/>
					<path
						fill="#4285F4"
						d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
					/>
					<path
						fill="#FBBC05"
						d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
					/>
					<path
						fill="#34A853"
						d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
					/>
					<path
						fill="none"
						d="M0 0h48v48H0z"
					/>
				</svg>
			</div>
			Sign in with Google</button
		>
	</div>
</template>

<style scoped>
.login-container {
	display: flex;
	block-size: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.login-title {
	margin-block: 1.5rem;
	font-size: 1.875rem;
	font-weight: bold;
	text-align: center;
	color: white;
}
.login-btn {
	display: flex;
	max-inline-size: 272px;
	block-size: 2.5rem;
	padding-inline: 0.75rem;
	border: 1px solid #e5e7eb;
	border-radius: 9999px;
	align-items: center;
	gap: 0.625rem;
	background: white;
	transition: background 0.2s;
	cursor: pointer;

	&:hover {
		background: #f3f4f6;
	}

	.icon {
		display: block;
		inline-size: 1.25rem;
		block-size: 1.25rem;
	}
}
</style>
