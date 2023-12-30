<template>
  <div>
    <ul>
      <li v-for="restaurant in restaurants">
        {{ restaurant.name }}
      </li>
    </ul>
    <span class="p-float-label">
      <InputText
          id="newRestaurantName"
          v-model="newRestaurantName"/>
      <label for="newRestaurantName">Neuer Restaurant Name</label>
    </span>
    <Button @click="addElement()">Add Element</Button>
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