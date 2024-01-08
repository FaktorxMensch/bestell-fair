<template>
  <v-navigation-drawer
      theme="dark"
  >
    <v-list nav>
      <v-list-item prepend-icon="mdi-email" title="Inbox" value="inbox"></v-list-item>
      <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Supervisors" value="supervisors"></v-list-item>
      <v-list-item prepend-icon="mdi-clock-start" title="Clock-in" value="clockin"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>

      <v-divider></v-divider>

      <v-spacer/>
      <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Supervisors" value="supervisors"></v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>
<script setup>
const items = [
  {title: 'Dashboard', icon: 'dashboard'},
  {title: 'Photos', icon: 'photo'},
  {title: 'About', icon: 'info'},
]
const drawer = ref(true)
</script>
