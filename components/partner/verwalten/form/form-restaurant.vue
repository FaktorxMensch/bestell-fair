<template>
  <v-row class="no-input-details ">
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Restaurant</v-card-title>
        <v-card-text>
          <!-- have as grid of three two or one, depending on screen size -->
          <v-form class="space-y-4">
            <v-text-field
                variant="outlined"
                label="Name des Restaurants" v-model="restaurant.name"/>
            <v-textarea
                variant="outlined"
                label="Beschreibungs und Willkommens Text" rows="2" v-model="restaurant.description"/>

            <div class="grid grid-cols-3 md:grid-cols-2 gap-4">

              <v-file-input label="Logo-Bild" accept="image/*"
                            :prepend-icon="null"
                            prepend-inner-icon="mdi-image"
                            variant="solo"
                            class="cursor-pointer"
                            @change="e=>upload('icon',e)"></v-file-input>
              <v-file-input label="Hintergrund-Bild" accept="image/*"
                            :prepend-icon="null"
                            prepend-inner-icon="mdi-image"
                            variant="solo"
                            class="cursor-pointer"
                            @change="e=>upload('feature',e)"></v-file-input>

              <v-text-field
                  variant="outlined"
                  label="Adresse des Restaurants" v-model="restaurant.location"></v-text-field>

              <v-text-field
                  variant="outlined"
                  label="Kontakt Name" v-model="restaurant.contact_name"></v-text-field>
              <v-text-field
                  variant="outlined"
                  label="Kontakt E-Mail" v-model="restaurant.contact_email" type="email"></v-text-field>
              <v-text-field
                  variant="outlined"
                  label="Kontakt Telefon" v-model="restaurant.contact_phone" type="tel"></v-text-field>

              <v-select
                  variant="outlined"
                  label="Zahlungsmethoden" v-model="restaurant.payment_methods" multiple
                  :items="['Bar', 'Kreditkarte', 'Paypal', 'Apple Pay', 'Google Pay']"></v-select>

              <v-text-field
                  variant="outlined"
                  type="url"
                  label="Restaurant Webseite (optional)" v-model="restaurant.website"></v-text-field>

            </div>
            <v-select label="Felder, die bei einer Bestellung ausgefüllt werden können"
                      variant="outlined"
                      v-model="restaurant.custom_fields"
                      multiple
                      chips
                      :items="['Name', 'Telefon', 'E-Mail', 'Anmerkungen', 'Tischnummer', 'Lieferadresse' ]"></v-select>
            <v-alert v-if="!restaurant.visible" type="warning" icon="mdi-alert"
                     density="compact"
            >Das Restaurant ist nicht sichtbar, Gäste
              finden es nur über den direkten Link
            </v-alert>
            <div class="flex justify-between items-center">
              <v-switch label="Restaurant sichtbar" :color="restaurant.visible ? 'teal' : 'grey'" inset
                        v-model="restaurant.visible"></v-switch>
              <v-btn @click="submitForm" prepend-icon="mdi-check">Speichern</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          <h1>Öffnungszeiten</h1>
        </v-card-title>
        <v-card-text v-if="restaurant.opening_hours" class="no-input-details mt-1 space-y-2">
          <div v-for="(day, i) in restaurant.opening_hours" class="flex flex-wrap gap-2 items-center">
            <v-select variant="outlined" clearable="" density="compact" label="Öffnet am" v-model="day.day_open"
                      class="w-32"
                      item-title="text"
                      item-value="value"
                      :items="['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day,index)=>({text:day, value:index}))"/>
            <v-select
                variant="outlined"
                density="compact"
                class="w-54"
                clearable=""
                label="Öffnet um" v-model="day.time_open"
                prepend-inner-icon="mdi-clock-outline"
                :error="!day.time_open && day.time_close"
                :items="['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
                ]"/>
            <v-select
                variant="outlined"
                clearable=""
                class="w-54"
                density="compact"
                prepend-inner-icon="mdi-door-closed-lock"
                :error="day.time_open && !day.time_close"
                label="Schliesst um" v-model="day.time_close"
                :items="['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
                ].map(time=>parseInt(time.replace(':','')) > parseInt(day.time_open?.replace(':','')) ? time : time + ' (nächster Tag)')"/>
            <v-btn icon="mdi-delete" @click="restaurant.opening_hours.splice(i, 1)"
                   variant="tonal"
                   density="comfortable"
            />
          </div>
          <div class="flex justify-between">
            <v-btn @click="restaurant.opening_hours.push({time_open:null, time_close:null, day_open:null})"
                   class="mt-4"
                   variant="tonal"
                   prepend-icon="mdi-plus"
                   rounded>Hinzufügen
            </v-btn>
            <v-btn @click="submitForm" class="mt-4" prepend-icon="mdi-check">Speichern</v-btn>
          </div>
        </v-card-text>
        <v-card-text v-else>
          <a @click="restaurant.opening_hours = [{time_open:null, time_close:null, day_open:null}]"
             class="cursor-pointer">Keine Öffnungszeiten hinterlegt, <u>hier klicken</u> um welche zu hinterlegen</a>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Vorschau</v-card-title>
        <v-card-text>
          <!-- have feature image and avatar rounded in front of it -->
          <gast-render-restaurant :cache="false" :restaurant="restaurant"/>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const verwaltenStore = useVerwaltenStore();
const {restaurant} = storeToRefs(verwaltenStore)
restaurant.value.opening_hours.sort((a, b) => {
  return a.day_open > b.day_open ? 1 : -1
})
const submitForm = verwaltenStore.saveRestaurant
const {uploadImage} = useFilehandler()

const upload = async (type, event) => {
  const url = await uploadImage(event, type == 'icon' ? {w: 200, h: 200} : {w: 1000, h: 200})
  restaurant.value[type + '_image_url'] = url
}

</script>


