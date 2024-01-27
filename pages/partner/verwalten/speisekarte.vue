<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-3xl font-bold">Speisekarte</h1>
    <v-btn text="Änderungen speichern"
           variant="flat"
           prepend-icon="mdi-content-save"
           color="teal"
           @click="verwaltenStore.saveRestaurant"/>
  </div>
  <v-expansion-panels>
    <v-expansion-panel v-for="product in restaurant.products" :title="product.name">
      <template #text>
        <div class="p-2">
          <div class="grid gap-2 grid-cols-2">
            <v-text-field label="Name" v-model="product.name"/>
            <v-text-field label="Preis" v-model="product.price" type="number" suffix="€" step="0.01"/>
            <v-select label="Stichworte" v-model="product.tags" :items="['vegan', 'vegetarisch', 'glutenfrei']" chips=""
                      multiple/>
            <div class="flex">
              <v-file-input label="Bild" @change="event=>fileChange(event,product)"/>
              <img
                  :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+product.image+'?token='+Math.random()"
                  class="w-12 h-12 ms-2 rounded object-cover" v-if="product.image"/>
            </div>
          </div>

          <v-text-field label="Beschreibung" v-model="product.description"/>
          <v-combobox label="Zutaten" v-model="product.ingredients" chips multiple/>
          <v-combobox label="Allergene" v-model="product.allergens" chips multiple/>
          <v-combobox label="Zusatzstoffe" v-model="product.additives" chips multiple/>

          <v-divider class="my-4 border-b border-gray-800"/>
          <h2 class="text-xl font-bold m-2">Konfiguration für den Gast</h2>

          <partner-verwalten-optiongroups-editor v-if="product.optionGroups" v-model="product.optionGroups"/>
          <v-alert v-else color="red" icon="mdi-alert-circle-outline">
            <strong>Keine Optionsgruppen</strong> für dieses Produkt vorhanden.
          </v-alert>

        </div>
        <v-divider class="my-4 border-b border-gray-800"/>
        <v-btn
            class="float-right"
            text color="error" @click="restaurant.products.splice(restaurant.products.indexOf(product), 1)">
          <v-icon>mdi-delete</v-icon>
          Dieses Produkt löschen
        </v-btn>
      </template>
    </v-expansion-panel>
    <v-expansion-panel
        expand-icon="mdi-plus-circle-outline"
        @click="restaurant.products.push({name: 'Neues Produkt #'+(restaurant.products.length+1), price: 0, tags: [], image: null, description: '', ingredients: [], allergens: [], additives: [], optionGroups: []})"
        title="Neues Produkt"
        ripple>
    </v-expansion-panel>
  </v-expansion-panels>


</template>

<script setup>
import {useVerwaltenStore} from '~/stores/verwalten'

definePageMeta({layout: 'partner-verwalten'})
const {uploadImage} = useFilehandler()
const verwaltenStore = useVerwaltenStore()
const {restaurant} = storeToRefs(verwaltenStore)

const fileChange = async (event, product = null) => {
  console.log('event', event)
  const path = await uploadImage(event)
  product.image = path
  console.log('path', path)
}
</script>

