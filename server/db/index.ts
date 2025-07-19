/**
 * Database connection.
 * It connects to the database and provides the database instance.
 * See for more information: https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 */

import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

config({ path: '.env' })

// biome-ignore lint/complexity/useLiteralKeys: Ignore process.env
const client = postgres(process.env['DATABASE_URL'] as string)
export const db = drizzle({ client })
