<script setup lang="ts">
import type { Database } from '~/database-generated.types'

const en = shallowRef('')
const tl = shallowRef('')

const supabase = useSupabaseClient<Database>()

async function submit(): Promise<void> {
	// Insert a new row
	try {
		await supabase.from('texts').insert({ en: en.value, tl: tl.value })
	} catch (error) {
		console.error('Error inserting new row:', error)
	}

	// Clear the form
	en.value = ''
	tl.value = ''
}
</script>

<template>
	<form type="form" class="flex flex-col gap-4" @submit.prevent="submit">
		<label for="en">
			English
			<input id="en" v-model="en" type="text" label="English" name="en" class="w-full" />
		</label>
		<label for="tl">
			Tagalog
			<input id="tl" v-model="tl" type="text" label="Tagalog" name="tl" class="w-full" />
		</label>

		<button type="submit" class="btn">Submit</button>
	</form>
</template>
