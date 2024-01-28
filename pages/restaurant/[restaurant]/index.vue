<template>
  <v-app-bar
      scroll-behavior="collapse"
      scroll-threshold="1"
  >
    <v-btn to="/restaurant" icon="mdi-arrow-left"/>
    <v-spacer class="hidden md:flex"/>
    <v-app-bar-title>{{ restaurant.name }}</v-app-bar-title>
    <v-btn icon="mdi-phone" :href="'tel:' + restaurant.phone"/>
  </v-app-bar>
  <gast-render-restaurant v-if="restaurant" :restaurant="restaurant"/>
</template>
<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const restaurant = ref(false);
const gastStore = useGastStore();

onMounted(async () => {
  const {data, error} = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", route.params.restaurant)
      .single();
  if (data) {
    restaurant.value = data;
    gastStore.setRestaurantId(route.params.restaurant);
  }
  console.log(data, error)
});
</script>
