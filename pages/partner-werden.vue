<template>
  <v-main class="flex">
    <v-row>
      <v-col cols="12" md="6" class="hidden md:flex">
        <img
            src="/partner/draw_partner_fs1.jpeg"
            class="h-full w-full bg-orange-400 object-cover"
        />
      </v-col>
      <v-col cols="12" md="6" class="flex flex-col justify-center py-12 my-4 lg:my-16 min-h-48">
        <div class="m-8">
          <h1 class="text-4xl my-4">Werde Partner bei <span class="text-teal-900">Bestell Fair!</span></h1>
          <template v-if="done">
            <p class="text-lg">Vielen Dank, wir melden uns bei Dir!</p>
            <p class="text-lg mb-8">Du hast noch Fragen oder Anregungen? Schreib uns!</p>
            <div class="flex text-xl font-bold flex-col gap-2 w-full">
              <h1 class="text-2xl"> Telefon:</h1>
              <a href="tel:00491626899628">0162 68 99 628</a>
              <h1 class="text-2xl mt-4"> E-Mail: </h1>
              <a href="mailto:info@bestell-fair.de">info@bestell-fair.de</a>
            </div>
<!--            <v-btn rounded size="large" class="mt-8" variant="flat" color="black" href="/"> &larr; Zurück zur Startseite </v-btn>-->
          </template>
          <template v-else>
            <landing-form-restaurant @done="done = true"/>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-main>
</template>
<script setup lang="ts">
const done = ref(false)
definePageMeta({layout:'landing'})
</script>
