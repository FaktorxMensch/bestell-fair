<template>
  <h1 class="text-3xl font-bold mb-2 mt-3">data</h1>
  <pre>
    {{data}}
  </pre>
  <v-alert v-if="error" type="error">
    {{error}}
  </v-alert>
</template>
<script setup>
const supabase = useSupabaseClient()
const { data, error } = await supabase.rpc('get_order', { order_id: 'a11566da-2470-4870-81e4-dfc58a772c3d' });
</script>
