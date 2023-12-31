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
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Fairdish</v-toolbar-title>
    </v-app-bar>
    <v-main class="flex">
      <v-row>
        <v-col cols="12" md="6">
          <img
              src="/partners/draw_authentication_fsn1.jpeg"
              class="h-full w-full bg-orange-400 object-cover"
          />
        </v-col>
        <v-col cols="12" md="6" class="flex flex-col justify-center">
          <v-form @submit.prevent="signInWithPassword" class="me-8 lg:px-8">
            <h1 class="text-4xl font-bold mb-8">Willkommen bei Fairdish Partner!</h1>
            <v-text-field autofocus="" variant="outlined" label="E-Mail" v-model="email" type="email"/>
            <v-text-field variant="outlined" label="Passwort" type="password" v-model="password"/>
            <v-btn size="large" variant="flat" color="primary" @click="signInWithPassword">Anmelden</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
