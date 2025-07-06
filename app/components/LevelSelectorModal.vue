<script lang="ts" setup>
import BaseModal from '~/components/BaseModal.vue'

const props = defineProps<{
	/** Controls whether the level selector modal is shown or hidden */
	open: boolean
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
		:open="open"
		@close="emit('close')"
	>
		<div class="modal-container">
			<h2 class="modal-title">Select Level</h2>
			<div class="levels">
				<button
					v-for="level in levels"
					:key="level"
					type="button"
					class="level-btn"
					@click="handleLevelSelect(level)"
				>
					Level {{ level }}
				</button>
			</div>
		</div>
	</BaseModal>
</template>

<style scoped>
.modal-container {
	min-inline-size: 18rem;
	max-inline-size: 24rem;
	padding: 1.5rem;

	.modal-title {
		margin-block-end: 1.5rem;
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		color: oklch(20% 0 264);
	}

	.levels {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.level-btn {
			display: flex;
			block-size: 3.5rem;
			align-items: center;
			justify-content: center;
			border-radius: 0.5rem;
			background: linear-gradient(135deg, oklch(80% 0.18 264) 0%, oklch(60% 0.18 264) 100%);
			font-weight: bold;
			color: #fff;
			transition: scale 0.2s;
			font-size: 1rem;

			&:hover {
				scale: 1.05;
			}
		}
	}
}

@media (min-width: 768px) {
	.modal-container .levels .level-btn {
		block-size: 5rem;
	}
}
</style>
