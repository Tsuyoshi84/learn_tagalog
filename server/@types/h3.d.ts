import type { User } from '@supabase/supabase-js'

declare module 'h3' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface H3EventContext {
		user: User | undefined
	}
}
