<script lang="ts" setup>
defineProps(['product'])
</script>

<template>
  <div class="posten">
<!--    <img class="aspect-square w-12" :src="products.gericht.bild_url"/>-->
    <div class="flex-1">
      <h2>{{ product.name }}</h2>
<!--      <span class="text-neutral-500">{{ products.kategorie }}</span>-->
    </div>
    <v-spacer/>
    <div class="text-end rounded-md py-2 px-4 bg-neutral-700">{{ product.price }} €</div>
  </div>
</template>

<style scoped>
.posten {
  @apply flex gap-2 items-center border-b border-neutral-700 p-4;

  img {
    @apply rounded-md;
  }

  h2 {
    @apply text-lg;
  }
}
</style>
