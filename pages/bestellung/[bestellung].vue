<template>

  <v-card>
    <v-card-title>
      <div class="flex gap-4">
        <h1 class="text-3xl font-bold mb-2">Bestellung</h1>
        <v-chip
            :prepend-icon="orderstatusToIcon(order.status)"
            variant="flat" :color="orderstatusToColor(order.status)"> {{ order.status }}
        </v-chip>
      </div>
    </v-card-title>
    <v-card-text>

      <p> Bestellung {{ timeDiff(order.created_at) }}, Abholung {{ timeDiff(order.pickup_at) }}.</p>
      <p> Seite {{ refreshedDiff }} aktualisiert.</p>
      <v-btn @click="refresh"
             prepend-icon="mdi-refresh"
             class="my-4"
              :loading="loading"
             color="teal-darken-3"
      >Aktualisieren
      </v-btn>

      <v-list
          v-if="showProducts"
          :items="order.products.map((product) => ({ title: product.name, subtitle: product.price, prependAvatar: 'https://api.bestell-fair.de/storage/v1/object/public/' + product.image, }))"
          item-props lines="three"/>

      <p>
        Abholung bei {{ restaurant.location }}.
      </p>
      <p>
        Bezahlung bei Abholung, Summe {{ order.total_price }}€.
      </p>
    </v-card-text>
    <v-card-actions>
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
    .select('name, location, icon_image_url, contact_phone, contact_email')
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
