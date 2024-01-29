<script lang="ts" setup>
const props = defineProps(['product', 'layout'])
// layout: short, normal

const optionGroups = computed(() => {
  return props.product.optionGroups.map((optionGroup) => {
    const multiple = typeof optionGroup.selected === 'object'
    return {
      name: optionGroup.name,
      multiple,
      selected: multiple ?
          optionGroup.selected.map((selected) => optionGroup.options[selected].name) :
          optionGroup.options[optionGroup.selected].name, // Single
    }
  })
})

const flattenedSelected = computed(() => {
  return optionGroups.value.map((optionGroup) => {
    return optionGroup.multiple ? optionGroup.selected.join(', ') : optionGroup.selected
  }).join(', ')
})
</script>

<template>
  <div class="order-element">
    <img class="aspect-square w-12"
         :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+product.image" alt="Product image"/>

    <div class="flex-1">
      <h2>{{ product.name }}</h2>
      <div class="optiongroups space-y-1" v-if="layout === 'normal'">
        <div class="mt-1" v-for="optionGroup in optionGroups" :key="optionGroup.name">
          <div class="text-sm">{{ optionGroup.name }}:</div>
          <div class="text-xs opacity-80">
            {{ optionGroup.multiple ? optionGroup.selected.join(', ') : optionGroup.selected }}
          </div>
        </div>
      </div>
      <div v-else class="text-xs opacity-80">
        {{ flattenedSelected}}
      </div>

    </div>
    <v-spacer/>
    <v-chip>{{ price(product.total_price) }}</v-chip>
  </div>
</template>

<style scoped>
.order-element {
  @apply flex gap-4 items-center border-t border-neutral-500/10 py-3 px-2;

  img {
    @apply rounded-md;
  }

  h2 {
    @apply text-lg;
  }
}
</style>
