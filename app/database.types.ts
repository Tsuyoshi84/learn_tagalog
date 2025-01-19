import type { Database } from './database-generated.types'

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
// type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export type Text = Tables<'texts'>
