<template>
  <div :class="{'cart-wrapper': true, 'collapsed': !sheet}" v-if="count > 0">
    <header @click="sheet = !sheet" class="flex w-full text-lg uppercase">
      <span class="font-semibold"> Bestellung </span>
      <v-spacer/>
      <v-chip color="teal" text-color="white">
        {{ price }}€
      </v-chip>
      <v-divider class="ms-5 me-3" vertical/>
      <v-icon icon="mdi-chevron-up" size="large" :class="{'rotate-180': sheet}"/>
    </header>
    <main>
      <li v-for="i in 1000">Lorem</li>
    </main>
    <footer>
      <v-btn size="large" color="teal" text rounded block>
        <v-icon left>mdi-cart</v-icon>
        <span class="font-semibold"> {{ count }} Artikel </span>
      </v-btn>
    </footer>
  </div>

</template>

<script setup>
const gastStore = useGastStore();
const sheet = ref(false);
const {count,price} = storeToRefs(gastStore);
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
