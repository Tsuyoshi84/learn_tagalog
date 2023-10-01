<script lang="ts" setup>
const supabase = useSupabaseClient()

const { data } = await supabase.from('texts').select('en, tl')
</script>

<template>
  <div>{{ data }}</div>
</template>

<style scoped></style>
