<template>
  <v-dialog v-model="dialog" width="500" :persistent="loading">
    <template v-slot:activator="{ props }">
      <v-btn color="teal-darken-3" prepend-icon="mdi-account-plus" v-bind="props"> Neues Konto erstellen</v-btn>
    </template>
    <v-card>
      <v-card-title><h2 class="text-3xl mt-3">Neues Konto erstellen</h2></v-card-title>
      <v-card-subtitle>Mit diesem Konto kann Dein Personal Bestellungen annehmen.
      </v-card-subtitle>
      <v-form @submit.prevent="createAccount" class="flex flex-col gap-2 mx-4 mt-6">
        <v-text-field v-model="form.name" label="Name" required
                      :rules="[() => form.name.length >= 3 || 'Name muss mindestens 3 Zeichen lang sein']"
        ></v-text-field>
        <v-text-field v-model="form.email" label="E-Mail" required
                      :rules="[() => /.+@.+\..+/.test(form.email) || 'E-Mail ist ungültig']"
        ></v-text-field>
        <v-text-field v-model="form.password" label="Passwort" required type="password"
                      :rules="[() => form.password.length >= 8 || 'Passwort muss mindestens 8 Zeichen lang sein']"
        ></v-text-field>
        <v-text-field v-model="form.passwordConfirm" label="Passwort bestätigen" required
                      type="password"
                      :rules="[() => form.password === form.passwordConfirm || 'Passwörter stimmen nicht überein']"
        ></v-text-field>
        <v-alert type="error" v-if="errorMessage">{{ errorMessage }}</v-alert>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!loading" @click="dialog = false"> Abbrechen</v-btn>
        <v-btn :loading="loading" color="teal-darken-3" @click="createAccount"> Erstellen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const dialog = ref(false)
const form = ref({
  name: 'Foo Bar ' + Math.random(),
  email: 'fairdishtest' + Math.random() + '@gmail.com',
  password: 'SupabaseUs123',
  passwordConfirm: 'SupabaseUs123'
})
const supabase = useSupabaseClient()
const verwaltenStore = useVerwaltenStore()
const {restaurant} = storeToRefs(verwaltenStore)
const loading = ref(false)
const createAccount = async () => {
  loading.value = true
  if (form.value.password !== form.value.passwordConfirm) {
    error.value = "Passwörter stimmen nicht überein"
    return
  }

  // get the jwt from supaabse from the current user

  const {data, error} = await supabase.auth.getSession()
  console.log('jwt', data)

  const {data: {user, error: user_error}} = await supabase.auth.signUp(
      {
        email: form.value.email,
        password: form.value.password
      },
      {
        data: {
          name: form.value.name,
        }
      }
  )

  // now lets set the jwt again

  const {data: d2, error: e2} = supabase.auth.setSession(data.session)
  console.log('data', d2)


  console.log('data', user)
  if (user_error) {
    errorMessage.value = user_error.message
    Swal.fire({
      icon: 'error',
      title: 'Fehler beim Erstellen des Kontos',
      text: user_error.message
    })
    return
  }


  // now insert restaurant_has_personal
  const {data: restaurant_has_personal, error: insertError} = await supabase.from('restaurant_has_personal').insert({
    restaurant_id: restaurant.value.id,
    user_id: user.id,
    email_copy: form.value.email,
    name_copy: form.value.name
  })

  dialog.value = false
  form.value = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }
  await Swal.fire({
    icon: 'success',
    title: 'Erfolgreich',
    text: 'Das Konto wurde erfolgreich erstellt.'
  })

  loading.value = false
}
const errorMessage = ref("")
</script>
