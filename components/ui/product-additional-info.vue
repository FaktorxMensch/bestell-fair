<template>
<!--  <h2>Wichtige Informationen</h2>-->
  <span v-if="product.tags?.length>0">Produkt ist {{ product.tags.join(', ') }} &middot; </span>
  <span v-if="product.ingredients?.length>0">Zutaten: {{ product.ingredients.join(', ') }} &middot; </span>
  <span v-if="product.additives?.length>0">Zusatzstoffe: {{ product.additives.join(', ') }} &middot; </span>
  <span v-if="product.allergens?.length>0">Allergene: {{ product.allergens.join(', ') }}</span></template>
{{product}}
<script setup>
const props = defineProps(['product'])
</script>
