<script lang="ts" setup>
const text = {
  id: '1',
  en: 'Perhaps Armany can solve this problem.',
  tl: 'Siguro malulutas ni Armany ang problemang ito.'
}

const highLightWords = ['ni', 'problemang']
</script>

<template>
  <TextListItem :text="text" :high-light-words="highLightWords" />
</template>

<style scoped></style>
