<template>
  <div>
    <ul>
      <li v-for="restaurant in restaurants">
        {{ restaurant.name }}
      </li>
    </ul>
    <v-text-field
        v-model="newRestaurantName"
        label="New Restaurant Name"/>
    <v-btn @click="addElement()">Add Element</v-btn>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient()
const restaurants = ref([])
const fetchData = async function() {
  const {data, error} = await supabase
      .from('restaurants')
      .select('*')
  if (error) console.log(error)
  else restaurants.value = data
}
await fetchData()
const newRestaurantName = ref('')
const addElement = async () => {
  const { data, error } = await supabase
      .from('restaurants')
      .insert([
        { name: newRestaurantName.value }
      ])
      .select('*')
  if (error) console.log(error)
  else {
    restaurants.value = [...restaurants.value, ...data]
    newRestaurantName.value = ''
  }

}
</script>