<template>
  <h1 class="text-3xl">Test</h1>
  <pre>
    {{ data }}
  </pre>

</template>
<script setup>
const supabase = useSupabaseClient()
const orderId = 'aa9e8f40-0dc0-483f-8027-6a9811fcf575'; // Replace with the actual order ID

const {data, error} = await supabase
    .from('rlstest')
    .select('*')
    // .eq('id', orderId)
    // .limit(1);
</script>
