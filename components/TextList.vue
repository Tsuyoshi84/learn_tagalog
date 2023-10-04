<script lang="ts" setup>
const props = defineProps<{
  searchText: string
}>()

const { texts, searchWords } = useTextSearch(() => props.searchText)
</script>

<template>
  <div class="wrapper">
    <TextListItem :text="text" :high-light-words="searchWords" v-for="text in texts" :key="text.id" />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
</style>
