<template>
  <div>
    <div class="max-w-xl">

      <v-text-field class="pt-4" rounded variant="outlined" v-model="formData.location"
                    @keyup.enter="findRestaurant"
                    label="Adresse oder Name und Stadt des Restaurant"></v-text-field>


      <div v-if="places && step == 1" class="flex flex-col gap-2 mb-6">
        <div v-if="places.length===0" class="text-lg">Kein Restaurant gefunden, bitte versuche es erneut oder
          <a @click="step=2" class="text-teal-900 underline cursor-pointer">gib die Daten manuell ein</a>.
        </div>
        <p class="text-lg" v-else>Wähle dein Restaurant aus:</p>
        <div v-for="place in places"
             class="flex items-center gap-4 border rounded-full px-5 py-2 justify-start cursor-pointer hover:bg-gray-100 transition-all"
             :class="{'opacity-50': !place.food}"
             style="text-transform: none"
             @click="place.onclick">
          <v-icon :icon="place.food ? 'mdi-food' : 'mdi-map-marker'"/>
          <div class="flex-1">
            <div class="font-semibold">{{ place.title }}</div>
            <div class="text-sm opacity-80">{{ place.subtitle }}</div>
          </div>
        </div>
      </div>

      <v-btn rounded type="submit" color="teal" size="large"
             v-if="step===1" variant="flat"
             v-show="places === null || places.length === 0"
             @click="findRestaurant"
             :disabled="!formData.location"
             :loading="loading"
             append-icon="mdi-arrow-right">Weiter
      </v-btn>
      <template v-else>
        <v-row class="mt-2">
          <v-col cols="12" md="6">
            <v-text-field rounded
                          class="-mt-6"
                          variant="outlined" v-model="formData.name" label="Name des Restaurants"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field rounded variant="outlined" v-model="formData.contact_name"
                          class="-mt-6"
                          label="Name der Ansprechperson"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field rounded variant="outlined" v-model="formData.contact_email"
                          class="-mt-6"
                          label="Kontakt E-Mail"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field rounded variant="outlined" v-model="formData.contact_phone"
                          class="-mt-6"
                          label="Kontakt Telefon"></v-text-field>
          </v-col>
        </v-row>
        <v-text-field rounded variant="outlined" v-model="formData.website"
                      label="Webseite (falls vorhanden)"></v-text-field>
        <v-text-field
            rounded
            variant="outlined" v-model="formData.description" label="Beschreibung"></v-text-field>
        <v-btn rounded type="submit" color="teal" size="large"
               variant="flat"
               class="w-full"
               @click="submit"
               :disabled="!formData.name || !formData.location || !formData.contact_email || !formData.contact_phone"
        >Anfrage senden
        </v-btn>
      </template>
    </div>
    <div class="h-32"></div>

  </div>
</template>
<script setup>
const supabase = useSupabaseClient()
const restaurants = ref([])
const formData = ref({
  name: '',
  location: '',
  description: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  website: '',
  type: '', // type
  lat: 0,
  lon: 0,
})
const step = ref(1)
const place = ref(null)
const emit = defineEmits(['done'])
const submit = async () => {
  const {data, error} = await supabase
      .from('restaurants_pending')
      .insert(formData.value)

  Swal.fire(error ? {
    title: 'Fehler!',
    text: 'Bitte versuche es später noch einmal. ' + error.message,
    icon: 'error',
    confirmButtonText: 'Schließen'
  } : {
    title: 'Danke für Deine Anfrage!',
    text: 'Wir melden uns bei Dir.',
    icon: 'success',
    confirmButtonText: 'Schließen'
  })
  // emit done event
  emit('done')
}

const uri = 'https://nominatim.openstreetmap.org/search?format=json&q='
const places = ref(null)
const loading = ref(false)
const findRestaurant = async () => {
  loading.value = true;
  setTimeout(() => loading.value = false, 5000) // after 5s, stop loading
  const res = await fetch(uri + encodeURIComponent(formData.value.location))
  let data = await res.json()
  // sortiere die nach vorner, die addresstype "amenity" haben
  data.sort((a, b) => {
    if (a.addresstype === 'amenity') return -1
    if (b.addresstype === 'amenity') return 1
    return 0
  })

  // filter out all where there is no name length
  data = data.filter(place => place.name.length > 0)

  const foodClasses = ['fast_food', 'cafe', 'restaurant', 'bar', 'pub', 'ice_cream']

  console.log('res', data)
  places.value = data.map((place) => ({
    title: place.name,
    food: foodClasses.includes(place.type),
    subtitle: place.display_name,
    onclick: () => {
      formData.value.name = place.name
      formData.value.location = place.display_name
      formData.value.type = place.type
      formData.value.lat = place.lat
      formData.value.lon = place.lon
      step.value = 2
    }
  }))

  loading.value = false
}
</script>
