<template>

  <v-dialog
      v-model="dialog"
      fullscreen
      class="inset-0"
      :scrim="false"
      transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn size="large" color="teal" text rounded block v-bind="props">
        <v-icon left>mdi-cart</v-icon>
        <span class="font-semibold"> {{ count }} Artikel </span>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Bestellung abschließen</v-toolbar-title>
      </v-toolbar>

      <v-form class="px-5 no-input-details flex flex-col gap-4">
        <h2>Persönliche Daten</h2>
        <label>Dein Name</label>
        <v-text-field
            prepend-inner-icon="mdi-account-outline"
            type="text" v-model="name" label="Wer holt die Bestellung ab?" required variant="outlined"/>
        <label>Telefonnummer</label>
        <v-text-field
            prepend-inner-icon="mdi-phone-outline"
            type="text" v-model="phone" label="Für Rückfragen" required variant="outlined"/>
        <label>E-Mail</label>
        <v-text-field
            prepend-inner-icon="mdi-email-outline"
            type="text" v-model="mail" label="Bestellbestätigung per E-Mail"
            required variant="outlined"/>
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
        <v-select v-model="pickupTime" :items="pickupTimes"
                  :prepend-inner-icon=" pickupTime ? 'mdi-clock-time-four-outline' : 'mdi-alert'"
                  clearable=""
                  :error="!pickupTime"
                  :label="pickupTime ? '' : 'Bitte wähle einen Abholzeitpunkt'"
                  required variant="outlined"/>
        <v-btn size="large" class="mt-1" color="primary" rounded v-bind="props" @click="placeOrder()"
               prepend-icon="mdi-cart">
          Jetzt bestellen ({{ pricef(price) }})
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>

</template>
<script setup lang="ts">
import {price as pricef} from "~/composables/price";
const props = defineProps({
  pickupTime: String,
})

const pickupTime = ref(null)
const gastStore = useGastStore();
const {
  count, price, products, remark,
  name,
  phone,
  mail,
} = storeToRefs(gastStore);
const dialog = ref(false);

const placeOrder = () => {
  gastStore.placeOrder();
  dialog.value = false;
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
