<script setup lang="ts">
const user = useSupabaseUser()
watch(user, () => {
  if (user.value) {
    return navigateTo('/login/?confirmed=true')
  }
}, { immediate: true })
</script>
<template>
  <div>Waiting for login...</div>
</template>
