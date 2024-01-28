<template>
  <ui-product v-for="product in restaurant.products" :product="product" :restaurant="restaurant" />
  <div class="mb-16"/>
</template>
<script setup>
const props = defineProps(['restaurant'])
</script>
