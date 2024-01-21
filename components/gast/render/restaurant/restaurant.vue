<template>
  <v-card class="max-w-3xl mx-auto">
    <img
        :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+restaurant.feature_image_url"
        alt="Restaurant Feature Image"
        style="object-fit: cover; width: 800px; height: 150px;"
    />
    <div class="flex items-center gap-4 p-4 -mt-6">
      <v-avatar size="130" class="border-4 border-white -mt-6">
        <img
            :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+restaurant.icon_image_url"
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
      <component :is="tabs[activeTab].component" :restaurant="restaurant"/>
    </div>

  </v-card>
</template>
<script setup>
const props = defineProps({
  restaurant: {
    type: Object,
    required: true
  }
})
const tabs = [
  // {name: 'Übersicht', component: resolveComponent('gast-render-restaurant-tab-overview')},
  {name: 'Speisekarte', component: resolveComponent('gast-render-restaurant-tab-products')},
  // {name: 'Öffnungszeiten', component: resolveComponent('gast-render-restaurant-tab-opening-hours')},
  {name: 'Kontakt', component: resolveComponent('gast-render-restaurant-tab-contact')},
]
const activeTab = ref(0)
</script>

