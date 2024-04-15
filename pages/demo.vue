<template>
  <v-main>
    <div class="space-y-3 my-14 max-w-xl mx-auto">
      <h1 class="text-6xl font-bold">Demo</h1>
      <template v-if="!demo">
        <p class="text-lg">
          {{
            loading ? 'Ihr Demo Account wird erstellt, das dauert einige Sekunden ...' : 'Erstellen Sie einen Demo Account um die Bestell-Fair App zu testen'
          }}</p>
        <v-btn @click="erstellen" size="large"
               color="primary"
               append-icon="mdi-play"
               :loading="loading">
          Demo Restaurant erstellen
        </v-btn>
      </template>
      <template v-else>
        <v-card variant="outlined" class="mt-6">
          <!--          <v-card-title>Ihr Restaurant: {{ demo.newRestaurant.name }}</v-card-title>-->
          <!--          <v-card-subtitle>Dies ist Ihr persönliches Demo Restaurant, es wird nach einiger Zeit gelöscht.-->
          <!--          </v-card-subtitle>-->
          <v-list class="divide-y">
            <v-list-item>
              <h3 class="text-2xl font-bold">🎉 Willkommen!</h3>
              <p>
                Das
                <a :href="'/restaurant/' + demo.newRestaurant.id" target="_blank" class="text-blue-500 hover:underline">
                  {{ demo.newRestaurant.name }}
                  <v-icon color="primary" size="1rem">mdi-open-in-new</v-icon>
                </a>
                ist Ihr persönliches Demo Restaurant, es wird nach einiger Zeit gelöscht.
              </p>
            </v-list-item>
            <v-list-item>
              <h3 class="text-2xl font-bold">
                😋 Als Gast</h3>
              <p>
                Sehen Sie Ihr Restaurant als Gast und bestellen Sie.
              </p>
              <v-btn :to="'/restaurant/' + demo.newRestaurant.id" target="_blank"
                     color="primary"
                     size="large"
                     append-icon="mdi-open-in-new">
                Als Gast ansehen
              </v-btn>
            </v-list-item>
            <v-list-item>
              <h3 class="text-2xl font-bold">
                🔐 Verwaltung</h3>
              Loggen Sie sich als Partner ein, um Bestellungen zu sehen und zu bearbeiten.
              <div class="p-4 bg-gray-100 rounded my-2">
                Email: <tt>{{ demo.newUserData.email }}</tt>
                <br/>
                Passwort: <tt>{{ demo.newUserData.password }}</tt>
              </div>
              <v-btn
                  :to="'/login?email=' + demo.newUserData.email + '&password=' + demo.newUserData.password"
                  color="primary"
                  size="large"
                  target="_blank" append-icon="mdi-open-in-new">
                Zum Login
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </template>


      <v-card variant="tonal" color="primary" class="mt-10">
        <v-card-title>
          <div class="flex">
            Sie möchten Unterstützung?
            <v-spacer/>
            <v-icon icon="mdi-lightbulb-on" class="text-2xl"/>
          </div>
        </v-card-title>
        <v-card-text>
          Gerne kommen wir zu Ihnen, helfen telefonisch unter <a href="tel:00491626899628">0162 68 99 628</a> oder per
          E-Mail unter <a href="mailto:info@bestell-fair.de">info@bestell-fair.de</a> weiter.
        </v-card-text>
      </v-card>

    </div>
  </v-main>
</template>
<script setup>
const demo = ref(null)
const erstellen = async () => {
  loading.value = true
  const {data} = await useFetch('/api/v1/demo')
  // schaue ob es newRestaurant.id gibt
  if (!data.value.newRestaurant.id) {
    Swal.fire({
      title: 'Fehler',
      text: 'Es ist ein Fehler aufgetreten',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
  demo.value = data.value
  loading.value = false
}
const loading = ref(false)
definePageMeta({layout: 'landing'})
</script>

<style scoped>
h3 {
  @apply mb-4 mt-2
}

.v-list .v-list-item:not(:first-of-type) {
  @apply pt-2
}

.v-list .v-list-item {
  @apply pb-4;
  .v-btn {
    @apply mt-2
  }
}
</style>
