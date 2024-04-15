<template>
  <v-navigation-drawer theme="dark"
                       width="240"
                       rail
                       expand-on-hover
                       v-model="drawer">
    <!--    rail-->
    <!--    :rail-width="220"-->
    <v-list class="h-full flex flex-col">
      <v-list-item v-for="item in items"
                   :to="`${item.to}`"
                   :append-icon="item.appendIcon"
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
let items = [
  // {title: 'Übersicht', icon: 'mdi-view-dashboard', to: '/'},
  {title: 'Restaurant', icon: 'mdi-home', to: '/partner/verwalten/restaurant', layout: true},
  {title: 'Speisekarte', icon: 'mdi-food', to: '/partner/verwalten/speisekarte', layout: false},
  {title: 'Personal', icon: 'mdi-account-group', to: '/partner/verwalten/personal', layout: true},
  {title: 'Einbinden', icon: 'mdi-code-tags', to: '/partner/verwalten/einbindungscode', layout: true},
  {
    title: 'Bestellungen', icon: 'mdi-inbox', to: '/partner/inbox', target: '_blank', layout: true,
    appendIcon: 'mdi-open-in-new'
  },
  // {title: 'Einstellungen', icon: 'mdi-cog', to: '/einstellungen'},
]
const user = useSupabaseUser()
// if email is @bestell-fair.de
if (user.value.email?.includes('@bestell-fair.de')) {
  // items.push({title: 'Import [BETA]', icon: 'mdi-import', to: '/partner/verwalten/import', layout: true})
}
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
