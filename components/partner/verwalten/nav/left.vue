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
                   class="pl-4"
                   :href="mailtoHelp"
                   nav
                   target="_blank">
        <!-- mehrere zeilen text -->
        <v-list-item-content>
          <v-list-item-title>Frage oder Problem?</v-list-item-title>
          <v-list-item-subtitle>Wir helfen weiter</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  {{ user.value }}
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
  // items.push({title: 'Import', icon: 'mdi-import', to: '/partner/verwalten/import', layout: true})
  // show demo restaurants
  items.push({title: 'Demo', icon: 'mdi-test-tube', to: '/partner/verwalten/demo', layout: true})
}
const verwaltenStore = useVerwaltenStore()
const {drawer} = storeToRefs(verwaltenStore)
const route = useRoute()
watch(() => route.path, () => {
  verwaltenStore.setNav(items.filter(item => route.path.includes(item.to))[0])
}, {immediate: true})

console.log(user.value.user_metadata.name)
// mailto:info@bestell-fair.de with restaurent und beispiel subject und beispiel inhalt
const mailtoHelp = computed(() => `mailto:info@bestell-fair.de?subject=Frage%20oder%20Problem&body=Sehr%20geehrtes%20Bestell-Fair-Team,%0D%0A%0D%0AHier%20ist%20meine%20Frage%20oder%20mein%20Problem:%0D%0A%0D%0AMit%20freundlichen%20Grüßen,%0D%0A${user.value.user_metadata?.name}%0a%0aAktuelle%20Seite:%20${window.location.href}%0aRestaurant:%20${verwaltenStore.restaurant?.id}%0aUser:%20${user.value.id}`)
</script>
<style>
.v-navigation-drawer .v-list-item-title {
  @apply text-sm;
}
</style>
