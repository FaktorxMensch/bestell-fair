<template>
  <h1>Dashboard</h1>
  <div id="sidenav">
    <ul>
      <li>
        Hier kannst Du Dein Restaurant und Deine Speisekarte verwalten.
      </li>
    </ul>
    <div class="flex gap-2 btns-text-left mt-2">
      <v-btn to="/partner/verwalten/restaurant">Restaurant verwalten</v-btn>
      <v-btn to="/partner/verwalten/speisekarte">Speisekarte verwalten</v-btn>
    </div>
  </div>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
</script>
