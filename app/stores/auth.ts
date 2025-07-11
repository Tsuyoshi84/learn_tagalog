export const useAuthStore = defineStore('auth', () => {
	const user = useSupabaseUser()

	/** Whether the user is logged in or not. */
	const loggedIn = computed<boolean>(() => isDefined(user.value))

	const userName = computed<string | undefined>(() => {
		if (!isDefined(user)) return undefined

		// biome-ignore lint/complexity/useLiteralKeys: user_metadata.name comes from index signature
		return user.value.user_metadata['name']
	})

	const userId = computed<string | undefined>(() => {
		if (!isDefined(user)) return undefined

		return user.value.id
	})

	const { auth } = useSupabaseClient()

	const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

	/**
	 * Sign in with a given method.
	 * @param method The method to sign in with.
	 */
	async function signIn(method: 'google'): Promise<void> {
		if (method === 'google') {
			await signInWithGoogle()
		}
	}

	async function signInWithGoogle(): Promise<void> {
		await auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
	}

	/**
	 * Sign out the user.
	 */
	async function signOut(): Promise<void> {
		const { error } = await auth.signOut()

		if (error) {
			throw error
		}

		navigateTo({ name: 'login' })
	}

	return {
		user,
		loggedIn,
		userId,
		userName,
		signIn,
		signOut,
	}
})
