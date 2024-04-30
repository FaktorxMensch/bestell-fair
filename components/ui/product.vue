<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="flex space-between gap-2 md:gap-8">
        <div class="flex-1">
          <h2 class="text-xl font-bold">
            {{ product.name }}
          </h2>
          <p class="text-gray-500 min-h-8 my-2">{{ product.description }}</p>
          <p class="text-gray-500" v-if="product.optionGroups?.length>0">Wahl aus:
            {{ getWahlAusText(product.optionGroups) }}</p>


        </div>
        <div class="flex flex-col justify-between items-end">
          <div class="absolute right-3">
            <v-btn
                v-if="typeof product.optionGroups == 'undefined' || product.optionGroups.length === 0"
                icon="mdi-plus"
                variant="flat"
                class="rounded-full"
                color="grey-lighten-3"
                @click="addToCart"/>
            <gast-dialog-optiongroups v-else :product="product"/>
          </div>

          <v-spacer/>
          <img :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+product.image"
               v-if="product.image"
               class="w-28 lg:w-32 mt-4 rounded-md"/>
          <v-spacer/>
        </div>
      </div>

      <p class="font-bold text-lg mt-2"> {{ pricef(product.price) }}
        <v-btn size="small" class="float-right -mt-4 mb-2"
               variant="text"
               v-if="hasAdditionalInfo(product)"
               :icon="showAdditionalInfo ? 'mdi-chevron-up' : 'mdi-information-outline'"
               @click="showAdditionalInfo = !showAdditionalInfo"/>
      </p>
    </v-card-text>

    <v-expand-transition>
      <div v-show="showAdditionalInfo">
        <v-card-text>
          <ui-product-additional-info :product="product"/>
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


// von allen optiongroups die ausgewählten optionen holen und die ersten 4 nehmen 'und mehr ...' oder halt die ersten 3
const getWahlAusText = (optionGroups) => {
  // aus allen option groups alle möglichen optionen den name hole
  const options = optionGroups.flatMap(og => og.options.map(o => o.name))
  // und jetzt die ersten 4 nehmen bzw und mehr wenn es mehr als 4 sind
  const first4 = options.slice(0, 4)

  return first4.join(', ') + (options.length > 4 ? ' und mehr' : '')
}

const hasAdditionalInfo = (product) => {
  return product.tags?.length > 0 || product.allergens?.length > 0 || product.additives?.length > 0 || product.ingredients?.length > 0
}
</script>
