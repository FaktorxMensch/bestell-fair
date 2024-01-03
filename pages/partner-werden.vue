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
          <h1 class="text-4xl mb-4">Werde Partner bei <span class="text-teal-900">Bestell Fair!</span></h1>
          <p class="text-lg mb-8">Fülle das Formular aus und wir melden uns bei Dir.</p>

          <partner-form-restaurant/>
        </div>
      </v-col>
    </v-row>
  </v-main>
</template>
