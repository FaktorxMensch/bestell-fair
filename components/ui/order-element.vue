<script lang="ts" setup>
defineProps(['product', 'layout'])
</script>

<template>
  <div class="order-element">
    <img class="aspect-square w-12" :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+product.image" alt="Product image"/>
    <div class="flex-1" v-if="layout==='short'">
      <h2>
        {{ product.name }}
        (
      <span v-for="optionGroup in product.optionGroups" :key="optionGroup.name">
        <span class="">{{ optionGroup.name }}: </span>
<!--        foreach optionGroup.selected get optionGroup.options at that position and dispaly name of it-->
        <span v-for="selected in optionGroup.selected" :key="selected">
          <span class="">{{ optionGroup.options[selected].name }}</span>
        </span>
        ,
      </span>
        )
      </h2>
    </div>
    <div class="flex-1" v-else>
      <h2>{{ product.name }}</h2>
      <!--      Show for all optionGroups the selected option-->
      <div v-for="optionGroup in product.optionGroups" :key="optionGroup.name">
        <span class="">{{ optionGroup.name }}: </span>
        <span v-for="option in optionGroup.selected" :key="option">
          <span class="">{{ optionGroup.options[option].name }}</span>
        </span>
      </div>
    </div>
    <v-spacer/>
    <div class="text-end rounded-md py-2 px-4 bg-neutral-700">{{ product.total_price }} €</div>
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
