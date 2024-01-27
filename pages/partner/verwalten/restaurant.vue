<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-3xl font-bold">
      Restaurant
    </h1>
    <v-btn text="Änderungen speichern"
           variant="flat"
           prepend-icon="mdi-content-save"
           color="teal"
           @click="verwaltenStore.saveRestaurant"/>
  </div>
    <partner-verwalten-form-restaurant />
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
const verwaltenStore = useVerwaltenStore()
</script>

