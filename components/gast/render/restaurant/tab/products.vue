<template>
  <ui-product v-for="product in restaurant.products" :product="product" :restaurant="restaurant" />
</template>
<script setup>
const props = defineProps(['restaurant'])

</script>
