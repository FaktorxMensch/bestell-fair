<template>
  <div class="flex justify-between items-center mb-1">
    <v-chip color="teal" text-color="white" class="me-2">Neu</v-chip>
    <p class="text-gray-600">
      Verwalte hier die Konten deines Personals, mit denen Bestellungen angenommen werden
      können.
    </p>
    <v-spacer/>
    <partner-verwalten-dialog-personal/>
  </div>
  <v-card>
    <partner-verwalten-table-personal/>
  </v-card>
  <v-card>
    <partner-verwalten-form-personal/>
  </v-card>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
</script>

