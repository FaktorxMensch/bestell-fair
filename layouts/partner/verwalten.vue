<template>
  <v-app id="partner-verwalten">
    <partner-verwalten-nav-top/>
    <partner-verwalten-nav-left/>
    <v-main>
      <div class="p-4" v-if="restaurant" :key="restaurant">
        <h1 class="text-3xl font-bold">{{ nav?.title }}</h1>
        <slot/>
      </div>
    </v-main>
    <partner-verwalten-nav-footer/>
  </v-app>
</template>
<script setup>
const verwaltenStore = useVerwaltenStore()
const {restaurant, nav} = storeToRefs(verwaltenStore)
const title = defineProps(['title'])
const user = useSupabaseUser()
// check if the users role is partner
watch(user, () => {
  console.log('uservalue',user.value)
  if(user.value.user_metadata.role !== 'partner') {
    Swal.fire({
      title: 'Kein Zugriff',
      text: 'Du hast keine Berechtigung für diese Seite',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      // window.location.href = '/'
    })
  }
}, {immediate: true})
</script>
<style>
#partner-verwalten main.v-main {
  background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 1) 100%
  ), url('/partner/e.png');
  background-size: cover;

  h1 {
    @apply text-3xl font-bold mb-2 mt-3;
  }

  .p-4 > .v-card, .p-4 > .v-row > div > .v-card {
    @apply rounded-none border border-solid border-gray-400;
  }
}
</style>
