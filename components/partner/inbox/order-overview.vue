<script lang="ts" setup>
import {orderstatusToColor} from "~/composables/orderstatusToColor";

const inboxStore = useInboxStore()
const {order} = storeToRefs(inboxStore)


const updateOrder = async (status: string) => {
  await inboxStore.updateOrderStatus(order, order.status)
}

let closeInterval = null

watch(order, (order) => {
  if (order?.id && typeof document !== 'undefined') {
    document.addEventListener('keydown', handleKeyPress)
    closeInterval = setInterval(() => {
      Swal.fire({
            title: 'Bestellung wird geschlossen',
            timer: 10000,
            icon: 'info',
            timerProgressBar: true,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Schließen',
            cancelButtonText: 'Abbrechen',
            cancelButtonColor: '#3085d6',
            preConfirm: () => {
              // Aktionen für den "OK"-Button
              if (order?.id) {
                inboxStore.closeOrder()
              }},
            onCancel: () => {
              // Aktionen für den "Abbrechen"-Button
              // close swal
              Swal.close()
            },


          }
      )
    }, 60000)
  } else {
    document.removeEventListener('keydown', handleKeyPress)
    clearInterval(closeInterval)
  }
})

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    inboxStore.closeOrder()
  }
}

onMounted(() => {

})

</script>

<template>
  <div class="full-dialog" v-if="order?.id">
    <header>

      <v-slide-group>
        <v-btn-toggle
            class="w-full max-sm:flex-col"
            v-model="order.status"
            divided
            density="comfortable"
            variant="tonal"
            @click="inboxStore.updateOrderStatus(order, order.status); inboxStore.closeOrder()"
            mandatory
        >
          <v-slide-group-item>
            <v-btn value="Bestätigt"
                   :color="orderstatusToColor('Bestätigt')"
            >Bestätigt
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="In Zubereitung"
                   :color="orderstatusToColor('In Zubereitung')"
            >In Zubereitung
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Bereit zur Abholung"
                   :color="orderstatusToColor('Bereit zur Abholung')"
            >Bereit zur Abholung
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Abgeholt"
                   :color="orderstatusToColor('Abgeholt')"
            >Abgeholt</v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Storniert"
                   :color="orderstatusToColor('Storniert')"
            >Storniert</v-btn>
          </v-slide-group-item>
        </v-btn-toggle>
      </v-slide-group>
    </header>
    <main>
      <ui-order-element v-for="product in order?.products" :key="product.name" :product="product"/>
      <div class="flex justify-between p-4">
        <span class="text-lg">Gesamtsumme</span>
        <span class="text-lg">{{ pricef(order.total_price) }}</span>
      </div>

<!--      Area for showing information about how ordered and some meta infos like custom fields-->
      <div style="border-top: 3px solid rgb(115 115 115 / 0.1)">
<!--        Show all available information about who ordered-->
        <div class="flex flex-col p-4">
          <p class="text-md">Bestellt von {{ order?.name }}</p>
          <p>Anmerkungen: {{ order?.remark }}</p>
          <p>Telefon: {{ order?.phone }}</p>
          <p>Email: {{ order?.email }}</p>
        </div>

      </div>
<!--      Button for closing Order-->
        <v-btn @click="inboxStore.closeOrder()" class="bg-neutral-600">Bestellung schließen</v-btn>
    </main>
  </div>
</template>

<style scoped>
.v-theme--light {
  .full-dialog {
    @apply bg-white;
  }
}
.v-theme--dark {
  .full-dialog {
    @apply bg-neutral-900;
  }
}
.full-dialog {
  @apply fixed inset-0 z-50 mt-16 overflow-x-auto;

  header .v-btn {
    @apply flex-1 normal-case font-normal;
  }

  header {
    @apply px-4 pt-3 pb-2;
  }

  main {
    @apply pb-12 px-4;
  }

  footer {
    @apply fixed bottom-0 p-4 flex w-full;
  }
  .v-btn-group {
    @apply max-sm:flex max-sm:h-60;
  }
}
</style>
