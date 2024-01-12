<template>
  <v-app-bar app color="teal-darken-4" dark>
    <v-toolbar-title>
      <div class="flex items-end gap-2">
        <h1 class="text-3xl">Bestell Fair!</h1>
        <!--        <span>Partner</span>-->
      </div>
    </v-toolbar-title>
    <v-spacer/>

    <template v-slot:append>
      <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          @click=""
          title="Mervat Otmar"
          subtitle="Fatima und die 9 Zwerge"
      ></v-list-item>
      <v-divider vertical/>
      <v-btn icon="mdi-logout" class="ms-3" @click="logout"/>
    </template>

  </v-app-bar>
</template>
<script setup>
const supabase = useSupabaseClient()
const logout = async () => {
  await supabase.auth.signOut()
  const router = useRouter()
  await router.push('/login')
}
</script>
