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
	open: boolean
}>()

const emit = defineEmits<{
	/** Event emitted when the modal should be closed */
	close: []
}>()

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')

function handleBackdropClick(event: MouseEvent): void {
	if (event.target === dialogRef.value) {
		emit('close')
	}
}

onMounted(() => {
	if (props.open && dialogRef.value && !dialogRef.value.open) {
		dialogRef.value.showModal()
	}
})

onUnmounted(() => {
	if (dialogRef.value?.open) {
		dialogRef.value.close()
	}
})

watch(
	() => props.open,
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
		@click="handleBackdropClick"
	>
		<div class="content">
			<slot />
		</div>
	</dialog>
</template>

<style scoped>
dialog {
	border-radius: 0.5rem;
	padding: 0;

	&::backdrop {
		background-color: oklch(20% 0 264 / 0.5);
		backdrop-filter: blur(4px);
	}

	.content {
		box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.15);
	}
}
</style>
