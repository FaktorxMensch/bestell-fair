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
              dark
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
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!--                  <v-btn-->
              <!--                      variant="text"-->
              <!--                      @click="dialog = false"-->
              <!--                  >-->
              <!--                    Save-->
              <!--                  </v-btn>-->
            </v-toolbar-items>
          </v-toolbar>
          add inputs for name phone and mail
          <v-card-text>
            <v-text-field
                v-model="name"
                label="Name"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="phone"
                label="Telefonnummer"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="mail"
                label="E-Mail"
                outlined
            ></v-text-field>
          </v-card-text>
          <footer>
            <v-btn size="large" color="teal" text rounded block v-bind="props" @click="placeOrder()">
              <v-icon left>mdi-cart</v-icon>
              <span class="font-semibold"> Bestellen ({{ price }} €)</span>
            </v-btn>

          </footer>
        </v-card>
      </v-dialog>
    </footer>
  </div>

</template>

<script setup>
import {useGastStore} from "~/stores/gast.ts";
import {price as pricef} from "~/composables/price";

const gastStore = useGastStore();
const sheet = ref(false);
const {count, price, products} = storeToRefs(gastStore);
const dialog = ref(false);

const name = ref('');
watch(name, (newVal) => {
  gastStore.setField('name', newVal);
});

const phone = ref('');
watch(phone, (newVal) => {
  gastStore.setField('phone', newVal);
});

const mail = ref('');
watch(mail, (newVal) => {
  gastStore.setField('mail', newVal);
});

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
  z-index: 1000;

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
