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

              <v-file-input label="Profil-Bild" v-model="upload.icon_image_url" accept="image/*"
                            @change="uploadImage('icon', $event)"></v-file-input>
              <v-file-input label="Hintergrund-Bild" v-model="upload.feature_image_url" accept="image/*"
                            @change="uploadImage('feature', $event)"></v-file-input>

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
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const upload = ref({
  icon_image_url: '',
  feature_image_url: ''
});

const restaurant = ref({
  name: '',
  verified: false, // Readonly
  visible: false,
  open: false,
  location: '',
  description: '',
  contact_email: '',
  contact_phone: '',
  payment_methods: [], // Array of strings
  order_fields: [], // Array of strings
  products: [], // Array of strings
  tags: [], // Array of strings
  website: '',
  slug: '',
  contact_name: '',
  icon_image_url: '',
  feature_image_url: ''
});

// Funktion, um Daten zu laden
async function loadData() {
  const {data, error} = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', '4ff88bdb-4a44-4d67-b887-f3e5bdb52f9d'); // Fügen Sie hier die Logik ein, um die richtige ID zu bekommen

  if (data) {
    restaurant.value = data[0];
  }
}

// Funktion zum Hochladen von Bildern
async function uploadImage(type, event) {
  const file = event.target.files[0];
  if (!file) return;

  // Canvas zum Ändern der Bildgröße
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = async () => {
    if (type === 'icon') {
      canvas.width = 250;
      canvas.height = 250;
    } else { // feature
      canvas.width = 800;
      canvas.height = 150;
    }

    // use cover to fill the canvas
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    canvas.toBlob(async (blob) => {
      const filePath = `${user.value.id}/${type}.jpeg`;
      const {error} = await supabase.storage
          .from('restaurants')
          .upload(filePath, blob, {
            cacheControl: '3600',
            upsert: true
          });

      if (error) {
        console.error('Fehler beim Upload:', error);
      } else {
        console.log('Bild erfolgreich hochgeladen:', filePath);
        // Bild-URL im Restaurant-Objekt speichern
        restaurant.value[`${type}_image_url`] = filePath;
      }
    }, 'image/jpeg');
  };

  img.src = URL.createObjectURL(file);
}

const submitForm = async () => {
  console.log('Form data:', restaurant.value);
  // Logik zur Verarbeitung der Formulardaten
  const {data, error} = await supabase
      .from('restaurants')
      .update(restaurant.value)
      .eq('id', restaurant.value.id); // oder Ihre Logik zur Identifizierung des Restaurants

  if (error) {
    console.error('Fehler beim Speichern:', error);
  } else {
    console.log('Daten erfolgreich gespeichert:', data);
  }
};

// Daten beim Laden der Komponente laden
onMounted(loadData)
</script>

