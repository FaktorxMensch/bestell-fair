<template>
    <partner-verwalten-nav-header subtitle="Verwalte hier die Anzeige Deines Restaurants in der App.">
      <v-btn text="Änderungen speichern"
             variant="flat"
             prepend-icon="mdi-content-save"
             color="teal-darken-3"
             :loading="loading"
             @click="saveRestaurant"/>
    </partner-verwalten-nav-header>
    <partner-verwalten-form-restaurant/>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
const verwaltenStore = useVerwaltenStore()

const loading = ref(false)
const saveRestaurant = async () => {
  loading.value = true
  await verwaltenStore.saveRestaurant(verwaltenStore.restaurant.value)
  loading.value = false
}
</script>

