<template>
  <div>
    <v-form @submit.prevent="addElement">
      <!--      <v-container>-->
      <v-text-field variant="outlined" v-model="formData.name" label="Name"></v-text-field>
      <v-text-field variant="outlined" v-model="formData.location" label="Location"></v-text-field>
      <v-textarea variant="outlined" v-model="formData.description" label="Description"></v-textarea>
      <v-text-field variant="outlined" v-model="formData.contact_email" label="Contact Email"></v-text-field>
      <v-text-field variant="outlined" v-model="formData.contact_phone" label="Contact Phone"></v-text-field>
      <v-text-field variant="outlined" v-model="formData.website" label="Website"></v-text-field>
      <v-btn type="submit" color="primary">Submit</v-btn>
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
  contact_email: '',
  contact_phone: '',
  website: '',
})
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
  if (error) console.log(error)
  else {
  }
}

const slugFromName = (name) => {
  return name.toLowerCase().replace(/ /g, '-')
}
</script>
