<template>
  <h1>Dashboard</h1>
  <v-card>
    <v-card-title>Deine Restaurants</v-card-title>
    <v-card-text>
      <v-card v-for="i in []"/>
    </v-card-text>
  </v-card>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
</script>

