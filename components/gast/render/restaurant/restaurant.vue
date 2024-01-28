<template>
  <div class="flex min-h-screen bg-gray-100">
    <div class="flex-1 bg-white">
      <img
          :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+restaurant.feature_image_url+(!cache ? '?cache='+Date.now() : '')"
          alt="Restaurant Feature Image"
          class="w-full h-40 object-cover lg:h-56"
      />
      <div class="container flex items-center gap-4 p-4 -mt-6">
        <img
            class="h-20 w-20 rounded shadow"
            :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+restaurant.icon_image_url + (!cache ? '?cache='+Date.now() : '')"
            alt="Restaurant Icon">

        <div>
          <h2 class="text-2xl font-medium">{{ restaurant.name }}</h2>
          <p class="text-sm">{{ restaurant.location }}</p>
        </div>
      </div>

      <v-tabs v-model="activeTab" background-color="teal darken-4" dark :grow="true" class="container">
        <v-tab v-for="tab in tabs" :key="tab.name" ripple>
          {{ tab.name }}
        </v-tab>
      </v-tabs>

      <div class="p-2 bg-gray-100"
           style="box-shadow: inset 0px 20px 10px -20px rgba(0,0,0,0.2);">
        <div class="container">
          <component :is="tabs[activeTab].component" :restaurant="restaurant"/>
        </div>
      </div>
    </div>
    <div class="w-96 hidden lg:block shadow-lg bg-white">
      <div class="h-full flex p-6 flex-col items-center justify-center">
        <v-icon size="40" icon="mdi-food"/>
        <h1 class="text-4xl font-semibold p-4">Leerer Teller</h1>
        <p class="px-6 text-gray-500 text-center">Fülle deinen Warenkorb mit leckeren Gerichten, Getränken und
          Desserts.</p>
        <div class="h-48"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  restaurant: {
    type: Object,
    required: true
  },
  cache: {
    type: Boolean,
    default: true
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

