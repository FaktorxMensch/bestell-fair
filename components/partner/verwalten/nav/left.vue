<template>
  <v-navigation-drawer
      theme="dark"
  >
    <v-list nav>
      <v-list-item v-for="item in items"
                   :to="`/partner/verwalten/${item.title.toLowerCase()}`"
                   :prepend-icon="item.icon" :key="item.title" :title="item.title"></v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>
<script setup>
const items = [
  {title: 'Dashboard', icon: 'mdi-view-dashboard'},
  {title: 'Photos', icon: 'mdi-image'},
  {title: 'About', icon: 'mdi-help-box'},
]
const drawer = ref(true)
</script>
