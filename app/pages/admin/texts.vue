<script setup lang="ts">
import type { Database } from '~/database-generated.types'

const en = shallowRef('')
const tl = shallowRef('')

const supabase = useSupabaseClient<Database>()

async function submit(): Promise<void> {
	// Insert a new row
	await supabase.from('texts').insert({ en: en.value, tl: tl.value })

	// Clear the form
	en.value = ''
	tl.value = ''
}
</script>

<template>
	<form
		class="flex flex-col gap-4"
		@submit.prevent="submit"
	>
		<label for="en">
			English
			<input
				id="en"
				v-model="en"
				type="text"
				name="en"
				class="w-full"
			/>
		</label>
		<label for="tl">
			Tagalog
			<input
				id="tl"
				v-model="tl"
				type="text"
				name="tl"
				class="w-full"
			/>
		</label>

		<button
			type="submit"
			class="btn"
			>Submit</button
		>
	</form>
</template>
