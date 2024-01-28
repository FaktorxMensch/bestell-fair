<template>
  <div :class="{'cart-wrapper': true, 'collapsed': !sheet}" v-if="count > 0">
    <header @click="sheet = !sheet" class="flex w-full text-lg uppercase">
      <span class="font-semibold"> Bestellung </span>
      <v-spacer/>
      <v-chip color="teal" text-color="white">
        {{ pricef(price) }}
      </v-chip>
      <v-divider class="ms-5 me-3" vertical/>
      <v-icon icon="mdi-chevron-up" size="large" :class="{'rotate-180': sheet}"/>
    </header>
    <main>
      <ui-order-element v-for="product in products" :key="product.name" :product="product"/>
    </main>
    <footer>
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
    </footer>
  </div>
</template>
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
<script setup>
import {useGastStore} from "~/stores/gast.ts";
import {price as pricef} from "~/composables/price";

const pickupTimes = Array.from({length: 10}, (_, i) => {
  // immer in 15 minuten slots. aber frühestens in 14 minuten aber im 15 minuten raster
  const date = new Date();
  date.setMinutes(date.getMinutes() + ((i + 2) * 15) - (date.getMinutes() % 15));
  return date.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
});

const gastStore = useGastStore();
const sheet = ref(false);
const {
  count, price, products, remark,
  name,
  phone,
  mail,
} = storeToRefs(gastStore);
const dialog = ref(false);
const pickupTime = ref(null)
//
// const name = ref('');
// watch(name, (newVal) => {
//   gastStore.setField('name', newVal);
// });
//
// const phone = ref('');
// watch(phone, (newVal) => {
//   gastStore.setField('phone', newVal);
// });
//
// const mail = ref('');
// watch(mail, (newVal) => {
//   gastStore.setField('mail', newVal);
// });

const placeOrder = () => {
  gastStore.placeOrder();
  dialog.value = false;
}
</script>
<style scoped>
.cart-wrapper {
  @apply
  fixed bottom-0 left-0 right-0 z-50
  bg-teal-800 text-white
  flex flex-col
  h-screen;
  transform: translateY(calc(100% - 64px));
  z-index: 2001;

  &:not(.collapsed) {
    transform: translateY(calc(-100vh + 100%));
  }

  &, .v-icon {
    @apply transition-all duration-300 ease-in-out;
  }

  header {
    @apply flex justify-between items-center cursor-pointer p-4;
  }

  main {
    @apply bg-gray-200 flex-1 overflow-y-auto text-black p-4;
  }

  footer {
    @apply p-4 fixed bottom-0 left-0 right-0;
    backdrop-filter: blur(10px);
  }
}
</style>
