<script lang="ts" setup>
const searchText = ref('')
</script>

<template>
  <div>
    <input type="text" v-model.trim="searchText" />
    <TextList :search-text="searchText" />
  </div>
</template>

<style scoped></style>
