<template>
  <h1 class="text-3xl font-bold mb-2 mt-3">user</h1>
  <pre class="text-xs">
    {{user}}
  </pre>

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
const user = useSupabaseUser()
const { data, error } = await supabase.from('user_owns_restaurant').select('*')
</script>
