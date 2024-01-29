<template>
  <v-toolbar
      color="white"
      elevation="5"
  >
    <v-btn to="/restaurant" icon="mdi-arrow-left"/>
    <v-spacer class="hidden md:flex"/>
    <v-app-bar-title>{{ restaurant.name }}</v-app-bar-title>
    <v-btn icon="mdi-cart" @click="toggleCart">
      <v-badge :content="count" color="primary" >
        <v-icon icon="mdi-shopping"/>
      </v-badge>
    </v-btn>
  </v-toolbar>
  <gast-render-restaurant v-if="restaurant" :restaurant="restaurant"/>
</template>
<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const restaurant = ref(false);
const gastStore = useGastStore();
const {count, restaurant_id: storeRestaurantId, cartOpen} = storeToRefs(gastStore);

onMounted(async () => {
  const {data, error} = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", route.params.restaurant)
      .single();
  if (data) {
    restaurant.value = data;
  }
});
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
        } else {
          // go back to the other restaurant
          return navigateTo('/restaurant/' + storeRestaurantId.value)
        }
      });
    } else {
      gastStore.setRestaurantId(route.params.restaurant);
    }
  }
})
const toggleCart = () => gastStore.cartOpen = !gastStore.cartOpen
</script>
