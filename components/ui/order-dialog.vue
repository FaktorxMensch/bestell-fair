<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      class=" max-h-screen overflow-y-auto "
  >
    <template v-slot:activator="{ props }">
      <v-btn size="large" color="teal-darken-4" text rounded block v-bind="props">
        <v-icon left>mdi-cart</v-icon>
        <span class="font-semibold"> {{ count }} Artikel </span>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="teal-darken-4">
        <v-btn color="white" @click="dialog = false" icon="mdi-arrow-left"/>
        <v-toolbar-title>Bestellung abschließen</v-toolbar-title>
      </v-toolbar>

      <v-form class="container px-5 no-input-dtails flex flex-col gap-4
      ">
        <div class="
        space-y-2
      ">
          <h2>Persönliche Daten</h2>
          <label>Dein Name</label>
          <v-text-field
              prepend-inner-icon="mdi-account-outline"
              type="text" v-model="name" label="Wer holt die Bestellung ab?" variant="outlined"/>
          <label>Telefonnummer</label>
          <v-text-field
              prepend-inner-icon="mdi-phone-outline"
              type="text" v-model="phone" label="Für Rückfragen" variant="outlined"/>

          <label>E-Mail</label>
          <div class="no-input-details">
            <v-text-field
                prepend-inner-icon="mdi-email-outline"
                type="text" v-model="email" label="E-Mail"
                variant="outlined"/>

            <v-checkbox class="-ml-2 mt-1" v-model="receive_email_updates"
                        label="Updates zu dieser Bestellung per E-Mail erhalten"/>
          </div>
          <div class="mb-5">
            <p class="text-sm opacity-80 flex gap-2" v-if="receive_email_updates">
              <v-icon icon="mdi-information-outline"/>
              Du bekommst eine Bestellbestätigung per E-Mail, sowie Bestellstatus-Updates.
            </p>
            <p class="text-sm opacity-80 flex gap-2" v-else>
              <v-icon icon="mdi-information-outline"/>
              Du wirst auf eine Seite weitergeleitet, auf der Du den aktuellen Status Deiner Bestellung siehst.
            </p>
          </div>

          <hr/>
          <div class="h-1"></div>
          <label>Anmerkungen</label>
          <v-textarea
              prepend-inner-icon="mdi-message-outline"
              v-model="remark" label="Möchtest du uns noch etwas mitteilen?" variant="outlined" rows="2"/>
          <hr/>
          <label>Abholzeitpunkt</label>
          <v-select v-model="pickup_at" :items="pickupTimes"
                    :prepend-inner-icon=" pickup_at ? 'mdi-clock-time-four-outline' : 'mdi-alert'"
                    clearable
                    :error="!pickup_at"
                    :label="pickup_at ? '' : 'Bitte wähle einen Abholzeitpunkt'"
                    variant="outlined"/>
          <v-btn size="x-large" class="mt-1 mb-5 w-full" color="teal-darken-4" rounded v-bind="props"
                 @click="placeOrder"
                 :loading="loading"
                 prepend-icon="mdi-check">
            Fertig ({{ pricef(price) }})
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>

</template>
<script setup lang="ts">
import {pricef} from "~/composables/price";

const props = defineProps({
  pickupTime: String,
})

const loading = ref(false);

const gastStore = useGastStore();
const {
  count, price, products, remark,
  name,
  phone,
  email,
  receive_email_updates,
  pickup_at
} = storeToRefs(gastStore);
const dialog = ref(false);


const placeOrder = async () => {

  loading.value = true;

  // wir brauchen name und pickup_at auf jeden fall sowie eine rückrufnummer, ansonsten Swal fehler
  if (name.value == '' || phone.value == '' || pickup_at.value == null) {
    alert('Bitte fülle alle Felder aus')
  } else {
    await gastStore.placeOrder();
    dialog.value = false;
  }

  loading.value = false;
}
const pickupTimes = Array.from({length: 10}, (_, i) => {
  // immer in 15 minuten slots. aber frühestens in 14 minuten aber im 15 minuten raster
  const date = new Date();
  date.setMinutes(date.getMinutes() + ((i + 2) * 15) - (date.getMinutes() % 15));
  return date.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
});
</script>
<style scoped>
.v-form {
  h2 {
    @apply text-2xl font-semibold mt-4
  }

  label {
    @apply text-sm font-semibold -mb-2 mt-1
  }
}
</style>
