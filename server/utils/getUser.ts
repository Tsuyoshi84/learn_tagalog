import type { User } from '@supabase/supabase-js'
import { serverSupabaseUser } from '#supabase/server'
import type { H3Event } from 'h3'

export async function getUser(event: H3Event): Promise<User> {
	const user = (await serverSupabaseUser(event)) ?? undefined

	if (user === undefined) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	return user
}
