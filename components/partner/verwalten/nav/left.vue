<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <v-list-tile v-for="item in items" :key="item.title" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-footer app fixed>
    <span>&copy; 2017 <a href="https://faktorxmensch.com" target="_blank">Faktor&times;Mensch</a></span>
  </v-footer>
</template>
<script setup>
const items = [
  {title: 'Dashboard', icon: 'dashboard'},
  {title: 'Photos', icon: 'photo'},
  {title: 'About', icon: 'info'},
]
const drawer = ref(true)
</script>
