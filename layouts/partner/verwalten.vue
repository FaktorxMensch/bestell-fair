<template>
  <v-app id="partner-verwalten">
    <partner-verwalten-nav-top/>
    <partner-verwalten-nav-left/>
    <v-main>
      <div class="p-4" v-if="restaurant">
        <slot/>
      </div>
    </v-main>
    <partner-verwalten-nav-footer/>
  </v-app>
</template>
<script setup>
const verwaltenStore = useVerwaltenStore()
const {restaurant} = storeToRefs(verwaltenStore)
</script>
<style>
#partner-verwalten main.v-main {
  background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 1) 100%
  ), url('/partner/e.png');
  background-size: cover;

  h1 {
    @apply text-3xl font-bold mb-2 mt-3;
  }

  .p-4 > .v-card, .p-4 > .v-row > div > .v-card {
    @apply rounded-none border border-solid border-gray-400;
  }
}
</style>
