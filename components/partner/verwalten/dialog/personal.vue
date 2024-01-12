<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ props }">
      <v-btn color="teal-darken-3" prepend-icon="mdi-account-plus" flat v-bind="props"> Neues Konto erstellen</v-btn>
    </template>
    <v-card>
      <v-card-title> Neues Konto erstellen</v-card-title>
      <v-card-subtitle> Erstelle ein neues Konto für dein Personal mit dem Bestellungen angenommen werden können.
      </v-card-subtitle>
      <v-card-text>
        <v-form @submit.prevent="createAccount">
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
      </v-card-text>
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
    data: {
      name: form.value.name,
      role: 'personal',
      partner_id: user.value.id
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
