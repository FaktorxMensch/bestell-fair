<template>
  {{ demos }}
</template>
<script setup>
const supabase = useSupabaseClient()
const {data: demos} = await supabase.from('restaurants').select().eq('is_demo', true)
</script>
