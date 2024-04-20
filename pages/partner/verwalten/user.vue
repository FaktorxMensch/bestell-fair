<template>
  <v-card>
    <v-card-title>Konto bearbeiten</v-card-title>
    <v-card-text>
      <pre>
        {{ user }}
      </pre>
      <v-form>
        <v-text-field v-model="user.user_metadata.name" label="Name" required/>
        <v-text-field v-model="user.email" label="E-Mail" required/>
        <v-btn @click="updateUser">Speichern</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const updateUser = async () => {
  await supabase.auth.updateUser({
    email: user.value.email,
    data: {
      ...user.value.user_metadata,
      name: user.value.user_metadata.name,
    }
  })
}
</script>
