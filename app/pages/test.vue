<script lang="ts" setup>
import SentenceQuiz from '~/components/SentenceQuiz.vue'

const text = {
	id: '1',
	en: 'Perhaps Armany can solve this problem.',
	tl: 'Siguro malulutas ni Armany ang problemang ito.',
}
</script>

<template>
	<SentenceQuiz :text="text" />
</template>
