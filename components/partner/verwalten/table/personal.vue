<template>
  <v-data-table
      :headers="headers"
      :items="personal"
  />
</template>
<script setup>
const supabase = useSupabaseClient()
const {data: personal} = await supabase.from('restaurant_has_personal').select('*')
const headers = [
  {title: 'Name', value: 'name_copy'},
  {title: 'E-Mail', value: 'email_copy'},
]
</script>
