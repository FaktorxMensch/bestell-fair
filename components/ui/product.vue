<template>
  <v-card>
    <v-card-text>
      <div class="flex space-between">
        <div>
          <h2 class="text-lg font-semibold">
            {{ product.name }}
          </h2>
          <p class="text-gray-500 min-h-8">{{ product.description }}</p>
        </div>
        <v-spacer></v-spacer>
        <v-btn
            v-if="typeof product.optionGroups == 'undefined' || product.optionGroups.length === 0"
            :icon="'mdi-cart'"
            variant="flat"
            color="grey-lighten-3"
            @click="addToCart"/>
        <gast-dialog-optiongroups v-else :product="product"/>
      </div>
      <p class="font-bold mt-2"> {{ price(product.price) }}
        <v-btn size="small" class="float-right -mt-4 mb-2"
               variant="text"
               :icon="showAdditionalInfo ? 'mdi-chevron-up' : 'mdi-information-outline'"
               @click="showAdditionalInfo = !showAdditionalInfo"/>
      </p>
    </v-card-text>

    <v-expand-transition>
      <div v-show="showAdditionalInfo">
        <v-card-text>
          <h2>Allergene und Zusatzstoffe</h2>
          <p>Die folgenden Allergene und Zusatzstoffe sind in diesem Produkt enthalten:</p>
          <ul>
            <li v-for="allergen in product.allergens">{{ allergen }}</li>
          </ul>
          <ul>
            <li v-for="additive in product.additives">{{ additive }}</li>
          </ul>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script setup>
import {useGastStore} from "~/stores/gast.ts";

const props = defineProps(['restaurant', 'product'])
const showAdditionalInfo = ref(false)
const gastStore = useGastStore()
const addToCart = () => gastStore.addProduct(props.product)
</script>
