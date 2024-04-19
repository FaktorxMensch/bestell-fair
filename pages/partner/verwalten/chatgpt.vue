<template>
  <partner-verwalten-nav-header
      :is-new="true"
      subtitle="Bearbeite Dieses JSON mit ChatGPT und klicke dann auf Änderungen laden.">
    <v-spacer/>
    <v-btn @click="openChatgpt" append-icon="mdi-open-in-new" target="_blank"
           text="ChatGPT öffnen"/>
  </partner-verwalten-nav-header>
  <v-card>
    <v-card-title>
      Mit ChatGPT bearbeiten
    </v-card-title>
    <v-card-text>
      <v-textarea v-model="prompt" outlined dense
                  prepend-inner-icon="mdi-information"
                  rows="10"/>
      <v-textarea v-model="restaurantAsJSON" outlined dense rows="10"
                  prepend-inner-icon="mdi-message-text"
                  placeholder="JSON hier einfügen"/>
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
const prompt = ref(`Du hilfst beim Einpflegen von Restaurants in einen Bestellservice. Das Ausgabeformat ist ein riesen JSON String pro Restaurant.
Der User wird Dir vielleicht auch eine Menge Informationen irgendwo zufällig herkopieren. Versuche das auch in diesen Kontext zu parsen.
Du holst Dir vom User alle Infos ein, sofern er sie Dir nicht bereits gegeben hat.
Antworte auf keinen Fall, bevor Du nicht alle Informationen hast.
Insbesondere zu den Öffnungszeiten (0=Mo,1=Di,...) und der Speisekarte sowie allen Konfigurationsoptionen innerhalb der Speisekarte.
In diesem Fall gibt er Dir bereits ein JSON Schema von einem existierenden Restaurant, das Du anpassen sollst, ohne die Struktur zu verändern.

Wenn Du dir unsicher bist, frage den User nach mehr Informationen und weigere Dich zu antworten, bevor Du nicht alle Informationen hast.
Wenn Du zum Beispiel nicht weisst, wie das JSON Format an einer Stelle auszusehen hat, frage den User dass er dass bitte im GUI beispielhaft einträgt und dann erneut die Anfrage stellt.

Danach antwortest Du in folgendem validen JSON Schema:`)
const importRestaurant = async () => {
  try {
    const restaurant = JSON.parse(restaurantAsJSON.value)
    // setze das im Store ohne zu speichern und informiere dass der user jetzt alles durchchecken und dann bei den seiten speichern muss
    verwaltenStore.overwriteCurrentRestaurant(restaurant)

    await Swal.fire({
      title: 'Import erfolgreich',
      text: 'Die Änderungen wurden erfolgreich geladen. Bitte überprüfe die Änderungen und speichere sie. Falls du nicht zufrieden bist, kannst du die Änderungen verwerfen, indem du die Seite neu lädst.',
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

const openChatgpt = () => {
  window.open('https://chat.openai.com/?model=gpt-4', '_blank')
}
</script>
