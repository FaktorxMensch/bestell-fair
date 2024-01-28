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
  }
  console.log(data, error)
});
const {count, restaurant_id:storeRestaurantId} = storeToRefs(gastStore);
watch(restaurant, (newVal) => {
  if (newVal) {
    if (count.value > 0 && storeRestaurantId.value != newVal.id) {
      // swal asking if you want to reset the order
      Swal.fire({
        title: "Bestellung zurücksetzen?",
        text: "Du hast Bestellungen aus einem anderen Restaurant im Warenkorb. Wenn du fortfährst, wird die Bestellung zurückgesetzt.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ja, zurücksetzen!",
        cancelButtonText: "Nein, weiter bestellen",
      }).then((result) => {
        if (result.isConfirmed) {
          gastStore.resetOrder();
          gastStore.setRestaurantId(route.params.restaurant);
        }
        else {
          // go back to the other restaurant
          return navigateTo('/restaurant/' + storeRestaurantId.value)
        }
      });
    }
    else {
      gastStore.setRestaurantId(route.params.restaurant);
    }
  }
})
</script>
