<template>
  <gast-render-restaurant v-if="restaurant" :restaurant="restaurant" />
</template>
<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const restaurant = ref(false);
const gastStore = useGastStore();

onMounted(async () => {
  const { data, error } = await supabase
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
