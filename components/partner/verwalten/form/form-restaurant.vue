<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Restaurant</v-card-title>
        <v-card-text>
          <!-- have as grid of three two or one, depending on screen size -->
          <v-form>
            <v-text-field label="Name des Restaurants" v-model="restaurant.name"/>
            <v-textarea label="Beschreibungs und Willkommens Text" rows="2" v-model="restaurant.description"/>

            <div class="grid grid-cols-3 md:grid-cols-2 gap-x-4">

              <v-file-input label="Profil-Bild" accept="image/*"
                            @change="e=>upload('icon',e)"></v-file-input>
              <v-file-input label="Hintergrund-Bild" accept="image/*"
                            @change="e=>upload('feature',e)"></v-file-input>

              <!--              <v-checkbox label="Restaurant sichtbar" v-model="restaurant.visible"></v-checkbox>-->
              <!--              <v-checkbox label="Wir haben gerade geöffnet" v-model="restaurant.open"></v-checkbox>-->
              <v-text-field label="Adresse des Restaurants" v-model="restaurant.location"></v-text-field>

              <v-text-field label="Kontakt Name" v-model="restaurant.contact_name"></v-text-field>
              <v-text-field label="Kontakt E-Mail" v-model="restaurant.contact_email" type="email"></v-text-field>
              <v-text-field label="Kontakt Telefon" v-model="restaurant.contact_phone" type="tel"></v-text-field>

              <v-select label="Zahlungsmethoden" v-model="restaurant.payment_methods" multiple
                        :items="['Bar', 'Kreditkarte', 'Paypal', 'Apple Pay', 'Google Pay']"></v-select>

              <v-text-field label="Restaurant Webseite (optional)" v-model="restaurant.website"></v-text-field>

            </div>
            <v-select label="Felder, die bei einer Bestellung ausgefüllt werden können"
                      v-model="restaurant.order_fields"
                      multiple
                      chips
                      :items="['Name', 'Telefon', 'E-Mail', 'Anmerkungen', 'Tischnummer', 'Lieferadresse' ]"></v-select>
            <!--            <v-select label="Tags" v-model="restaurant.tags" multiple chips :items="['Vegan', 'Vegetarisch', 'Glutenfrei', 'Laktosefrei', 'Bio', 'Fairtrade', 'Regional', 'Saisonal']"></v-select>-->
            <!--              <v-text-field label="Kurzform des Restaurant Namens (optional)" v-model="restaurant.slug"-->
            <!--                            hint="z.B. fatima, oder dicker-schmidt"-->
            <!--                            :rules="[v => v.length <= 20 || 'Maximal 20 Zeichen', v => v.length >= 3 || 'Mindestens 3 Zeichen',  v => /^[a-z0-9-]+$/.test(v) || 'Nur Kleinbuchstaben, Zahlen und Bindestriche']"-->
            <!--              ></v-text-field>-->

            <v-btn @click="submitForm" rounded color="teal">Speichern</v-btn>
          </v-form>
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
const {restaurant} = storeToRefs(verwaltenStore);
const submitForm = verwaltenStore.saveRestaurant
const {uploadImage} = useFilehandler()

const upload = async (type, event) => {
  const url = await uploadImage(event)
  console.log('url', url)
  restaurant.value[type + '_image_url'] = url
}
</script>


