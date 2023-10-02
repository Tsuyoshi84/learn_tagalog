<script lang="ts" setup>
const props = defineProps<{
  searchText: string
}>()

const { texts } = useTextSearch(() => props.searchText)
</script>

<template>
  <TextListItem :text="text" v-for="text in texts" :key="text.id" />
</template>

<style scoped></style>
