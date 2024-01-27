<template>
  <h1 class="text-3xl font-bold mb-2 mt-3">user</h1>
  <pre class="text-xs">
    {{user.user_metadata}}
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
// const { data, error } = await supabase.from('user_owns_restaurant').select('*')
// set webseite to random string
const { data, error } = await supabase.from('restaurant').update({website: Math.random().toString(36).substring(7)})

</script>
