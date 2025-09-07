import * as Sentry from '@sentry/nuxt'

Sentry.init({
	dsn: 'https://e61723b468a74f3b69095ee2cb75bcba@o4509727326994432.ingest.us.sentry.io/4509977664815104',

	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
})
