import type { JwtPayload } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

/**
 * Returns the authenticated user's JWT claims, or throws 401 if unauthenticated.
 * @param event The H3 event from the server route handler.
 */
export async function getUser(event: H3Event): Promise<JwtPayload> {
	const user = (await serverSupabaseUser(event)) ?? undefined

	if (user === undefined) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	return user
}
