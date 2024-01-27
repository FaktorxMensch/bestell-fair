<template>

  <v-dialog
      v-model="dialog"
      persistent
      width="1024"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
          :icon="'mdi-cart-plus'"
      />
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ productCopy.name }} ({{productCopy.price}} €)</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-for="og in productCopy.optionGroups">
            {{ og.name }}
            <ui-options :options="og.options" :mandatory="og.mandatory" :multiple="og.multiple" :default="og.default" v-model="og.selected"/>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="secondary"
            @click="dialog = false"
        >
          Abbrechen
        </v-btn>
        <v-btn
            color="primary"
            prepend-icon="mdi-cart-plus"
            @click="addToCart"
        >
          In den Warenkorb
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const props = defineProps(['product'])
const dialog = ref(false)
const productCopy = ref(props.product)
//watch productCOpy deep
watch(productCopy, (newVal) => {
  console.log(newVal)
}, {deep: true})
const toggle = () => dialog.value = !dialog.value
const orderStore = useOrderStore()
const addToCart = () => {
  orderStore.addProduct(productCopy.value)
  toggle()
}
</script>
