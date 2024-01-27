<script lang="ts" setup>
const inboxStore = useInboxStore()
const {order} = storeToRefs(inboxStore)


const updateOrder = (status: string) => {
  inboxStore.updateOrderStatus(order, status)
  inboxStore.closeOrder()
}


</script>

<template>
  <div class="full-dialog" v-if="order?.id">
    <header>

      <v-slide-group>
        <v-btn-toggle
            class="w-full"
            v-model="order.status"
            divided
            density="comfortable"
            variant="tonal"
            @click="updateOrder"
            mandatory
        >
          <v-slide-group-item>
            <v-btn value="Bestätigt">Bestätigt
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="In Zubereitung"
                   :color="order.status === 'In Zubereitung' ? 'blue' : 'default'"
            >In Zubereitung
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Bereit zur Abholung"
                   :color="order.status === 'Bereit zur Abholung' ? 'success' : 'default'"
            >Bereit zur Abholung
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Abgeholt">Abgeholt</v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Storniert"
                   :color="order.status === 'Storniert' ? 'error' : 'default'"
            >Storniert</v-btn>
          </v-slide-group-item>
        </v-btn-toggle>
      </v-slide-group>
    </header>
    <main>
      <ui-order-element v-for="product in order?.products" :key="product.name" :product="product"/>
      <div class="flex justify-between p-4">
        <span class="text-lg">Gesamtsumme</span>
        <span class="text-lg">{{ order?.products.reduce((sum, product) => sum + product.price, 0) }} EUR</span>
      </div>
<!--      Button for closing Order-->
        <v-btn @click="inboxStore.closeOrder()" class="bg-neutral-600">Bestellung schließen</v-btn>
    </main>
  </div>
</template>

<style scoped>
.full-dialog {
  @apply fixed inset-0 z-50 bg-neutral-800 mt-16 overflow-x-auto;

  header .v-btn {
    @apply flex-1 normal-case font-normal;
  }

  header {
    @apply px-4 pt-3 pb-2;
  }

  main {
    @apply pb-12;
  }

  footer {
    @apply fixed bottom-0 p-4 flex w-full;
  }
}
</style>
