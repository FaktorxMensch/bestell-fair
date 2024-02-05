<template>
  <v-card>
    <v-card-title>
      <h1>Link</h1>
    </v-card-title>
    <v-card-text>
      <v-text-field
          :model-value="`${url}?ref=url`"
          readonly
          variant="outlined"
          density="compact"
      />
      <p class="-mt-2">Du kannst diesen Link verwenden, um deine Gäste auf deine Bestellseite zu leiten.</p>
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-title>
      <h1>QR-Code</h1>
    </v-card-title>
    <v-card-text>

      <img :src="`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chld=L|0&chl=${url}?ref=qr`" alt="QR-Code"
           class="w-36 mt-1 mb-3"/>
      <p>Du kannst auch diesen QR-Code verwenden, um deine Gäste auf deine Bestellseite zu leiten.</p>
      <span class="w-64 text-gray-500 text-sm">Rechtsklick auf den QR-Code und "Bild speichern unter..." um ihn zu speichern.</span>
    </v-card-text>
  </v-card>

</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
const store = useVerwaltenStore()
const {restaurant} = storeToRefs(store)
const url = computed(() => {
  return `https://bestell-fair.de/restaurant/${restaurant.value.id}`
})
</script>
