<script lang="ts" setup>
import {orderstatusToColor} from "~/composables/orderstatusToColor";

const inboxStore = useInboxStore()
const {orders} = storeToRefs(inboxStore)

const editOrderDialog = ref(false)
let selectedOrder : any = ref(null)

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
    await editOrder({item})
    return
  }
  inboxStore.openOrder(item)
}

const editOrder = async ({item})=> {
  if (editOrderDialog) {
    editOrderDialog.value = false
    await nextTick()
  }
  selectedOrder = item
  // selectedOrder.value = {
  //   name: item.name,
  //   pickup_at: item.pickup_at,
  //   status: item.status,
  //   products: item.products,
  //   total_price: item.total_price,
  // }
  editOrderDialog.value = true
}

const handleNewPickupAt = async (newPickupAt) => {
  // console.log('setNewPickupAt', newPickupAt)
  // editOrderDialog.value = false
  await inboxStore.updatePickupAt(selectedOrder, newPickupAt)
}
const handleChangeOrderStatus = async (status) => {
  await inboxStore.updateOrderStatus(selectedOrder, status)
  editOrderDialog.value = false
}

const search = ref("no")
const filterAll = (value, searchQuery, item) => {
  if(searchQuery == 'all') return true
  else if (item.columns.status == "Storniert" ||  item.columns.status == "Abgeholt") return false
  else return true
}
</script>

<template>
  <partner-inbox-dialog-confirm-order :dialog="editOrderDialog"
            :name="selectedOrder?.name"
            :pickup_at="selectedOrder?.pickup_at"
            :status="selectedOrder?.status"
            :products="selectedOrder?.products"
            @setNewPickupAt="handleNewPickupAt"
            @changeOrderStatus="handleChangeOrderStatus"
            :total_price="selectedOrder?.total_price"
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
        <td v-if="item.pickup_at !== null">{{ new Date(item.pickup_at).toLocaleTimeString('de-de', {hour: '2-digit', minute: '2-digit'})}}</td>
        <td v-else>offen</td>
<!--        Reduce price of all products to a sum-->
        <td>
          <v-chip :color="orderstatusToColor(item.status)">
          {{ item.status }}
          </v-chip>
        </td>
        <td>{{ item.products.length }}</td>
        <td>{{ item.name }}</td>
        <td class="text-end">{{ pricef(item.total_price) }}</td>
        <td class="flex gap-1.5 align-center justify-end py-1">
          <a :href="'tel: '+item.phone">
            <v-chip class="cursor-pointer" color="success" @click.stop>
              <v-icon icon="mdi-phone"/>
            </v-chip>
          </a>
            <v-chip class="cursor-pointer" color="warning" @click.stop title="Problem mit Bestellung melden">
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
</style>
