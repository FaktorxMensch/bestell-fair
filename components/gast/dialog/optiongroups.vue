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
        <span class="text-h5">{{ product.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-for="og in product.optionGroups">
            {{ og.name }}
            <ui-options :options="og.options" :mandatory="og.mandatory" :multiple="og.multiple" :default="og.default"/>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
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
<script setup lang="ts">
const props = defineProps(['product'])
const dialog = ref(false)
const toggle = () => dialog.value = !dialog.value
import {useGastStore} from "~/stores/gast.ts";
const gastStore = useGastStore()

const addToCart = () => {
  gastStore.addProduct(props.product)
  toggle()
}
</script>
