<template>
  <div :class="{'cart-wrapper': true, 'collapsed': !sheet}">
    <header @click="sheet = !sheet" class="flex w-full text-lg uppercase">
      <span class="font-semibold"> Bestellung </span>
      <v-spacer/>
      <v-chip color="teal" text-color="white">
        {{ totalPrice }}€
      </v-chip>
      <v-divider class="ms-5 me-3" vertical/>
      <v-icon icon="mdi-chevron-up" size="large" :class="{'rotate-180': sheet}"/>
    </header>
  </div>

</template>

<script setup>
const sheet = ref(false);
const cartQuantity = ref(0); // Ersetzen Sie dies durch die tatsächliche Warenkorbmenge
const totalPrice = ref(0); // Ersetzen Sie dies durch den tatsächlichen Gesamtpreis
</script>
<style scoped>
.cart-wrapper {
  @apply
  fixed bottom-0 left-0 right-0 z-50
  bg-teal-800 text-white
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
}
</style>
