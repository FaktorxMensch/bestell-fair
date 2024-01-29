<template>
  <div class="h-full flex p-6 mt-16 flex-col items-center justify-center max-w-lg mx-auto text-center gap-2">
    <v-icon size="80" icon="mdi-food"/>
    <h1 class="text-4xl font-semibold p-4">Vielen Dank für deine Bestellung!</h1>
    <p class="px-6 text-gray-500 text-center">Du erhältst in Kürze eine Bestellbestätigung per E-Mail,
      in der du deine Bestellung stornieren und deinen Bestellstatus verfolgen kannst.</p>
    <v-btn href="/" class="mt-4" color="black"
           prepend-icon="mdi-home"
           rounded variant="flat" size="large">
      Startseite
    </v-btn>
    <div class="h-32"></div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'landing',
})
</script>
