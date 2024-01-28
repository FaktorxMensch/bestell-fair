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
          variant="flat"
          class="rounded-full"
          color="grey-lighten-3"
      />
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ productCopy.name }} ({{ productCopy.price }} €)</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-for="og in productCopy.optionGroups">
            {{ og.name }}
            <!--            <ui-options :options="og.options" :mandatory="og.mandatory" :multiple="og.multiple" :default="og.default" v-model="og.selected"/>-->
            <!--            <template>-->
            <v-row justify="space-around">
              <v-col cols="auto">

                <v-chip-group
                    :multiple="og.multiple"
                    :mandatory="og.mandatory"
                    selected-class="text-primary"
                    v-model="og.selected"
                >
                  <v-chip
                      v-for="option in og.options"
                      :key="option"
                  >
                    {{ option.name }} ({{ option.price }} €)
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
            <!--            </template>-->
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
const productCopy = ref(props.product)
const dialog = ref(false)
const toggle = () => dialog.value = !dialog.value
import {useGastStore} from "~/stores/gast.ts";

const gastStore = useGastStore()

const addToCart = () => {
  gastStore.addProduct(productCopy.value)
  toggle()
}
watch(dialog, (newValue) => {
  if (!newValue) return
  productCopy.value.optionGroups.forEach((og) => {
    console.log('og', og)
    og['selected'] = og.default
  })
})

</script>
