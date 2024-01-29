<template>
  <div class="h-full flex p-6 mt-24 flex-col items-center justify-center max-w-lg mx-auto text-center gap-2">
<!--        <v-icon size="80" icon="mdi-food"/>-->
    <img src="/landing/danke.jpeg" alt="Danke für deine Bestellung" class="w-72"/>
    <h1 class="text-4xl font-semibold -mt-3 px-4">Vielen Dank für deine Bestellung!</h1>
    <p class="px-6 text-gray-500 mt-3 text-center">Du erhältst in Kürze eine Bestellbestätigung per E-Mail,
      in der du deine Bestellung stornieren und deinen Bestellstatus verfolgen kannst.</p>
    <!--    <v-btn href="/" class="mt-4" color="black" prepend-icon="mdi-home" rounded variant="flat" size="large"> Startseite </v-btn>-->
    <div class="h-24"></div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'landing',
})
</script>
