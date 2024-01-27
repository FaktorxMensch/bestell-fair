<script lang="ts" setup>
const inboxStore = useInboxStore()
const orders = inboxStore.orders
const {bestellung} = storeToRefs(inboxStore)
// console.log("Bestellung: ", bestellung)

const changeStaus = () => {
  // orders.closeBestellung()
  // orders.playClick()
}
</script>

<template>
  <div class="full-dialog" v-if="bestellung?.id">
    <header>

      <v-slide-group>
        <v-btn-toggle
            class="w-full"
            v-model="bestellung.status"
            divided
            density="comfortable"
            variant="tonal"
            @click="changeStaus"
            mandatory
        >
          <v-slide-group-item>
            <v-btn value="Erhalten">Erhalten
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Bearbeitung"
                   :color="bestellung.status === 'Bearbeitung' ? 'blue' : 'default'"
            >Bearbeitung
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Abholbereit"
                   :color="bestellung.status === 'Abholbereit' ? 'success' : 'default'"
            >Abholbereit
            </v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Abgeholt">Abgeholt</v-btn>
          </v-slide-group-item>
          <v-slide-group-item>
            <v-btn value="Storniert">Storniert</v-btn>
          </v-slide-group-item>
        </v-btn-toggle>
      </v-slide-group>
    </header>
    <main>
      <partner-inbox-bestellung-posten v-for="posten in bestellung.products" :key="posten.id" :posten="posten"/>
      <div class="flex justify-between p-4">
        <span class="text-lg">Gesamtsumme</span>
        <span class="text-lg">{{ bestellung?.summe }} EUR</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
.full-dialog {
  @apply fixed inset-0 z-50 bg-neutral-800 mt-16 overflow-x-auto;

  header .v-btn {
    @apply flex-1 normal-case font-normal;
  }

  header {
    @apply px-4 pt-3 pb-2;
  }

  main {
    @apply pb-12;
  }

  footer {
    @apply fixed bottom-0 p-4 flex w-full;
  }
}
</style>
