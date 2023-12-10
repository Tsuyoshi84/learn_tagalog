<script lang="ts" setup>
type Props = {
	/** English text */
	en: string
	/** Tagalog text */
	tl: string
	/** Target language */
	target: 'en' | 'tl'
}
const props = defineProps<Props>()

const showAnswer = defineModel<boolean>('showAnswer')
const originalText = computed(() => (props.target === 'en' ? props.tl : props.en))
const translatedText = computed(() => (props.target === 'en' ? props.en : props.tl))
</script>

<template>
	<div>
		<div class="min-h-[4rem] text-center text-xl">
			{{ originalText }}
		</div>
		<div class="my-4 rounded-lg bg-gray-200 p-2 text-center text-2xl" @click="showAnswer = true">
			<span :class="{ invisible: !showAnswer }">
				{{ translatedText }}
			</span>
		</div>
	</div>
</template>
