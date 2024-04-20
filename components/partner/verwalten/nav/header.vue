<template>
  <div class="flex justify-between items-center mb-1">
    <v-chip v-if="isNew" color="teal" text-color="white" class="me-2">Neu</v-chip>
    <p class="text-gray-600">{{ subtitle }}</p>
    <slot/>
  </div>
</template>
<script setup>
const props = defineProps({
  subtitle: String,
  isNew: Boolean,
})
</script>
