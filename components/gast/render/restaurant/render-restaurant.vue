<template>
  <v-card>
    <img
        :src="'https://cuzkisufgqldigyzbkak.supabase.co/storage/v1/object/public/restaurants/'+restaurant.feature_image_url"
        alt="Restaurant Feature Image"
        style="object-fit: cover; width: 800px; height: 150px;"
    />
    <div class="flex items-center gap-4 p-4 -mt-6">
      <v-avatar size="130" class="border-4 border-white -mt-6">
        <img
            :src="'https://cuzkisufgqldigyzbkak.supabase.co/storage/v1/object/public/restaurants/'+restaurant.icon_image_url"
            alt="Restaurant Icon">
      </v-avatar>

      <div>
        <h2 class="text-2xl font-medium">{{ restaurant.name }}</h2>
        <p class="text-sm">@TheSharkDaymond • Public Figure</p>
      </div>
    </div>

    <v-tabs v-model="activeTab" background-color="teal darken-4" dark :grow="true">
      <v-tab v-for="tab in tabs" :key="tab.name" ripple>
        {{ tab.name }}
      </v-tab>
    </v-tabs>


    <div class="bg-gray-100 p-2">
      <component :is="kontakt" :restaurant="restaurant"/>
    </div>

  </v-card>
</template>
<script setup>
const kontakt = resolveComponent('gast-render-restaurant-tab-kontakt')
const props = defineProps({
  restaurant: {
    type: Object,
    required: true
  }
})
const tabs = ref([
  {name: 'Übersicht', component: 'gast-render-restaurant-uebersicht', component: 'kontakt'},
  {name: 'Speisekarte', component: 'gast-render-restaurant-speisekarte', component: 'kontakt'},
  {name: 'Öffnungszeiten', component: 'gast-render-restaurant-oeffnungszeiten', component: 'kontakt'},
  {name: 'Kontakt', component: 'gast-render-restaurant-kontakt', component: 'kontakt'},
])
const activeTab = ref(0)
</script>

