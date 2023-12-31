<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const signInWithPassword = async () => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) console.log(error)
}
</script>
<template>
  <v-app-bar app>
    <v-toolbar-title>
      <h1 class="text-4xl text-teal-900">FairDish</h1>
    </v-toolbar-title>
  </v-app-bar>
  <v-main class="flex">
    <v-row>
      <v-col cols="12" md="6" class="hidden md:flex">
        <img
            src="/partner/draw_authentication_fs1.jpeg"
            class="h-full w-full bg-orange-400 object-cover"
        />
      </v-col>
      <v-col cols="12" md="6" class="flex flex-col justify-center min-h-48">
        <v-form @submit.prevent="signInWithPassword" class="ms-8 me-16">
          <h1 class="text-4xl mb-8">Willkommen bei <span class="text-teal-900">FairDish</span></h1>
          <v-text-field rounded autofocus="" variant="outlined" label="E-Mail" v-model="email" type="email"/>
          <v-text-field rounded variant="outlined" label="Passwort" type="password" v-model="password"/>
          <v-btn rounded size="large" variant="flat" color="teal-darken-3" @click="signInWithPassword">Anmelden
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-main>
</template>

<style>
.v-col-md-6 {
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.9) 90%, rgb(255, 255, 255) 100%), url('/partner/e.png');

}
</style>
