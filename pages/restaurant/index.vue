<template>
  <h1>Alle Restaurants in Deiner Nähe</h1>
  <v-select label="Sortieren nach" :items="['Entfernung', 'Bewertung', 'Auslastung']" />
  <v-select label="Filtern nach" :items="['Entfernung', 'Bewertung', 'Auslastung']" />
  <hr/>
  <v-card v-for="i in []"/>
</template>
