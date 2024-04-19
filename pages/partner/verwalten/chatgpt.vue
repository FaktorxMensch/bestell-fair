<template>
  <partner-verwalten-nav-header
      subtitle="Bearbeite Dieses JSON mit ChatGPT und klicke auf Änderungen laden.">

  </partner-verwalten-nav-header>
  <v-card>
    <v-card-title>
      Mit ChatGPT bearbeiten
    </v-card-title>
    <v-card-text>
      <v-textarea v-model="restaurantAsJSON" outlined dense rows="10"/>
      <v-btn text="Änderungen laden"
             variant="flat"
             prepend-icon="mdi-import"
             color="teal-darken-3"
             :disabled="!hasChanges"
             @click="importRestaurant"/>
    </v-card-text>
  </v-card>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
const verwaltenStore = useVerwaltenStore()
const restaurantAsJSON = ref(JSON.stringify(verwaltenStore.restaurant))
const importRestaurant = async () => {
  try {
    const restaurant = JSON.parse(restaurantAsJSON.value)
    // setze das im Store ohne zu speichern und informiere dass der user jetzt alles durchchecken und dann bei den seiten speichern muss
    verwaltenStore.overwriteCurrentRestaurant(restaurant)

    await Swal.fire({
      title: 'Import erfolgreich',
      text: 'Die Änderungen wurden erfolgreich geladen. Bitte überprüfe die Änderungen und speichere sie.',
      icon: 'success'
    })

  } catch (e) {
    await Swal.fire({
      title: 'Fehler beim Importieren',
      text: 'Bitte stelle sicher, dass der JSON-String valide ist. Fehler: ' + e.message,
      icon: 'error'
    })
  }
}
const hasChanges = computed(() => {
  return restaurantAsJSON.value !== JSON.stringify(verwaltenStore.restaurant)
})
</script>
