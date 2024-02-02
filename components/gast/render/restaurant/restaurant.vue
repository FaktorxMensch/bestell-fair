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
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">{{ restaurant.name }}</h2>
          <v-btn icon="mdi-information-outline" @click="showRestaurantInfo"/>
        </div>
        <!--        <p class="text-sm">{{ restaurant.location }}</p>-->
        <p class="text-sm my-2">{{ restaurant.description }}</p>
      </div>

      <div class="px-2 py-1 bg-gray-100"
           style="box-shadow: inset 0px 20px 10px -20px rgba(0,0,0,0.2);">
        <div class="container">
          <component :is="tabs[activeTab].component" :restaurant="restaurant"/>
        </div>
      </div>
    </div>
    <v-navigation-drawer
        v-model="cartOpen"
        location="right"
        :temporary="false"
        width="400"
        elevation="10"
        v-if="  cache"

    >
      <!-- SHOW CART -->
      <div v-if="count > 0" class="flex flex-col h-full">
        <v-toolbar color="primary">
          <!--          <v-btn @click="cartOpen = false" icon="mdi-arrow-left"/>-->
          <v-toolbar-title>Bestellung</v-toolbar-title>
          <v-spacer/>
          <v-btn @click="cartOpen = false" icon="mdi-close"/>
        </v-toolbar>
        <div class="overflow-y-auto flex-1">
          <ui-order-element v-for="product in products" :key="product.name" :product="product"/>
          <div class="px-4 pt-4 border-t border-neutral-500/10 opacity-60"/>
        </div>
        <div class="mx-4 mb-2">
          <ui-order-dialog/>
        </div>
        <div class="mx-4 mb-4 text-center">
          <a @click="resetCart()">
            Warenkorb leeren
          </a>
        </div>
      </div>

      <!-- EMPTY CART -->
      <div class="h-full flex p-6 flex-col items-center justify-center" v-else>
        <v-icon size="40" icon="mdi-food"/>
        <h1 class="text-4xl font-semibold p-4">Leerer Teller</h1>
        <p class="px-6 text-gray-500 text-center">Fülle deinen Warenkorb mit leckeren Gerichten, Getränken und
          Desserts.</p>
        <v-btn @click="cartOpen = false" class="mt-4" color="primary" rounded>Ausblenden</v-btn>
        <div class="h-48"></div>
      </div>

    </v-navigation-drawer>
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
const {
  count, products, price,
  cartOpen
} = storeToRefs(gastStore);

const showRestaurantInfo = () => {
  const restaurant = props.restaurant
  // have a swal with .location, .email and .phone as well as showing buttons for calling, mailing them and google maps
  Swal.fire({
    html: `
      <img src="https://api.bestell-fair.de/storage/v1/object/public/restaurants/${restaurant.icon_image_url}" alt="Restaurant Feature Image" class="my-2 h-24 object-cover lg:h-32 mx-auto rounded-lg shadow-lg border mb-6 mt-4">
      <h2 class="text-2xl font-bold mb-1">${restaurant.name}</h2>
      <p>${restaurant.location}</p>
      <a class="btn mt-6" href="https://www.google.com/maps/search/?api=1&query=${restaurant.location}" target="_blank"><i class="mdi mdi-map-marker"></i> Google Maps</a>
      ${restaurant.contact_phone ? `<a class="btn" href="tel:${restaurant.contact_phone}"><i class="mdi mdi-phone"></i> ${restaurant.contact_phone}</a>` : ''}
    `,
    // ${restaurant.contact_email ? `<a class="btn" href="mailto:${restaurant.contact_email}"><i class="mdi mdi-email"></i> ${restaurant.contact_email}</a>` : ''}
    //no buttons
    showConfirmButton: false,
    // sho wclose
    showCloseButton: true,
  })

}
const resetCart = () => {
  Swal.fire({
    title: 'Warenkorb leeren?',
    text: 'Möchtest du wirklich alle Artikel aus dem Warenkorb entfernen?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ja, leeren',
    cancelButtonText: 'Nein, abbrechen'
  }).then((result) => {
    if (result.isConfirmed) {
      products.value = [];
    }
  })
}

</script>

