<script setup>
//use param restaurant from url
const route = useRoute()
// const restaurant = route.params.restaurant
const inboxStore = useInboxStore()
inboxStore.init()
//Get and set theme to local storage

const theme = ref(localStorage.getItem('theme') || 'dark')
watch(theme, (value) => {
  localStorage.setItem('theme', value)
})

function toggleTheme() {
  console.log('toggleTheme')
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// TODo: Need some param to check if orders are pending??
// ToDo: WHat to show in the table if no orders exist?

// LOGOUT / JWT EXPIRATION
const user = useSupabaseUser()
watch(user, (value) => {
  if (!value) {
    // nur wenn wir eine user id haben, sind wir eingeloogt und dürfen bleiben
    navigateTo('/login')
  }
}, {immediate: true})

// every 50 mimutes refreshSession()
const supabase = useSupabaseClient()
setInterval(async () => {
  const {data, error} = await supabase.auth.refreshSession()
  if (error) {
    console.error('Error refreshing session', error)
    await Swal.fire({
      title: 'Du wurdest ausgeloggt',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    navigateTo('/login')
    return
  }
  console.log('Session refreshed!', data)
}, 50 * 60 * 1000)

</script>
<template>
  <v-theme-provider :theme="theme">
    <v-app>
      <partner-inbox-actionbar :theme="theme" @toggleTheme="toggleTheme"/> <!-- :refresh="refresh"/>-->
      <v-main>
        <v-container fluid>
          <!--          <v-progress-linear v-if="data.pending" indeterminate/>-->
          <partner-inbox-orders-table/> <!-- v-else/> -->
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>
