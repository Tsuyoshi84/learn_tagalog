<script lang="ts" setup>
import BaseModal from '~/components/BaseModal.vue'

defineProps<{
	/** Controls whether the level selector modal is shown or hidden */
	isOpen: boolean
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

const LEVELS = [1, 2, 3] as const

function handleLevelSelect(level: number): void {
	emit('select', level)
	emit('close')
}
</script>

<template>
	<BaseModal :is-open="isOpen" @close="emit('close')">
		<div class="w-full max-w-sm p-6">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Select Quiz Level</h2>
			<div class="flex flex-col gap-4">
				<button
					v-for="level in LEVELS"
					:key="level"
					type="button"
					class="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-300 to-blue-500 font-bold text-white transition-transform hover:scale-105"
					@click="handleLevelSelect(level)"
				>
					Level {{ level }}
				</button>
			</div>
		</div>
	</BaseModal>
</template>
