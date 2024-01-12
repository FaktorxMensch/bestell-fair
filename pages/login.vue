<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('domi@faktorxmensch.com')
const password = ref('')

const signInWithPassword = async () => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    const knownErrors = {
      'AuthApiError: Invalid login credentials': 'E-Mail oder Passwort falsch.',
      'AuthApiError: Email not confirmed': 'Bitte bestätige deine E-Mail Adresse zuerst.',
    }
    const message = knownErrors[error] || error.message
    await Swal.fire({
      title: 'Fehler',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    })
    error.value = message
  } else {
    const router = useRouter()
    router.push('/partner/verwalten')
  }
}

const user = useSupabaseUser()
watch(user, (newUser) => {
  if (newUser) {
    const router = useRouter()
    router.push('/partner/verwalten')
  }
})
const error = ref('')
</script>
<template>
  <v-main class="flex">
    <v-row>
      <v-col cols="12" md="6" class="hidden md:flex">
        <img
            src="/partner/draw_authentication_fs1.jpeg"
            class="h-full w-full bg-orange-400 object-cover"
        />
      </v-col>
      <v-col cols="12" md="6" class="flex flex-col justify-center py-12 mt-20 min-h-48">
        <v-form @submit.prevent="signInWithPassword" class="ms-8 me-16">
          <h1 class="text-4xl mb-8">Willkommen bei <span class="text-teal-900">Bestell Fair!</span></h1>
          <p class="text-lg mb-8">Melde dich in deinem Account an, um Dein Konto zu verwalten.</p>
          <v-alert type="error" v-if="error" class="mb-4">{{ error }}</v-alert>
          <v-text-field rounded autofocus="" variant="outlined" label="E-Mail" v-model="email" type="email"/>
          <v-text-field rounded variant="outlined" label="Passwort" type="password" v-model="password"/>
          <v-btn rounded size="large" type="submit" variant="flat" color="teal-darken-3" @click="signInWithPassword">Login</v-btn>
          <!-- register -->
          <v-btn rounded size="large" variant="plain" @click="$router.push('/register')" class="normal-case ms-2">
            Neu hier? Registrieren
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
