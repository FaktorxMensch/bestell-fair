<template>
  <div>
    <v-form @submit.prevent="addElement" class="mt-12">
      <!--      <v-container>-->
      <v-row>
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
      <v-text-field rounded variant="outlined" v-model="formData.location"
                    label="Adresse (Strasse, PLZ, Ort)"></v-text-field>
      <v-textarea
          rounded
          variant="outlined" v-model="formData.description" label="Beschreibung"></v-textarea>
      <v-btn rounded type="submit" color="teal" size="large"
             variant="flat"
             class="w-full"
             :isabled="!formData.name || !formData.location || !formData.description || !formData.contact_email || !formData.contact_phone"
      >Anfrage senden
      </v-btn>
      <!--      </v-container>-->
    </v-form>

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
})

const emit = defineEmits(['done'])
const addElement = async () => {
  const {data, error} = await supabase
      .from('restaurants')
      .insert([
        {
          ...formData.value,
          slug: slugFromName(formData.value.name)
        }
      ])
      .select('*')
  if (error) {
    console.log(error)
    Swal.fire({
      title: 'Fehler!',
      text: 'Bitte versuche es später noch einmal. '+error.message,
      icon: 'error',
      confirmButtonText: 'Schließen'
    })
  } else {
    await Swal.fire({
      title: 'Danke für Deine Anfrage!',
      text: 'Wir melden uns bei Dir.',
      icon: 'success',
      confirmButtonText: 'Schließen'
    })
    // emit done event
    emit('done')
  }
}

const slugFromName = (name) => {
  return name.toLowerCase().replace(/ /g, '-')
}
</script>
