<template>
  <v-navigation-drawer theme="dark">

    <!-- Profile picture and name -->


    <!-- Navigation Items -->
    <v-list class="h-full flex flex-col">
      <v-list-item v-for="item in items"
                   :to="`/partner/verwalten${item.to}`"
                   :prepend-icon="item.icon" :key="item.title" :title="item.title"></v-list-item>
      <v-spacer/>
      <!-- hilfe und kontakt sektion direkt im drawer mit telefonnummer und email -->
      <v-list-item prepend-icon="mdi-lifebuoy" base-color="amber"
                   href="mailto:info@bestell-fair.de" nav
                   target="_blank">
        <!-- mehrere zeilen text -->
        <v-list-item-content>
          <v-list-item-title>Fragen oder Probleme?</v-list-item-title>
          <v-list-item-subtitle>Wir helfen Dir gerne weiter.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>
<script setup>
const items = [
  {title: 'Übersicht', icon: 'mdi-view-dashboard', to: '/'},
  {title: 'Restaurant', icon: 'mdi-store', to: '/restaurant'},
  {title: 'Speisekarte', icon: 'mdi-food', to: '/speisekarte'},
  // {title: 'Personal', icon: 'mdi-account-group', to: '/personal'},
  {title: 'Einstellungen', icon: 'mdi-cog', to: '/einstellungen'},
]
const drawer = ref(true)
</script>
<style>
.v-navigation-drawer .v-list-item-title {
  @apply text-sm;
}
</style>
