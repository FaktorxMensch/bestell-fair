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
        <div class="flex gap-2 mx-2 hidden md:flex">
          <v-spacer/>
          <v-btn rounded size="large" variant="flat"
                 prepend-icon="mdi-account-circle-outline"
                 href="/partner/verwalten" v-if="user && user.user_metadata.role === 'partner'">Mein Account
          </v-btn>
          <v-btn rounded size="large" variant="flat" href="/partner/inbox" v-else-if="user"
                  prepend-icon="mdi-list-status"
          >Bestellungen
          </v-btn>
          <v-btn rounded size="large" variant="flat" href="/login" v-else>Login</v-btn>
          <v-btn rounded size="large" variant="flat" href="/logout" color="teal-darken-3" v-if="user">Abmelden</v-btn>
          <v-btn rounded size="large" variant="flat" color="teal-darken-3" v-else href="/partner-werden">Jetzt Partner
            werden
          </v-btn>
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

</style>
<script setup lang="ts">
const user = useSupabaseUser()
</script>
