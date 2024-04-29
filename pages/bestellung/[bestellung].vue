<template>
  <v-app-bar>
    <h1 class="text-3xl ps-2 font-bold">Deine Bestellung</h1>
    <v-spacer/>
    <v-btn :href="'tel:' + restaurant.contact_phone" icon="mdi-phone"
           variant="tonal"
           color="teal-darken-3"/>
  </v-app-bar>
  <v-card v-if="order" style="margin-top:-10px" class="max-w-2xl mx-auto">
    <img :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/' + restaurant.feature_image_url"
         class="flex-shrink-0 h-40 w-full object-cover border-b"/>

    <img
        class="h-20 w-20 rounded-lg border -mt-14 ml-4"
        :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/' + restaurant.icon_image_url"/>
    <v-card-text>

      <h2 class="text-2xl font-bold">{{ restaurant.name }}</h2>
      <div class="flex justify-between">
        <p>Bestellt für {{ order.name || 'Gast' }} aufgegeben {{ timeDiff(order.created_at) }}, Abholung
          {{ timeDiff(order.pickup_at) }} (um {{ order.pickup_at.substr(11, 5) }} Uhr).
          <!--          <v-icon :icon="orderstatusToIcon(order.status)" :color="orderstatusToColor(order.status)"/>-->
          Bestellung ist <span :class="orderstatusToClass(order.status)">{{ order.status }}</span>.
        </p>
      </div>

      <div class="notifications">
        <v-alert v-for="notification in order.notifications" :key="notification.id" :type="notification.type"
                 icon="mdi-information"
                 class="mt-2"
        >
          {{ notification }}
        </v-alert>
      </div>

      <!-- wenn bestellung neu, zeigen alert, dass die bestellung noch nicht bestätigt wurde -->
      <v-alert v-if="order.status === 'Neu'" type="warning" icon="mdi-information"
               class="mt-3">
        HINWEIS: Diese Bestellung wurde vom Restaurant noch nicht bestätigt. Bitte warte auf die Bestätigung.
      </v-alert>

      <v-btn @click="refresh"
             prepend-icon="mdi-refresh"
             class="mt-4 mb-2 w-full"
             size="large"
             :loading="loading"
             v-if="order.status !== 'Storniert'"
             color="teal-darken-3"
      >Aktualisieren
      </v-btn>
      <v-btn @click="stornieren"
             v-if="order.status === 'Neu'"
             color="grey" class="w-full" size="large" :loading="loading" prepend-icon="mdi-cancel">
        Stornieren
      </v-btn>

      <p class="text-sm mt-4 text-gray-500"> Seite {{ refreshedDiff }} aktualisiert.</p>

      <v-list
          v-if="showProducts"
          class="divide-y border my-4 rounded "
          :class="{'line-through': order.status === 'Storniert'}"
      >
        <v-list-item v-for="product in order.products">
          <div class="flex items-center gap-4">
            <img :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/' + product.image"
                 class="h-16 rounded-lg border"/>
            <v-list-item-content>
              <v-list-item-title>{{ product.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ product.quantity }}x {{ pricef(product.price) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list>

      <p v-if="order.status === 'Storniert'">
        Diese Bestellung wurde storniert, du kannst sie nicht mehr abholen.
        <a @click="undoStornieren" v-if="undoStornierungAvailable" class="text-teal-darken-3 cursor-pointer">Stornierung
          rückgängig machen</a>
      </p>
      <p v-else> Bezahlung bei Abholung, Summe {{ pricef(order.total_price) }}. Abholung bei {{ restaurant.name }}
        <div> {{ restaurant.location }}.</div>
      </p>

    </v-card-text>
    <v-card-actions class="flex justify-around">
      <v-btn :href="'tel:' + restaurant.contact_phone"
             prepend-icon="mdi-phone">Anrufen
      </v-btn>
      <v-btn :href="'https://maps.google.com/?q=' + restaurant.location"
             target="_blank"
             rel="noopener noreferrer"
             prepend-icon="mdi-map-marker">Anfahrt
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-alert v-else>Bestellung nicht gefunden.</v-alert>

  <div class="text-center mb-3">
    <v-btn :href="mailtolink"
           color="error"
           size="large"
           variant="flat"
           rounded
           class="my-3"
           prepend-icon="mdi-alert-circle-outline"
    >Problem oder Feedback zur Plattform?
    </v-btn>

    <p class="text-gray-500 text-sm">Ein Projekt unterstützt von <a href="https://faktorxmensch.com"
                                                                    class="text-gray-500 underline hover:text-gray-700"
                                                                    target="_blank" rel="noopener noreferrer">Faktor&times;Mensch</a></p>
    <!--    <gast-dialog-report :order="order.id"/>-->
  </div>
</template>
<script setup>
const mailtolink = computed(()=> {
  return `mailto:info@bestell-fair.de?subject=Problem oder Feedback zur Plattform&body=Hallo Bestell-Fair Team, meine Bestellung ist ${order.value.id} und ich habe folgendes Problem/Feedback: `
})
const supabase = useSupabaseClient()
const route = useRoute()
const {data: orders, error} = await supabase.rpc('get_order', {order_id: route.params.bestellung});
console.log(orders)
const order = ref(orders[0])
const {data: restaurant, error: restaurantError} = await supabase
    .from('restaurants')
    .select('name, location, icon_image_url,feature_image_url, contact_phone, contact_email')
    .eq('id', order.value.restaurant_id)
    .single()

import {timeDiff} from "~/composables/time";

const refreshedAt = ref(Date.now())
const refreshedDiff = ref('gerade')
setInterval(() => {
  refreshedDiff.value = 'vor ' + timeAgo(refreshedAt.value)
}, 100)

const showProducts = ref(!false)
const loading = ref(false)

const refresh = async () => {
  loading.value = true
  const {data: orders, error} = await supabase.rpc('get_order', {order_id: route.params.bestellung});
  order.value = orders[0]
  // unique notifications
  order.value.notifications = Array.from(new Set(order.value.notifications))
  // reverse
  order.value.notifications.reverse()

  // update the refreshedAt
  refreshedAt.value = Date.now()
  // wait 400ms
  await new Promise(resolve => setTimeout(resolve, 200));
  loading.value = false
}
import {orderstatusToClass, orderstatusToColor, orderstatusToIcon} from "~/composables/orderstatusToColor";

// for the next 2 hours we will refresh the order every 5 minutes
const refreshInterval = setInterval(refresh, 1000 * 6 * 5)
setTimeout(() => {
  clearInterval(refreshInterval)
}, 1000 * 60 * 60 * 2)


const stornieren = async () => {
  const {isConfirmed} = await Swal.fire({
    title: 'Bestellung stornieren?',
    text: 'Bist du sicher, dass du die Bestellung stornieren möchtest?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ja, stornieren!',
    cancelButtonText: 'Nein, weiter bestellen'
  })
  if (isConfirmed) {
    undoStornierungAvailable.value = true
    setTimeout(() => {
      undoStornierungAvailable.value = false
    }, 1000 * 60 * 5)
    const {data, error} = await supabase
        .from('orders')
        .update({status: 'Storniert'})
        .eq('id', order.value.id)
    if (error) {
      Swal.fire('Fehler', 'Die Bestellung konnte nicht storniert werden.', 'error')
    } else {
      order.value.status = 'Storniert'
      Swal.fire('Bestellung storniert', 'Die Bestellung wurde storniert.', 'success')
    }
  }
}

const undoStornierungAvailable = ref(false)
const undoStornieren = async () => {
  const {isConfirmed} = await Swal.fire({
    title: 'Stornierung rückgängig machen?',
    text: 'Bist du sicher, dass du die Stornierung rückgängig machen möchtest?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ja, rückgängig machen!',
    cancelButtonText: 'Nein, weiter bestellen'
  })
  if (isConfirmed) {
    const {data, error} = await supabase
        .from('orders')
        .update({status: 'Neu'})
        .eq('id', order.value.id)
    if (error) {
      Swal.fire('Fehler', 'Die Stornierung konnte nicht rückgängig gemacht werden.', 'error')
    } else {
      order.value.status = 'Neu'
      Swal.fire('Stornierung rückgängig gemacht', 'Die Stornierung wurde rückgängig gemacht.', 'success')
    }
  }
}

onMounted(() => {
  // 1x pro minute aktualisieren
  setInterval(refresh, 1000 * 60)
})
</script>
