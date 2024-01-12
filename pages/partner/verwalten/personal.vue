<template>
  <v-card>
    <v-card-title>Persönliche Daten</v-card-title>
    <v-card-text>
      <v-card v-for="i in []"/>
    </v-card-text>
  </v-card>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
</script>

