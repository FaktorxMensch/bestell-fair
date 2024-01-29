<template>
  <h1>DEPRECATED / REMOVED</h1>
<!--  <div class="xl:hidden">-->
<!--    <div :class="{'cart-wrapper ': true, 'collapsed': !sheet}" v-if="count > 0">-->
<!--      <header @click="sheet = !sheet" class="flex w-full text-lg uppercase">-->
<!--        <span class="font-semibold"> Bestellung </span>-->
<!--        <v-spacer/>-->
<!--        <v-chip color="teal" text-color="white">-->
<!--          {{ pricef(price) }}-->
<!--        </v-chip>-->
<!--        <v-divider class="ms-5 me-3" vertical/>-->
<!--        <v-icon icon="mdi-chevron-up" size="large" :class="{'rotate-180': sheet}"/>-->
<!--      </header>-->
<!--      <main>-->
<!--        <ui-order-element v-for="product in products" :key="product.name" :product="product"/>-->
<!--      </main>-->
<!--      <footer>-->
<!--        <ui-order-dialog/>-->
<!--      </footer>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import {useGastStore} from "~/stores/gast.ts";
import {pricef} from "~/composables/price";

const gastStore = useGastStore();
const sheet = ref(false);
const {
  count, products, price
} = storeToRefs(gastStore);
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
