<script lang="ts" setup>
/**
 * A reusable modal component that provides a customizable dialog with backdrop.
 * Features include:
 * - Controlled visibility through isOpen prop
 * - Backdrop click handling for closing
 * - Smooth animations for enter/exit transitions
 * - Accessible dialog implementation using native <dialog> element
 *
 * @example
 * ```vue
 * <BaseModal :is-open="isModalOpen" @close="closeModal">
 *   <div>Modal content goes here</div>
 * </BaseModal>
 * ```
 */

const props = defineProps<{
	/** Controls whether the modal is shown or hidden */
	isOpen: boolean
}>()

const emit = defineEmits<{
	/** Event emitted when the modal should be closed */
	close: []
}>()

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')

function handleClose(): void {
	emit('close')
}

function handleBackdropClick(event: MouseEvent): void {
	if (event.target === dialogRef.value) {
		handleClose()
	}
}

onMounted(() => {
	if (props.isOpen && dialogRef.value && !dialogRef.value.open) {
		dialogRef.value.showModal()
	}
})

onUnmounted(() => {
	if (dialogRef.value?.open) {
		dialogRef.value.close()
	}
})

watch(
	() => props.isOpen,
	(isOpen) => {
		if (!dialogRef.value) return

		if (isOpen && !dialogRef.value.open) {
			dialogRef.value.showModal()
		} else if (!isOpen && dialogRef.value.open) {
			dialogRef.value.close()
		}
	},
)
</script>

<template>
	<dialog
		ref="dialog"
		class="modal rounded-lg p-0 backdrop:bg-gray-900/50 backdrop:backdrop-blur-sm"
		@click="handleBackdropClick"
	>
		<div class="animate-modal-enter">
			<slot />
		</div>
	</dialog>
</template>

<style scoped>
.modal {
	&::backdrop {
		animation: backdrop-fade-in 0.3s ease-out;
	}

	&[open] {
		animation: modal-fade-in 0.3s ease-out;
	}

	&[closing] {
		animation: modal-fade-out 0.3s ease-out;
	}
}

@keyframes backdrop-fade-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes modal-fade-in {
	from {
		opacity: 0;
		transform: translateY(-10%);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes modal-fade-out {
	from {
		opacity: 1;
		transform: translateY(0);
	}
	to {
		opacity: 0;
		transform: translateY(-10%);
	}
}
</style>
