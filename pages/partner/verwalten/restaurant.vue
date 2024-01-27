<template>
  <div class="flex justify-between items-center mb-1">
    <p class="text-gray-600">Verwalte hier die Anzeige Deines Restaurants in der App.</p>
    <v-btn text="Änderungen speichern"
           variant="flat"
           prepend-icon="mdi-content-save"
           color="teal-darken-3"
           @click="verwaltenStore.saveRestaurant"/>
  </div>
  <partner-verwalten-form-restaurant/>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
const verwaltenStore = useVerwaltenStore()
</script>

