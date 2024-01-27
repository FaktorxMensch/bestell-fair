<script lang="ts" setup>
defineProps(['product'])
</script>

<template>
  <div class="order-element">
    <img class="aspect-square w-12" :src="'https://api.bestell-fair.de/storage/v1/object/public/'+product.image" alt="Product image"/>
    <div class="flex-1">
      <h2>{{ product.name }}</h2>
<!--      Show for all optionGroups the selected option-->
      <pre v-for="optionGroup in product.optionGroups" :key="optionGroup.name">
        <span class="">{{ optionGroup.name }}: </span>
<!--        foreach optionGroup.selected get optionGroup.options at that position and dispaly name of it-->
        <span v-for="selected in optionGroup.selected" :key="selected">
          <span class="">{{ optionGroup.options[selected].name }}</span>
        </span>
      </pre>
    </div>
    <v-spacer/>
    <div class="text-end rounded-md py-2 px-4 bg-neutral-700">{{ product.price }} €</div>
  </div>
</template>

<style scoped>
.order-element {
  @apply flex gap-2 items-center border-b border-neutral-700 p-4;

  img {
    @apply rounded-md;
  }

  h2 {
    @apply text-lg;
  }
}
</style>
