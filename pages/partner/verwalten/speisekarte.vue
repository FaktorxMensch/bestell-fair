<template>
  <h1 class="text-3xl font-bold">Speisekarte</h1>
  <!--  <input type="file" @change="handleFileChange" accept="image/*"/>-->
  <pre v-if="restaurant">
    {{ restaurant.products }}
  </pre>
</template>

<script setup>
definePageMeta({layout: 'partner-verwalten'})
// const { handleFileChange } = useFilehandler()

const verwaltenStore = useVerwaltenStore()
const {restaurant} = storeToRefs(verwaltenStore)
</script>

