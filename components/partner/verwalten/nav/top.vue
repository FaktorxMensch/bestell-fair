<template>
  <v-app-bar app color="teal-darken-4" dark>
    <v-toolbar-title>
      <div class="flex items-end gap-2">
        <h1 class="text-3xl">Bestell Fair!</h1>
      </div>
    </v-toolbar-title>
    <v-spacer/>

    <template v-slot:append>
      <v-select
          v-model="restaurant"
          :items="restaurants"
          item-title="name"
          item-value="id"
          label="Restaurant"
          prepend-inner-icon="mdi-store"
          dense
          variant="solo"
          density="compact"
          @change="verwaltenStore.setRestaurant(restaurant)"
          class="me-5"
      />
      <v-divider vertical/>
      <v-list-item
          lines="two"
          prepend-avatar="/partner/login_avatar.jpeg"
          @click=""
          :title="user.user_metadata.name"
          :subtitle="user.email"
      ></v-list-item>
<!--      <v-divider vertical/>-->
      <v-btn icon="mdi-logout" @click="logout"/>
    </template>
  </v-app-bar>
</template>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const logout = async () => {
  await supabase.auth.signOut()
  const router = useRouter()
  await router.push('/login')
}
import {useVerwaltenStore} from '~/stores/verwalten'
const verwaltenStore = useVerwaltenStore()
const {restaurant, restaurants} = storeToRefs(verwaltenStore)
onMounted(verwaltenStore.init)
</script>
