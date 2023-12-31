<template>
  <v-app>
    <v-layout>
      <slot/>
    </v-layout>
  </v-app>
</template>

<style>
@font-face {
  font-family: 'Abril Fatface';
  src: url('/fonts/AbrilFatface-Regular.ttf') format('truetype');
}

h1 {
  font-family: 'Abril Fatface', 'Times new roman';
  font-weight: 500;
}
</style>
