<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-plus" variant="flat" class="rounded-full" color="grey-lighten-3"/>
    </template>
    <v-card>
      <v-card-title>
        {{ productCopy.name }}
        <!--        <v-btn icon="mdi-information-outline" @click="showInformation"/>-->
      </v-card-title>
      <v-list class="no-input-details">
        <v-list-item v-for="group in productCopy.optionGroups">
          <div class="font-semibold text-sm">{{ group.name}} <span v-if="!group.mandatory" style="color: red">*</span></div>

          <!-- CHECKBOXES -->
          <template v-if="group.multiple">
            <v-select
              multiple
              :items="group.options.map(({name},index) => ({name, index}))"
              v-model="group.selected"
              item-title="name"
              item-value="index"
              variant="outlined"
              :class="'optiongroup-'+group.name.replaceAll(' ', '').toLowerCase()"
            />
          </template>

          <!-- SELECT -->
          <template v-else>
            <v-select
              :items="group.options.map(({name},index) => ({name, index}))"
              v-model="group.selected"
              item-title="name"
              item-value="index"
              variant="outlined"
              :class="'optiongroup-'+group.name.replaceAll(' ', '').toLowerCase()"
            />
          </template>

          <!-- EXTRA INFO -->
          <span class="text-sm py-1 opacity-80 flex flex-wrap gap-1" v-if="group.selected !== null && group.selected !== undefined"
               v-for="selected in (typeof group.selected === 'object' ? group.selected.map(selected=>group.options[selected]) : [group.options[group.selected]])">
            <v-chip prepend-icon="mdi-plus" density="compact" v-if="selected.price">{{ pricef(selected.price) }}</v-chip>
<!--            <v-chip density="compact" color="purple" v-for="allergen in selected.allergens">{{ allergen }}</v-chip>-->
<!--            <v-chip density="compact" color="pink" v-for="allergen in selected.allergens">{{ allergen }}</v-chip>-->
<!--            <v-chip density="compact" color="blue" v-for="additive in selected.additives">{{ additive }}</v-chip>-->

            <ui-product-additional-info :product="selected"/>
          </span>

        </v-list-item>
      </v-list>
      <v-card-actions class="px-4 border-t">
        <v-btn icon="mdi-minus" @click="quantity--" :disabled="quantity <= 1" round/>
        <div class="font-semibold text-lg">{{ quantity }}</div>
        <v-btn icon="mdi-plus" @click="quantity++" :disabled="quantity >= 10" round/>
        <v-spacer></v-spacer>
        <v-btn
            color="teal-darken-4"
            variant="flat"
            prepend-icon="mdi-cart-plus"
            @click="addToCart"
        >
          {{ pricef(getProductTotalPrice(productCopy, quantity)) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>

const props = defineProps(['product'])
const productCopy = ref(JSON.parse(JSON.stringify(props.product)))
const dialog = ref(false)
const toggle = () => dialog.value = !dialog.value
import {useGastStore} from "~/stores/gast.ts";

const gastStore = useGastStore()
const quantity = ref(1)

const addToCart = () => {
  //Check if required optionGroups have a selected option
  let unselectedOption = false
  productCopy.value.optionGroups.forEach((og) => {
    // console.log('og: ', og)
    if (!og.mandatory && og.selected === undefined) {
      //SHow user that a required option is not selected
      document.getElementsByClassName('optiongroup-'+og.name.replaceAll(' ', '').toLowerCase())[0].style.border = '3px solid red'
      unselectedOption = true
    } else {
      document.getElementsByClassName('optiongroup-'+og.name.replaceAll(' ', '').toLowerCase())[0].style.border = 'none'
    }
  })
  if (unselectedOption) {
    return
  } else {
    console.log('productCopy.value', productCopy.value)
    gastStore.addProduct(productCopy.value, quantity.value)
    toggle()
  }
}
watch(dialog, (newValue) => {
  if (!newValue) return
  productCopy.value.optionGroups.forEach((og) => {
    console.log('og', og)
    og['selected'] = og.default
  })
})

</script>
