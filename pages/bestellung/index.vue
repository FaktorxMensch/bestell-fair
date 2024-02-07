<template>
  <v-app-bar scroll-threshold="1" scroll-behavior="hide">
    <v-app-bar-title>Bestellhistorie</v-app-bar-title>
    <v-spacer/>
    <v-btn to="/restaurant" icon="mdi-plus"/>
  </v-app-bar>
  <v-container>
    <v-text-field
        v-model="search"
        label="Suche"
        variant="outlined"
        hide-details
        prepend-inner-icon="mdi-magnify"
        autofocus
    />
    <v-card v-for="order in ordersHistory" :key="order.id" class="mb-2">
      <v-card-text>
        <v-row>
          <v-col cols="4" sm="2">
            <img
                class="h-20 w-20 rounded-lg border"
                :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/' + order.restaurant.icon_image_url"/>
          </v-col>
          <v-col cols="8" sm="10">
            <v-row>
              <v-col cols="12">
                <v-btn class="float-right" :icon="order.details ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                       @click="order.details = !order.details"/>
                <h3 class="text-lg font-bold">{{ order.restaurant.name }}</h3>
                <p>
                  {{ timeDiff(order.pickup_at) }}
                  &middot;
                  {{ pricef(order.total_price) }}
                </p>
              </v-col>
              <v-col cols="12" v-if="order.details">
                <ui-order-element
                    :product="product" v-for="product in order.products" :key="product.id"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-alert v-if="ordersHistory.length === 0" type="info" class="mt-5">
      Keine Bestellungen gefunden
      <v-btn to="/restaurant" color="primary" text>
        Jetzt bestellen
      </v-btn>
    </v-alert>
    <v-btn v-else @click="gastStore.clearOrdersHistory" color="grey" prepend-icon="mdi-delete">
      Bestellhistorie löschen
    </v-btn>
  </v-container>
</template>
<script setup>
// definePageMeta({layout: 'landing'})
const gastStore = useGastStore();
gastStore.loadOrdersHistory()
const {ordersHistory} = storeToRefs(gastStore)
const search = ref('')
</script>
