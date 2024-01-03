<template>
  <v-layout>
    <v-app>
      <v-app-bar app>
        <v-toolbar-title>
          <nuxt-link to="/">
            <h1 class="text-4xl text-teal-900">Bestell Fair!</h1>
          </nuxt-link>
        </v-toolbar-title>
        <!-- have a btn here -->
        <v-spacer/>
        <div class="flex gap-2 mx-2 hidden md:flex">
          <v-btn rounded size="large" variant="flat" href="/login">Login</v-btn>
          <v-btn rounded size="large" variant="flat" color="teal-darken-3" href="/partner-werden">Jetzt Partner werden</v-btn>
        </div>
      </v-app-bar>

      <slot/>


      <!-- FOOTER -->
      <footer class="bg-gray-900 text-gray-100 py-8 px-4">
        <div class="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto space-y-6 md:space-y-0">
          <div class="flex flex-col gap-2 flex-1 w-full">
            <span class="text-xl font-bold">Bestell Fair!</span>
            <span class="text-sm">Faire Vorbestellung in der Dresdner Neustadt!</span>
            <span class="text-sm">Ein Projekt von <a target="_blank" href="https://faktorxmensch.com">Faktor&times;Mensch</a></span>
          </div>
          <v-spacer/>
          <div class="flex flex-col gap-2 flex-1 w-full">
            <span class="text-xl font-bold">Kontakt</span>
            <span class="text-sm">Telefon: <a href="tel:00491626899628">0162 68 99 628</a></span>
            <span class="text-sm">E-Mail: <a href="mailto:info@bestell-fair.de">info@bestell-fair.de</a></span>
          </div>
          <div class="flex flex-col gap-2 flex-1 w-full">
            <span class="text-xl font-bold">Rechtliches</span>
            <span class="text-sm"><a href="https://faktorxmensch.com/impressum">Impressum</a></span>
            <span class="text-sm"><a href="https://faktorxmensch.com/agb">AGB</a> / <a
                href="https://faktorxmensch.com/datenschutz">Datenschutz</a></span>
          </div>
        </div>
      </footer>
    </v-app>
  </v-layout>
</template>

<style>
@font-face {
  font-family: 'Abril Fatface';
  src: url('/fonts/AbrilFatface-Regular.ttf') format('truetype');
}

h1 {
  font-family: 'Abril Fatface', 'Times new roman';
  font-weight: 500;
}
</style>
<script setup lang="ts">
</script>
