declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface ProcessEnv {
			DATABASE_URL: string
		}
	}
}

export {}
