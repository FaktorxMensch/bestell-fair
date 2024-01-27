<script setup>
//use param restaurant from url
const route = useRoute()
// const restaurant = route.params.restaurant
const inboxStore = useInboxStore()

inboxStore.init() //Insert restaurant id here


// TODo: Need some param to check if orders are pending??
// ToDo: WHat to show in the table if no orders exist?

</script>
<template>
  <v-theme-provider theme="dark">
    <v-app>
<!--      <partner-inbox-actionbar :refresh="refresh"/>-->
      <v-main>
        <v-container fluid>
<!--          <v-progress-linear v-if="data.pending" indeterminate/>-->
          <partner-inbox-orders-table /> <!-- v-else/> -->
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>
