<script setup>
const orders = useOrdersStore()
const bestellung = computed(() => orders.bestellung)
const cleanable = computed(() => orders.bestellungen.filter((b) => b.status === 'Storniert' || b.status === 'Abgeholt').length > 0)
defineProps(['refresh'])
</script>
<template>
  <v-app-bar density="compact">
    <template v-if="bestellung?.id" density="compact">
      <v-btn icon="mdi-chevron-left" @click="orders.closeBestellung()"/>
      <v-toolbar-title>Bestellung #{{ bestellung.id }}</v-toolbar-title>
      <v-btn :href="`tel:${bestellung.rufnummer}`" prepend-icon="mdi-phone">Anrufen</v-btn>
    </template>
    <template v-else>
      <v-toolbar-title>Übersicht</v-toolbar-title>
      <v-spacer/>

      <v-btn
          prepend-icon="mdi-broom"
          v-if="cleanable"
          @click="orders.clean"
          text-color="white">Aufräumen
      </v-btn>

      <v-btn
          prepend-icon="mdi-refresh"
          @click="refresh"
          text-color="white">Stand {{
          new Date(orders?.request_time).toLocaleTimeString('de-de', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
      </v-btn>
    </template>
  </v-app-bar>
</template>
