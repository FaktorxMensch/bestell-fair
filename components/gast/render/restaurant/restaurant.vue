<template>
  <div class="flex bg-gray-100">
    <div class="flex-1 bg-white">
      <img
          :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+restaurant.feature_image_url+(!cache ? '?cache='+Date.now() : '')"
          alt="Restaurant Feature Image"
          class="w-full h-40 object-cover lg:h-56"
      />
      <div class="container flex items-center gap-4 p-4 -mt-20">
        <img
            class="h-20 w-20 rounded-lg border"
            :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+restaurant.icon_image_url + (!cache ? '?cache='+Date.now() : '')"
            alt="Restaurant Icon">
      </div>
      <div class="container px-5 xl:px-0 xl:mt-2 mb-4">
        <h2 class="text-2xl font-bold">{{ restaurant.name }}</h2>
        <p class="text-sm">{{ restaurant.location }}</p>
        <p class="text-sm my-2">{{ restaurant.description }}</p>
      </div>

      <div class="px-2 py-1 bg-gray-100"
           style="box-shadow: inset 0px 20px 10px -20px rgba(0,0,0,0.2);">
        <div class="container">
          <component :is="tabs[activeTab].component" :restaurant="restaurant"/>
        </div>
      </div>
    </div>
    <div v-if="cache" class="w-96 hidden xl:block shadow-lg bg-white fixed right-0 top-0 bottom-0 overflow-y-auto">

      <!-- SHOW CART -->
      <div v-if="count > 0" class="flex flex-col h-full">
        <v-toolbar color="white">
          <v-toolbar-title>Bestellung</v-toolbar-title>
<!--          <v-spacer/>-->
<!--          <v-chip color="teal" text-color="white"> {{ pricef(price) }} </v-chip>-->
<!--          <v-divider class="ms-5 me-3" vertical/>-->
<!--          <v-icon icon="mdi-chevron-up" size="large" :class="{'rotate-180': sheet}"/>-->
        </v-toolbar>
        <div class="overflow-y-auto flex-1">
          <ui-order-element v-for="product in products" :key="product.name" :product="product"/>
          <div class="px-4 pt-4 border-t border-neutral-500/10 opacity-60"/>
        </div>
        <div class="mx-4 mb-4">
          <ui-order-dialog/>
        </div>
      </div>

      <!-- EMPTY CART -->
      <div class="h-full flex p-6 flex-col items-center justify-center" v-else>
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

const gastStore = useGastStore();
const sheet = ref(false);
const {
  count, products, price
} = storeToRefs(gastStore);

</script>

