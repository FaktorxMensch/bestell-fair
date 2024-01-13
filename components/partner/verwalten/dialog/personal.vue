<template>
  <v-dialog v-model="dialog" width="500">
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
        <v-btn @click="dialog = false"> Abbrechen</v-btn>
        <v-btn color="teal-darken-3" @click="createAccount"> Erstellen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const dialog = ref(false)
const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
})
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const createAccount = () => {
  if (form.value.password !== form.value.passwordConfirm) {
    error.value = "Passwörter stimmen nicht überein"
    return
  }
  supabase.auth.signUp({
    email: form.value.email,
    password: form.value.password,
    options: {
      data: {
        name: form.value.name,
        role: 'personal',
        partner_id: user.value.id
      }
    }
  }).then(async ({error}) => {
    if (error) {
      console.log(error)
      errorMessage.value = error.message
      return
    }
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
  })
}
const errorMessage = ref("")
</script>
