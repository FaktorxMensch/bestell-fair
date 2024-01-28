<template>
  <v-app-bar scroll-threshold="1" scroll-behavior="hide">
    <template #title>
      <v-text-field
          v-model="search"
          label="Suche"
          variant="solo"
          hide-details
          prepend-inner-icon="mdi-magnify"
          autofocus
          v-if="showSearch"
      />
      <v-app-bar-title v-else>
        Restaurants</v-app-bar-title>
    </template>
    <v-btn icon="mdi-magnify" @click="showSearch = !showSearch" v-if="!showSearch"/>
  </v-app-bar>
  <v-list>
    <v-list-item
        class="border-b"
        v-if="restaurants.length > 0"
        v-for="restaurant in restaurantsFiltered"
        :prepend-avatar="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+restaurant.icon_image_url"
        :to="'/restaurant/'+restaurant.id"
        lines="two"
        :title="restaurant.name"
        :subtitle="restaurant.location"/>
    <v-skeleton-loader v-else type="list-item-avatar-three-line" v-for="i in 5"/>
  </v-list>
</template>
<script setup>
const supabase = useSupabaseClient();
const restaurants = ref([]);
onMounted(async () => {
  const {data, error} = await supabase
      .from("restaurants")
      .select("*")
      .eq("visible", true);
  if (data) {
    restaurants.value = data;
  }
  console.log(data, error)
});

const search = ref('')
const showSearch = ref(false)

const restaurantsFiltered = computed(() => {
  if (search.value.length < 3) return restaurants.value
  return restaurants.value.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(search.value.toLowerCase())
  })
})
</script>
