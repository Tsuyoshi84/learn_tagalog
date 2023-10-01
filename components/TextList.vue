<script lang="ts" setup>
import { Database } from '~/supabase'

const supabase = useSupabaseClient<Database>()

const { data } = await supabase.from('texts').select('en, tl')
</script>

<template>
  <div>{{ data }}</div>
</template>

<style scoped></style>
