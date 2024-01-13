<script lang="tsx" setup>
type Props = {
	/** English text */
	en: string
	/** Tagalog text */
	tl: string
	/** Target language */
	target: 'en' | 'tl'
}
const props = defineProps<Props>()

/** Whether or not the answer is showing */
const showAnswer = defineModel<boolean>('showAnswer')

const originalText = computed<string>(() => (props.target === 'en' ? props.tl : props.en))
const translatedText = computed<string>(() => (props.target === 'en' ? props.en : props.tl))
const bottomHalfStyle = computed<CSSProperties>(() => {
	return showAnswer.value ? { transform: 'rotateX(0)' } : { transform: 'rotateX(-90deg)' }
})

const FoldedCard = (_: unknown, { slots }: { slots: any }) => (
	<div class="bg-card pointer-events-auto grid items-center text-balance p-2 text-center text-xl shadow-xl transition-all duration-300 ease-in-out">
		{slots.default()}
	</div>
)
</script>

<template>
	<div
		class="card-container pointer-events-none flex h-[--card-height] w-[--card-width] flex-col justify-evenly gap-0 transition-all duration-300 ease-in-out"
		:class="{ 'translate-y-0': showAnswer, 'translate-y-[--card-quarter-height]': !showAnswer }"
	>
		<FoldedCard
			class="h-[--card-half-height] border-b"
			:class="{ 'border-transparent': showAnswer, 'border-gray-300': !showAnswer }"
			@click="showAnswer = !showAnswer"
		>
			{{ originalText }}
		</FoldedCard>
		<FoldedCard
			class="align-center z-10 h-[--card-half-height] origin-top translate-y-14 flex-col font-bold text-red-400"
			:style="bottomHalfStyle"
		>
			<span v-show="showAnswer">{{ translatedText }}</span>
		</FoldedCard>
	</div>
</template>

<style scoped>
.card-container {
	perspective: 1000px;

	--card-width: 100%;
	--card-height: 20rem;
	--card-half-height: calc(var(--card-height) / 2);
	--card-quarter-height: calc(var(--card-height) / 4);
}
</style>
