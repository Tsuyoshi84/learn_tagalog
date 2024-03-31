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
const showAnswer = defineModel<boolean>('showAnswer', { required: true })

const originalText = computed<string>(() => (props.target === 'en' ? props.tl : props.en))
const translatedText = computed<string>(() => props[props.target])
const bottomHalfStyle = computed<CSSProperties>(() => {
	return showAnswer.value ? { transform: 'rotateX(0)' } : { transform: 'rotateX(-90deg)' }
})

const FoldedCard = (_: unknown, { slots }: { slots: { default: () => void } }) => (
	<div class="bg-card pointer-events-auto grid items-center text-balance p-2 text-center text-xl shadow-xl transition-all duration-300 ease-in-out">
		{slots.default()}
	</div>
)
</script>

<template>
	<div
		class="card-container pointer-events-none flex flex-col justify-evenly gap-0 transition-all duration-300 ease-in-out"
		:class="{
			'h-[--card-height]': true,
			'w-[--card-width]': true,
			'translate-y-0': showAnswer,
			'translate-y-[--card-quarter-height]': !showAnswer,
		}"
	>
		<FoldedCard
			class="border-b"
			:class="{
				'h-[--card-half-height]': true,
				'border-transparent': showAnswer,
				'border-gray-300': !showAnswer,
			}"
		>
			<button
				class="h-full w-full"
				type="button"
				:disabled="showAnswer"
				aria-label="Show answer"
				@click="showAnswer = !showAnswer"
			>
				{{ originalText }}
			</button>
		</FoldedCard>
		<FoldedCard
			class="align-center z-10 origin-top translate-y-14 flex-col font-bold text-red-400"
			:style="bottomHalfStyle"
			:class="{
				'h-[--card-half-height]': true,
			}"
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
