<template>
  <v-app id="partner-verwalten">
    <partner-verwalten-nav-top/>
    <partner-verwalten-nav-left/>
    <v-main>
      <div class="p-4">
        <slot/>
      </div>
    </v-main>
    <partner-verwalten-nav-footer/>
  </v-app>
</template>
<script setup lang="ts">
</script>
<style>
#partner-verwalten main.v-main {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 1) 100%
  ),  url('/partner/e.png');
  background-size: cover;
}
</style>
