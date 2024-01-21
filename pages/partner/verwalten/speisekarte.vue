<template>
  <h1 class="text-3xl font-bold">Speisekarte</h1>
  <input type="file" @change="handleFileChange" accept="image/*"/>
</template>

<script setup>
definePageMeta({ layout: 'partner-verwalten' })
const { handleFileChange } = useFilehandler()
</script>
