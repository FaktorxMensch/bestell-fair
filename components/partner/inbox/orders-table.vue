<script lang="ts" setup>
import {orderstatusToColor} from "~/composables/orderstatusToColor";

const inboxStore = useInboxStore()
const {orders} = storeToRefs(inboxStore)

const confirmOrderDialog = ref(false)
let selectedOrder: any = ref(null)

const headers = [
  {title: 'Bestellzeit', value: 'created_at', sortable: true},
  {title: 'Abholzeit', value: 'pickup_at', sortable: true},
  {title: 'Status', value: 'status', sortable: true},
  {title: 'Produkte', value: '', sortable: true},
  {title: 'Gastname', value: 'name'},
  {title: 'Gesamtpreis', value: 'total_price', align: 'end'},
  {title: 'Aktionen', value: 'actions', sortable: false, align: 'center', width: '155px'},
]

const euro = (value: number) => {
  if (typeof value !== 'number') return value
  return value.toFixed(2).replace('.', ',')
}

const openOrder = async (item: any) => {
  // wenn status Neu, setze auf Erhalten
  if (item.status === 'Neu') {
    // item.status = 'Bestätigt'
    //ToDo: Open popup to confirm pickup time or change to new
    await confirmOrder(item)
    return
  }
  inboxStore.openOrder(item)
}

const confirmOrder = async (item) => {
  console.log('confirmOrder', item.id)
  selectedOrder.value = item
  // console.log('selectedOrder', selectedOrder)
  confirmOrderDialog.value = false
  await nextTick()
  confirmOrderDialog.value = true
  // console.log('confirmOrderDialog', confirmOrderDialog)
}

const handleNewPickupAt = async (newPickupAt) => {
  // console.log('setNewPickupAt', newPickupAt)
  // editOrderDialog.value = false
  console.log('selectedOrder', selectedOrder.value)
  await inboxStore.updatePickupAt(selectedOrder.value, newPickupAt)
}
const handleChangeOrderStatus = async (status) => {
  await inboxStore.updateOrderStatus(selectedOrder.value, status)
  confirmOrderDialog.value = false
}

const search = ref("no")
const filterAll = (value, searchQuery, item) => {
  if (searchQuery == 'all') return true
  else if (item.columns.status == "Storniert" || item.columns.status == "Abgeholt") return false
  else return true
}

// computed property, true if there is at least one order with status 'Neu'
const hasNewOrders = computed(() => {
  return orders.value.some((order) => order.status === 'Neu')
})

const showPhone = (phone) => {
  Swal.fire({
    title: 'Telefonnummer',
    text: phone,
    // icon: 'info',
    timer: 20000,
    timerProgressBar: true,
    showCancelButton: true,
    confirmButtonText: 'Schließen',
    cancelButtonText: 'Anrufen',
    reverseButtons: true,
    preConfirm: () => {
      // Aktionen für den "OK"-Button
    },
    cancelButtonColor: '#3085d6',
    onCancel: () => {
      // Aktionen für den "Anrufen"-Button
      window.open(`tel:${phone}`);
    }
  })
}
</script>

<template>
  <div class="has-new-orders" v-if="hasNewOrders">
    <!--    <v-alert dense outlined type="info" icon="mdi-information">-->
    <!--      Es gibt neue Bestellungen. Klicke auf eine Bestellung um sie zu bestätigen.-->
    <!--    </v-alert>-->
  </div>
  <partner-inbox-dialog-confirm-order :dialog="confirmOrderDialog"
                                      :order="selectedOrder"
                                      v-if="typeof selectedOrder?.id !== 'undefined' && confirmOrderDialog"
                                      @setNewPickupAt="handleNewPickupAt"
                                      @changeOrderStatus="handleChangeOrderStatus"
                                      prepend-icon="mdi-plus">
  </partner-inbox-dialog-confirm-order>
  <partner-inbox-order-overview/>
  <v-data-table :headers="headers"
                :items="orders"
                items-per-page="50"
                density="comfortable"
                item-key="name"
                :search="search"
                :custom-filter="filterAll"
                :sort-by="[{key: 'pickup_at', order: 'asc'}]">
    <template v-slot:footer.prepend>
      <v-switch v-model="search"
                label="Alle anzeigen"
                true-value="all"
                false-value="no">

      </v-switch>
    </template>
    <template v-slot:item="{ item }">
      <tr :class="item.status" @click="openOrder(item)" class="cursor-pointer">
        <td>{{ new Date(item.created_at).toLocaleTimeString('de-de', {hour: '2-digit', minute: '2-digit'}) }}</td>
        <td v-if="item.pickup_at !== null">{{
            new Date(item.pickup_at).toLocaleTimeString('de-de', {
              hour: '2-digit',
              minute: '2-digit'
            })
          }}
        </td>
        <td v-else>offen</td>
        <td>
          <v-chip :color="orderstatusToColor(item.status)">
            {{ item.status }}
          </v-chip>
        </td>
        <td>{{ item.products.reduce((acc, item) => acc + item.quantity, 0) }}</td>
        <td>{{ item.name }}</td>
        <td class="text-end">{{ pricef(item.total_price) }}</td>
        <td class="flex gap-1.5 align-center justify-end py-1">
          <v-chip class="cursor-pointer" color="success" @click.stop="showPhone(item.phone)">
            <v-icon icon="mdi-phone"/>
          </v-chip>
          <v-chip class="cursor-pointer"
                  @click.stop="confirmOrder(item)"
                  color="warning" title="Problem mit Bestellung melden">
            <v-icon icon="mdi-alert-circle-outline"/>
          </v-chip>
          <v-chip class="cursor-pointer"
                  color="error"
                  @click.stop="inboxStore.updateOrderStatus(item, 'Storniert')"
                  title="Stornieren">
            <v-icon icon="mdi-cancel"/>
          </v-chip>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style>
tr.Neu, .v-btn.Neu {
  animation: blinking 1s infinite;
}

tr.Erhalten {
  background: rgba(255, 255, 255, 0.1);
}

tr.Bearbeitung {
  background: #2E3F52;
  color: #4994EA;
}

tr.Abholbereit {
  background: #344432;
  color: #66AD5B;
}

tr.Storniert {
  text-decoration: line-through;
}

tr.Abgeholt, tr.Storniert {
  opacity: 0.4;
}

tr {
  transition-delay: 1.2s;
  transition: 0.4s cubic-bezier(0.175, 1.2, 0.32, 1.5);
}

@keyframes blinking {
  0% {
    background-color: #7770;
  }
  50% {
    background-color: #7773;
  }
  100% {
    background-color: #7770;
  }
}

.has-new-orders {
  animation: flashing 1s infinite;
  @apply fixed inset-0 z-50 bg-yellow-200 pointer-events-none;
}

@keyframes flashing {
  0% {
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
