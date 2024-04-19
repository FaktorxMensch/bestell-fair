<template>
  <v-toolbar>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-spacer/>
    <v-btn text color="teal-darken-3" @click="addProduct">
      <v-icon>mdi-plus</v-icon>
      Neues Produkt hinzufügen
    </v-btn>
    <v-btn text="Änderungen speichern"
           :loading="loading"
           variant="flat"
           prepend-icon="mdi-content-save"
           color="teal-darken-3"
           @click="saveRestaurant"/>
  </v-toolbar>

  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item @click="selectedProduct = null">
        <v-list-item-title>
          <div class="font-bold text-lg flex items-center gap-2">
            <v-icon>mdi-book-open</v-icon>
            <span>Speisekarte</span>
            <v-spacer/>
            <!--            <v-btn @click="addProduct" icon="mdi-plus"/>-->
          </div>
        </v-list-item-title>
      </v-list-item>
      <!-- have a search and a list of product in restaurant.products -->
      <v-text-field class="m-2" v-model="search" label="Suche nach Produkt" density="compact"
                    prepend-inner-icon="mdi-magnify"/>
      <v-list-item v-for="product in filteredProducts" :key="product.name" @click="selectedProduct = product">
        <v-list-item-title>{{ product.name }}</v-list-item-title>
      </v-list-item>
      <div v-if="filteredProducts.length === 0" class="text-center text-gray-500">Keine Produkte gefunden.</div>
    </v-list>
  </v-navigation-drawer>

  <div class="p-4">
    <v-card v-if="selectedProduct" v-for="product in [selectedProduct]">
      <v-card-title>
        <h1 class="text-xl font-bold">{{ product.name }}</h1>
      </v-card-title>
      <v-card-item>
        <div class="lg:flex py-2">
          <div class="flex-1">
            <div class="grid gap-2 grid-cols-2 lg:grid-cols-4 no-input-details">
              <v-text-field label="Name in der Speisekarte" v-model="product.name"/>
              <v-text-field label="Preis" v-model="product.price" type="number" suffix="€" step="0.01"/>
              <v-select label="Filterbare Tags" v-model="product.tags" :items="['vegan', 'vegetarisch', 'glutenfrei']"
                        chips=""
                        multiple/>
              <v-file-input
                  :prepend-icon="null"
                  prepend-inner-icon="mdi-image"
                  variant="solo"
                  label="Bild für Vorschau" @change="event=>fileChange(event,product)"/>
            </div>

            <div class="lg:grid lg:grid-cols-2 mt-2 lg:gap-2">
              <v-text-field label="Kleiner Beitext für die Speisekarte (optional)" v-model="product.description"/>
              <v-text-field label="Kategorie" v-model="product.category"/>
            </div>

            <!-- pflichtangaben -->
            <p class="text-sm text-gray-500 mt-2">Pflichtangaben</p>
            <div class="lg:grid lg:grid-cols-3 mt-2 lg:gap-2">
              <v-combobox label="Zutaten" density="compact" v-model="product.ingredients" chips multiple/>
              <v-combobox label="Allergene" density="compact" v-model="product.allergens" chips multiple/>
              <v-combobox label="Zusatzstoffe" density="compact" v-model="product.additives" chips multiple/>
            </div>

          </div>
          <img
              :src="'https://api.bestell-fair.de/storage/v1/object/public/restaurants/'+product.image+'?token='+Math.random()"
              class="w-48 h-48 ms-2 rounded object-cover" v-if="product.image"/>
        </div>

        <v-divider class="my-4 border-b border-gray-800"/>
        <h2 class="text-xl font-bold m-2">Konfiguration für den Gast</h2>

        <partner-verwalten-optiongroups-editor v-if="product.optionGroups" :optionGroups="product.optionGroups"/>
        <!--          <v-alert v-else color="red" icon="mdi-alert-circle-outline">-->
        <!--            <strong>Keine Optionsgruppen</strong> für dieses Produkt vorhanden.-->
        <!--          </v-alert>-->

        <v-divider class="mb-4 border-b border-gray-800"/>
        <v-btn class="float-right mb-2" text color="error"
               @click="deleteProduct(product)">
          <v-icon>mdi-delete</v-icon>
          {{ product.name }} löschen
        </v-btn>
      </v-card-item>
    </v-card>

    <!-- IF NO PRODUCT IS SELECTED, EXPLAIN AND SHOW ADD BUTTON -->
    <v-alert v-else color="gray" icon="mdi-information-outline"
    >
      <strong>Kein Produkt ausgewählt</strong>. Wähle ein Produkt aus der Liste links aus oder füge ein neues Produkt
      hinzu.
      <v-spacer/>
      <v-btn @click="addProduct" class="mt-3">
        <v-icon>mdi-plus</v-icon>
        Neues Produkt hinzufügen
      </v-btn>
    </v-alert>
  </div>

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

const drawer = ref(true)
onMounted(() => {
  if (!restaurant.value.products) {
    restaurant.value.products = []
  }
})
const addProduct = () => {
  console.log(restaurant.value.products[2])
  const newProduct = {
    name: 'Neues Produkt #' + (restaurant.value.products.length + 1),
    category: '',
    price: 0,
    tags: [],
    image: null,
    description: '',
    ingredients: [],
    allergens: [],
    additives: [],
    optionGroups: []
  }
  restaurant.value.products.push(newProduct)
}

const loading = ref(false)
const saveRestaurant = async () => {
  loading.value = true
  await verwaltenStore.saveRestaurant(restaurant.value)
  loading.value = false
}

const selectedProduct = ref(null)

const search = ref('')
const filteredProducts = computed(() => {
  if (!restaurant.value.products) return []
  if (!search.value) return restaurant.value.products
  return restaurant.value.products.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()))
})

const deleteProduct = async (product) => {
  // swal confirm
  const {value} = await Swal.fire({
    title: 'Produkt löschen',
    text: `Möchtest du das Produkt '${product.name}' und inklusive Bilder und Konfigurationsmöglichkeiten wirklich löschen?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ja, löschen',
    cancelButtonText: 'Abbrechen'
  })
  if (!value) return

  const index = restaurant.value.products.indexOf(product)
  if (index > -1) {
    restaurant.value.products.splice(index, 1)
  }
}
</script>
