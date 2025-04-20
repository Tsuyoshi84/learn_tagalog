<script lang="ts" setup>
import BaseModal from '~/components/BaseModal.vue'

const props = defineProps<{
	/** Controls whether the level selector modal is shown or hidden */
	isOpen: boolean
	/** The maximum level of the quiz */
	maxLevel: number
}>()

const emit = defineEmits<{
	/** Emitted when the modal should be closed */
	close: []
	/**
	 * Emitted when a level is selected
	 * @param level - The selected quiz level (1-3)
	 */
	select: [level: number]
}>()

const levels = computed<readonly number[]>(() => {
	return Array.from({ length: props.maxLevel }, (_, index) => index + 1)
})

function handleLevelSelect(level: number): void {
	emit('select', level)
	emit('close')
}
</script>

<template>
	<BaseModal
		:is-open="isOpen"
		@close="emit('close')"
	>
		<div class="min-w-72 max-w-sm p-6">
			<h2 class="mb-6 text-center text-2xl font-bold text-gray-900">Select Level</h2>
			<div class="flex flex-col gap-4">
				<button
					v-for="level in levels"
					:key="level"
					type="button"
					class="flex h-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-300 to-blue-500 font-bold text-white transition-transform hover:scale-105 md:h-20"
					@click="handleLevelSelect(level)"
				>
					Level {{ level }}
				</button>
			</div>
		</div>
	</BaseModal>
</template>
