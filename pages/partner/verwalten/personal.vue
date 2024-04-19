<template>
  <partner-verwalten-nav-header
      subtitle=" Verwalte hier die Konten deines Personals, mit denen Bestellungen angenommen werden können. "
      :is-new="true">
    <v-spacer/>
    <partner-verwalten-dialog-personal/>
  </partner-verwalten-nav-header>
  <v-card>
    <partner-verwalten-table-personal/>
  </v-card>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
</script>

