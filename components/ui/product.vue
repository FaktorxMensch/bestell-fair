<template>
  <v-card>
    <v-card-title>
      <v-card-actions>
        {{ product.name }}
        <v-spacer></v-spacer>

        <v-btn
            v-if="typeof product.optionGroups == 'undefined' || product.optionGroups.length === 0"
            :icon="'mdi-cart'"
            @click="addToCart"/>
        <gast-dialog-optiongroups v-else :product="product"/>
      </v-card-actions>
    </v-card-title>

    <v-card-subtitle>{{ product.description }}</v-card-subtitle>

    <v-card-text class="flex flex-col gap-2 btns-text-left">
      Preis: {{ product.price }} Euro
    </v-card-text>
    <v-card-actions>

      <v-spacer></v-spacer>

      <v-btn
          :icon="showAdditionalInfo ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showAdditionalInfo = !showAdditionalInfo"/>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showAdditionalInfo">
        <v-divider></v-divider>

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
