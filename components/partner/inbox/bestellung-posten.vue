<script lang="ts" setup>
defineProps(['posten'])
</script>

<template>
  <div class="posten">
    <img class="aspect-square w-12" :src="posten.gericht.bild_url"/>
    <div class="flex-1">
      <h2>{{ posten.gericht.name }}</h2>
      <span class="text-neutral-500">{{ posten.gericht.kategorie }}</span>
    </div>
    <v-spacer/>
    <div class="text-end rounded-md py-2 px-4 bg-neutral-700">{{ posten.menge }}&times;</div>
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
