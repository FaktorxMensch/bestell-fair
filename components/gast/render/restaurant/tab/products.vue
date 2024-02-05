<template>
  <div v-for="(products, category) in allProducts" :key="category">
    <h2 class="text-2xl font-bold mt-8 mb-4" v-if="category">{{ category }}</h2>
    <ui-product v-for="product in products" :product="product" :restaurant="restaurant" />
  </div>
  <div class="mb-16"/>
</template>
<script setup>
const props = defineProps(['restaurant'])

// KATEGORIEN
const unsortedProducts = ref(props.restaurant.products)

// schaue, ob es mehr als eine kategori in allen produkten gibt
const hasCategories = unsortedProducts.value.some(p => p.category)

// wenn es kategorien gibt, dann sortiere die produkte nach kategorien
const allProducts = computed(() => {
  if (hasCategories) {
    const categories = unsortedProducts.value.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    }, {})
    return categories
  } else {
    return { '': unsortedProducts.value }
  }
})
</script>
