<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn size="large" color="teal-darken-4" text rounded block v-bind="props">
        <v-icon left>mdi-cart</v-icon>
        <span class="font-semibold"> {{ count }} Artikel </span>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="teal-darken-4">
        <v-btn dark @click="dialog = false" icon="mdi-arrow-left"/>
        <v-toolbar-title>Bestellung abschließen</v-toolbar-title>
      </v-toolbar>

      <v-form class="container px-5 no-input-details flex flex-col gap-4">
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
        <v-text-field
            prepend-inner-icon="mdi-email-outline"
            type="text" v-model="email" label="Bestellbestätigung per E-Mail"
            variant="outlined"/>
        <p class="text-sm -mt-1 opacity-80 flex gap-2">
          <v-icon icon="mdi-information-outline"/>
          Du bekommst eine Bestellbestätigung per E-Mail mit einem Link, um deine Bestellung zu
          stornieren und deinen Bestellstatus zu verfolgen.
        </p>
        <hr/>
        <label>Anmerkungen</label>
        <v-textarea
            prepend-inner-icon="mdi-message-outline"
            v-model="remark" label="Möchtest du uns noch etwas mitteilen?" variant="outlined" rows="2"/>
        <hr/>
        <label>Abholzeitpunkt</label>
        <v-select v-model="pickup_at" :items="pickupTimes"
                  :prepend-inner-icon=" pickup_at ? 'mdi-clock-time-four-outline' : 'mdi-alert'"
                  clearable=""
                  :error="!pickup_at"
                  :label="pickup_at ? '' : 'Bitte wähle einen Abholzeitpunkt'"
                  variant="outlined"/>
        <v-btn size="x-large" class="mt-1 mb-5" color="teal-darken-4" rounded v-bind="props" @click="placeOrder"
               :loading="loading"
               prepend-icon="mdi-check">
          Fertig ({{ pricef(price) }})
        </v-btn>
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
