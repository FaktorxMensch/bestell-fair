<script setup lang="ts">
const supabase = useSupabaseClient()
const name = ref('')
const email = ref('')
const password = ref('')
const password_repeat = ref('')

const signUp = async () => {
  const {data, error} = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value,
        role: 'partner',
      },
      emailRedirectTo: 'http://localhost:3000/confirm/?redirected=true&email=' + email.value,
    },
  })
  if (error) {
    await Swal.fire({
      title: 'Fehler',
      text: error,
      icon: 'error',
      confirmButtonText: 'OK',
    })
  } else {
    await Swal.fire({
      title: 'Erfolgreich registriert',
      text: 'Du hast dich erfolgreich registriert. Bitte bestätige deine E-Mail Adresse.',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    await supabase.auth.signOut()
    const router = useRouter()
    await router.push('/login')
  }
}
const accepted = ref(false)
definePageMeta({layout:'landing'})
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
        <v-form @submit.prevent="signUp" class="ms-8 me-16">
          <h1 class="text-4xl mb-4">Willkommen bei <span class="text-teal-900">Bestell Fair!</span></h1>
          <p class="text-lg mb-8">Registriere dich jetzt als Partner und profitiere von den Vorteilen.</p>
          <v-text-field rounded variant="outlined" label="Name" v-model="name"/>
          <v-text-field rounded autofocus="" variant="outlined" label="E-Mail" v-model="email" type="email"/>
          <v-text-field rounded variant="outlined" label="Passwort" type="password" v-model="password"
                        min-length="6"
                        :error-messages="password.length>1 && password.length<6 ? ['Passwort muss mindestens 6 Zeichen lang sein.'] : []"/>
          <v-text-field rounded variant="outlined" label="Passwort wiederholen" type="password"
                        v-model="password_repeat"
                        :error-messages="password !== password_repeat && password_repeat.length>1 ? ['Passwörter stimmen nicht überein.'] : []"/>
          <v-checkbox label="Ich akzeptiere die AGB und Datenschutzbestimmungen." v-model="accepted"/>
          <v-btn
              :disabled="!accepted || !email || !password || password !== password_repeat"
              rounded size="large" variant="flat" color="teal-darken-3" @click="signUp">Registrieren
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
