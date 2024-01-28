<template>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
supabase.auth.signOut()
navigateTo('/login')
</script>
