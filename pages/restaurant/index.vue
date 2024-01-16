<template>
  <v-app-bar>
    <v-app-bar-title>Restaurants</v-app-bar-title>
    <v-select label="Sortieren nach" :items="['Entfernung', 'Bewertung', 'Auslastung']"/>
    <v-select label="Filtern nach" class="mx-2" :items="['Entfernung', 'Bewertung', 'Auslastung']"/>
  </v-app-bar>
  <v-list>
    <v-list-item
        class="border-b"
        v-if="restaurants.length > 0"
        v-for="restaurant in restaurants"
        :prepend-avatar="'https://cuzkisufgqldigyzbkak.supabase.co/storage/v1/object/public/restaurants/'+restaurant.icon_image_url"
        :to="'/restaurant/'+restaurant.id"
        lines="three"
        :title="restaurant.name"
        :subtitle="restaurant.description"/>
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
</script>
