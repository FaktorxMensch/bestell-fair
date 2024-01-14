<template>
  <v-card>
    <v-card-title>Kontakt</v-card-title>
    <v-card-subtitle>So erreichen Sie uns &middot; Inhaber:in {{ restaurant.contact_name }}</v-card-subtitle>

    <!-- have call email buttons and an open street map just as buttons
    -->

    <!-- text on all buttons left aligned -->
    <v-card-text class="flex flex-col gap-2 btns-text-left">

      <v-btn prepend-icon="mdi-phone"
             v-if="restaurant.contact_phone.length > 0"
             size="large" block flat variant="outlined" :href="'tel:'+restaurant.contact_phone">{{
          restaurant.contact_phone
        }}
      </v-btn>

      <v-btn size="large" prepend-icon="mdi-email" block flat variant="outlined"
             v-if="restaurant.contact_email.length > 0"
             :href="'mailto:'+restaurant.contact_email">{{
          restaurant.contact_email
        }}
      </v-btn>

      <v-btn size="large" prepend-icon="mdi-map-marker" block flat variant="outlined"
             v-if="restaurant.location.length > 0"
             target="_blank"
             :href="'https://www.google.com/maps/search/?api=1&query='+restaurant.location">{{
          restaurant.location
        }}
      </v-btn>

    </v-card-text>
  </v-card>
</template>
<script setup>
const props = defineProps(['restaurant'])
</script>
<style scoped>
.btns-text-left .v-btn {
  @apply justify-start transform-none;
  text-transform: none;
  font-weight: normal;
}
</style>
