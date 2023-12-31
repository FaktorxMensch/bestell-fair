<template>
  <div>
    <ul>
      <li v-for="restaurant in restaurants">
        {{ restaurant.name }}
      </li>
    </ul>
    <v-text-field
        v-model="newRestaurantName"
        label="New Restaurant Name"/>
    <v-btn @click="addElement()">Add Element</v-btn>
    <v-form @submit="addElement()">
      <v-container>
        <v-text-field variant="outlined" v-model="formData.name" label="Name"></v-text-field>
        <v-text-field variant="outlined" v-model="formData.location" label="Location"></v-text-field>
        <v-textarea variant="outlined" v-model="formData.description" label="Description"></v-textarea>
        <v-text-field variant="outlined" v-model="formData.contact_email" label="Contact Email"></v-text-field>
        <v-text-field variant="outlined" v-model="formData.contact_phone" label="Contact Phone"></v-text-field>
        <v-select
            variant="outlined"
            v-model="formData.payment_methods"
            :items="paymentMethods"
            chips
            label="Payment Methods"
            multiple
        ></v-select>
        <!-- Hier sollte ein Feld für die 'order_fields' hinzugefügt werden, je nach Anforderungen -->
        <!-- Hier sollte ein Feld für die 'products' hinzugefügt werden, je nach Anforderungen -->
        <!-- Hier sollte ein Feld für die 'tags' hinzugefügt werden, je nach Anforderungen -->
        <v-text-field variant="outlined" v-model="formData.website" label="Website"></v-text-field>
        <v-btn type="submit" color="primary">Submit</v-btn>
      </v-container>
    </v-form>

  </div>
</template>
<script setup>
const supabase = useSupabaseClient()
const restaurants = ref([])
const paymentMethods = [
  'cash',
  'card',
  'paypal',
  'applepay',
  'googlepay',
  'stripe',
  'venmo',
  'bitcoin',
  'litecoin',
  'ethereum',
  'dogecoin',
  'monero',
  'other'
]
const formData = ref({
  name: '',
  location: '',
  description: '',
  contact_email: '',
  contact_phone: '',
  payment_methods: [],
  tags: [],
  website: '',
})
const fetchData = async function() {
  const {data, error} = await supabase
      .from('restaurants')
      .select('*')
  if (error) console.log(error)
  else restaurants.value = data
}
await fetchData()
const newRestaurantName = ref('')
const addElement = async () => {
  const { data, error } = await supabase
      .from('restaurants')
      .insert([
      formData.value
      ])
      .select('*')
  if (error) console.log(error)
  else {
    restaurants.value = [...restaurants.value, ...data]
    newRestaurantName.value = ''
  }

}
</script>