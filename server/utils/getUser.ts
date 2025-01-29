import type { User } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

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
