<template>
  <div class="flex items-end">
    <div>
      <h1 class="text-3xl font-bold">Personal</h1>
      <p class="text-gray-500">
        <v-chip color="teal" text-color="white">Neu</v-chip>
        Verwalte hier die Konten deines Personals, mit denen Bestellungen angenommen werden
        können.
      </p>
    </div>
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

