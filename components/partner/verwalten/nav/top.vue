<template>
  <v-app-bar app color="teal-darken-4" dark>
    <v-app-bar-nav-icon @click="drawer = !drawer"/>
    <v-toolbar-title>
      <div class="flex items-end gap-2">
        <h1 class="text-3xl">Bestell Fair!</h1>
      </div>
    </v-toolbar-title>
    <v-spacer/>

    <template v-slot:append>
      <v-select
          :items="[...restaurants, {id: 'CREATE', name: 'Neues Restaurant ...'}]"
          item-title="name"
          item-value="id"
          label="Restaurant"
          prepend-inner-icon="mdi-store"
          dense
          variant="solo"
          density="comfortable"
          @update:model-value="verwaltenStore.setRestaurant"
          :model-value="restaurant"
          class="me-1"
      />
      <v-btn target="_blank" :to="'/restaurant/'+restaurant.id" icon="mdi-share" v-if="restaurant?.id" class="me-5"/>
      <v-divider vertical/>
      <v-list-item
          lines="two"
          prepend-avatar="/partner/avatar.svg"
          @click=""
          :title="user.user_metadata.name"
          :subtitle="user.email"
      ></v-list-item>
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
const {restaurant, restaurants, drawer} = storeToRefs(verwaltenStore)
onMounted(verwaltenStore.init)
</script>
