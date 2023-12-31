<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const {error} = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      // Figure out baseurl
      emailRedirectTo: window.location.origin + '/confirm'
    }
  })
  if (error) console.log(error)
}
</script>
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Fairdish</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-btn @click="signInWithOtp">
        Sign In with E-Mail
      </v-btn>
      <v-text-field
          label="E-Mail"
          v-model="email"
          type="email"
      />
    </v-main>
  </v-app>
</template>
