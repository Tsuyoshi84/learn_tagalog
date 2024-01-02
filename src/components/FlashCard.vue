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
const originalText = computed<string>(() => (props.target === 'en' ? props.tl : props.en))
const translatedText = computed<string>(() => (props.target === 'en' ? props.en : props.tl))
</script>

<template>
	<div class="flex w-full flex-col justify-evenly gap-0">
		<div
			class="grid min-h-28 translate-y-14 scale-[0.8] items-center text-balance p-2 text-center text-2xl font-bold text-red-400 transition-all duration-300 ease-in-out"
			:class="{ 'translate-y-28 scale-100': showAnswer }"
		>
			<span v-show="showAnswer">{{ translatedText }}</span>
		</div>
		<div
			class="bg-primary grid min-h-28 -translate-y-14 scale-[1.05] items-center text-balance rounded-xl border p-2 text-center text-xl shadow-xl transition-all duration-300 ease-in-out"
			:class="{ '-translate-y-28 scale-100 border-white shadow-none': showAnswer }"
			@click="showAnswer = true"
		>
			{{ originalText }}
		</div>
	</div>
</template>
