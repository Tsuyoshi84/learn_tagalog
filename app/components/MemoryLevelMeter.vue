<script lang="ts" setup>
const props = defineProps<{
	/** The memory level of the text */
	memoryLevel: number
}>()

const maxLevel = 8
const progressPercentage = computed(() => (props.memoryLevel / maxLevel) * 100)
</script>

<template>
	<div class="progress-bar">
		<div class="progress-track">
			<div
				class="progress-fill"
				:style="{ width: `${progressPercentage}%` }"
			>
				<div class="progress-glow"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.progress-bar {
	display: flex;
	inline-size: 100%;
	block-size: 1rem;
	flex-direction: column;
	gap: 0.5rem;
}

.progress-track {
	position: relative;
	inline-size: 100%;
	block-size: 100%;
	border-radius: 0.375rem;
	overflow: hidden;
	background: oklch(92% 0.02 120);
	box-shadow: inset 0 1px 2px oklch(0% 0 0 / 0.1);
}

.progress-fill {
	position: relative;
	block-size: 100%;
	border-radius: 0.375rem;
	overflow: hidden;
	background: linear-gradient(90deg, oklch(60% 0.15 140) 0%, oklch(50% 0.2 160) 100%);
	transition: inline-size 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.progress-fill::before {
	position: absolute;
	inset: 0;
	background: linear-gradient(90deg, transparent 0%, oklch(100% 0 0 / 0.3) 50%, transparent 100%);
	animation: progressShine 2s infinite;
	content: '';
}

.progress-glow {
	position: absolute;
	inset: 0;
	border-radius: 0.375rem;
	opacity: 0.6;
	background: linear-gradient(90deg, oklch(70% 0.2 140) 0%, oklch(60% 0.25 160) 100%);
	filter: blur(2px);
	animation: progressGlow 1.5s ease-in-out infinite alternate;
}

@keyframes progressShine {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(100%);
	}
}

@keyframes progressGlow {
	0% {
		opacity: 0.4;
	}
	100% {
		opacity: 0.8;
	}
}

/* Mobile optimizations */
@media (max-width: 480px) {
	.memory-meter {
		padding-inline: 1rem;
		padding-block: 0.75rem;
	}

	.progress-track {
		block-size: 100%;
	}

	.progress-label {
		font-size: 0.625rem;
	}
}

@media (min-width: 768px) {
	.memory-meter {
		padding-inline: 1.5rem;
		padding-block: 1.25rem;
	}

	.progress-track {
		block-size: 0.875rem;
	}

	.progress-label {
		font-size: 0.875rem;
	}
}
</style>
