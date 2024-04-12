<template>
  <v-navigation-drawer theme="dark"
                       v-model="drawer">
    <!--    rail-->
    <!--    :rail-width="220"-->
    <v-list class="h-full flex flex-col">
      <v-list-item v-for="item in items"
                   :to="`${item.to}`"
                   :target="item.target"
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
  // {title: 'Übersicht', icon: 'mdi-view-dashboard', to: '/'},
  {title: 'Restaurant', icon: 'mdi-store', to: '/partner/verwalten/restaurant'},
  {title: 'Speisekarte', icon: 'mdi-food', to: '/partner/verwalten/speisekarte'},
  {title: 'Personal', icon: 'mdi-account-group', to: '/partner/verwalten/personal'},
  {title: 'Bestellungen', icon: 'mdi-cart', to: '/partner/inbox', target: '_blank'},
  {title: 'Einbindungscode', icon: 'mdi-qrcode', to: '/partner/verwalten/einbindungscode'},
  // {title: 'Import [BETA]', icon: 'mdi-import', to: '/partner/verwalten/import'},
  // {title: 'Einstellungen', icon: 'mdi-cog', to: '/einstellungen'},
]
const verwaltenStore = useVerwaltenStore()
const {drawer} = storeToRefs(verwaltenStore)
const route = useRoute()
watch(() => route.path, () => {
  verwaltenStore.setNav(items.filter(item => route.path.includes(item.to))[0])
}, {immediate: true})
</script>
<style>
.v-navigation-drawer .v-list-item-title {
  @apply text-sm;
}
</style>
