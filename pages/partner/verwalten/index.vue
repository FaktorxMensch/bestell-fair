<template>
  <h1>Dashboard</h1>
  <div id="sidenav">
    <ul>
      <li>Speisekarte
        + Einsteluge
        + Zahlung
        + Accousts
        → Infororationeos
      </li>
    </ul>
  </div>
  <v-card class="w-full mt-4">
    <v-card-title>Deine Restaurants</v-card-title>
    <v-card-text>
      <v-list  subheader>
        <v-list-item v-for="i in [{ title : 'Restaurant 1' }, { title : 'Restaurant 2' }, { title : 'Restaurant 3' }]">
          <v-list-item-content>
            <v-list-item-title>Restaurant {{ i }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
</script>
