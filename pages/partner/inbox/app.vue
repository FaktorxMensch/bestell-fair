<script setup>

const {
  data, refresh, loading, pending
} = await useLazyFetch('https://fatima-dresden.de/wp-content/plugins/fatima_api_status_plugin/api.php?api_key=ad31f2b0-8b7c-11eb-8dcd-0242ac17841741897830003')
setInterval(refresh, 1000 * 60 * 1)

const orders = useOrdersStore()
watch(data, (newValue) => {
  console.log('data changed', data.value.bestellungen)
  console.log('bestellungen changed')
  orders.request_time = data.value.request_time
  orders.bestellungen = data.value.bestellungen
  console.log('bestellungen updated', orders.bestellungen)
})

const {bestellungen, request_time} = storeToRefs(orders)
onMounted(refresh)
</script>
<template>
  <v-theme-provider theme="dark">
    <v-app>
      <ordersync-actionbar :refresh="refresh"/>
      <v-main v-if="data !== null">
        <v-progress-linear v-if="data.pending" indeterminate/>
        <ordersync-bestellungen-tabelle v-else/>
        <ordersync-notification-sound/>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>
