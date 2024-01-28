<template>
  <v-app-bar>
    <h1 class="text-3xl ps-2 font-bold">Deine Bestellung</h1>
    <v-spacer/>
    <v-btn @click="showProducts = !showProducts" icon>
      <v-icon>{{ showProducts ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>
  </v-app-bar>
  <v-card style="margin-top:-10px" class="max-w-2xl mx-auto">
    <img :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/' + restaurant.feature_image_url"
         class="flex-shrink-0 h-40 w-full object-cover border-b"/>
    <v-avatar class="ms-4 -mt-16 border-4 border-white " size="120">
      <img :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/' + restaurant.icon_image_url"/>
    </v-avatar>
    <v-card-text>

      <h2 class="text-2xl font-bold">{{ order.name }}</h2>

      <div class="flex justify-between">
        <p>Aufgegeben {{ timeDiff(order.created_at) }}, Abholung {{ timeDiff(order.pickup_at) }}.</p>
        <v-chip
            class="w-56 justify-center"
            :prepend-icon="orderstatusToIcon(order.status)" :color="orderstatusToColor(order.status)">
          {{ order.status }}
        </v-chip>
      </div>
      <v-btn @click="refresh"
             prepend-icon="mdi-refresh"
             class="my-4 w-full"
             :loading="loading"
             color="teal-darken-3"
      >Aktualisieren
      </v-btn>
      <p
          class="text-sm text-gray-500"
      > Seite {{ refreshedDiff }} aktualisiert.</p>

      <v-list
          v-if="showProducts"
          :items="order.products.map((product) => ({ title: product.name, subtitle: price(product.price), prependAvatar: 'https://api.bestell-fair.de/storage/v1/object/public/' + product.image, }))"
          class="divide-y border my-4 rounded"
          item-props lines="two"/>

      <p> Bezahlung bei Abholung, Summe {{ price(order.total_price) }}. </p>
      <p> Abholung bei {{ restaurant.name }}<br/>
        {{ restaurant.location }}. </p>
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
  <!--  <pre> {{ order }} {{ restaurant }} </pre>-->
</template>
<script setup>
const supabase = useSupabaseClient()
const {data: orders, error} = await supabase.rpc('get_order', {order_id: 'a11566da-2470-4870-81e4-dfc58a772c3d'});
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

const showProducts = ref(false)
const loading = ref(false)

const refresh = async () => {
  loading.value = true
  const {data: orders, error} = await supabase.rpc('get_order', {order_id: 'a11566da-2470-4870-81e4-dfc58a772c3d'});
  order.value = orders[0]
  refreshedAt.value = Date.now()
  // wait 400ms
  await new Promise(resolve => setTimeout(resolve, 200));
  loading.value = false
}
</script>
