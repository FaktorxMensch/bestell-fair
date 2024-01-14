<template>
  <h1>Alle Restaurants in Deiner Nähe</h1>
  <v-select label="Sortieren nach" :items="['Entfernung', 'Bewertung', 'Auslastung']"/>
  <v-select label="Filtern nach" :items="['Entfernung', 'Bewertung', 'Auslastung']"/>
  <hr/>
  <v-list class="mt-12">
    <v-list-item v-for="restaurant in restaurants" :key="restaurant.id">
      <v-list-item-avatar>
        <v-img :src="restaurant.logo"/>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ restaurant.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ restaurant.location }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
            :href="`/restaurant/${restaurant.id}`"
            color="teal" text>Jetzt bestellen
        </v-btn>
      </v-list-item-action>
    </v-list-item>
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
