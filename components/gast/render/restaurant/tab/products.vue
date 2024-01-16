<template>
  <v-card>
    <v-card-title>Speisekarte</v-card-title>
    <v-list :items="productsDummy" item-props lines="three"/>
    <!--    <v-card-text class="flex flex-col gap-2 btns-text-left">-->
    <!--    </v-card-text>-->
  </v-card>
</template>
<script setup>
const orderStore = useOrderStore()
const props = defineProps(['restaurant'])
const productsDummy = computed(() => (props.restaurant.products || []).map(p => ({
  id: p.id,
  title: p.name,
  subtitle: p.description || 'Keine Beschreibung',
  prependAvatar: p.image_url || 'https://cuzkisufgqldigyzbkak.supabase.co/storage/v1/object/public/restaurants/888cbfda-139f-4165-81dc-1ed2883cdb0a/icon.jpeg',
  onclick: () => addProductToCart(p)
})))
const addProductToCart = productId => orderStore.addProduct(productId)
</script>
