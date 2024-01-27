<template>
  <v-data-table
      :headers="headers"
      :items="personal"
      v-if="personal"
  />
  <v-skeleton-loader type="table" v-else/>
</template>
<script setup>
const supabase = useSupabaseClient()
const verwalten = useVerwaltenStore()
const personal = ref(null)
const headers = [
  {title: 'Name', value: 'name_copy'},
  {title: 'E-Mail', value: 'email_copy'},
]

onMounted(async () => {
  const {data} = await supabase.from('restaurant_has_personal')
      .select(`*`)
      .eq('restaurant_id', verwalten.restaurant.id)
  personal.value = data
})
</script>
