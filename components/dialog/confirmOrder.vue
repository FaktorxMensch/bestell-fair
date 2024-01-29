<template>
  <v-dialog
      v-model="dialog"
      width="1024"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Bestellung bestätigen</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
              cols="4"
              sm="2"
          >
            <v-btn color="success" class="mt-2 w-full"
                   @click="changePickupTime(-5*60*1000)"
                   variant="tonal"
                   prepend-icon="mdi-chevron-double-left">
              -10 min
            </v-btn>
          </v-col>
          <v-col
              cols="4"
              sm="2"
          >
            <v-btn color="success" class="mt-2 w-full"
                   @click="changePickupTime(-10*60*1000)"
                   variant="tonal"
                   prepend-icon="mdi-chevron-left">
              -5 min
            </v-btn>
          </v-col>
          <v-col
              cols="8"
              sm="4"
          >
            <v-text-field
                label="Abholzeit"
                type="time"
                ref="autofocus"
                tabindex="1"
                append-inner-icon="mdi-timer-outline"
                required
                disabled=""
                :value="new Date(body.pickup_at).toLocaleTimeString('de-de', {hour: '2-digit', minute: '2-digit'})"
            ></v-text-field>
          </v-col>
          <v-col
              cols="4"
              sm="2"
          >
            <v-btn color="warning" class="mt-2 w-full"
                   @click="changePickupTime(5*60*1000)"
                   variant="tonal"
                   prepend-icon="mdi-chevron-right">
              +5 min
            </v-btn>
          </v-col>
          <v-col
              cols="4"
              sm="2"
          >
            <v-btn color="warning" class="mt-2 w-full"
                   @click="changePickupTime(10*60*1000)"
                   variant="tonal"
                   prepend-icon="mdi-chevron-double-right">
              +10 min
            </v-btn>
          </v-col>
          <v-col cols="12">
            <!--            <v-textarea-->
            <!--                tabindex="2"-->
            <!--                label="Tätigkeit"-->
            <!--                v-model="body.description"-->
            <!--                required-->
            <!--            ></v-textarea>-->
            <ui-order-element
                v-for="product in body?.products" :key="product.name" :product="product" layout="normal"/>
          </v-col>
          <v-col cols="12">
            <!--                v-if="quote?.items?.length>0"-->
            <!--            <v-select-->
            <!--                      :items="quote.items"-->
            <!--                      item-title="description"-->
            <!--                      item-value="description"-->
            <!--                      label="Angebotsposition"-->
            <!--                      clearable-->
            <!--                      v-model="body.quoteItem"-->
            <!--            />-->
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            prepend-icon="mdi-close"
            variant="text"
            @click="dialog = false"
        >
          Schließen
        </v-btn>
        <v-btn
            tabindex="3"
            prepend-icon="mdi-cancel"
            color="error"
            @click="reject"
        >
          Stornieren
        </v-btn>
        <v-btn
            tabindex="3"
            prepend-icon="mdi-content-save"
            color="success"
            @click="save"
        >
          Bestätigen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const emit = defineEmits(['setNewPickupAt', 'changeOrderStatus'])
const props = defineProps(['name', 'pickup_at', 'status', 'products', 'total_price', 'prepend-icon', 'dialog'])
const dialog = ref(typeof props.dialog === 'undefined' ? false : props.dialog)

// apply prop changes
watch(props, (value) => {
  // dialog
  dialog.value = value.dialog ? value.dialog : false

  // body atts (minutes, costs, description, quote, id)
  body.value = {
    name: props.name ? props.name : null,
    pickup_at: props.pickup_at ? props.pickup_at : null,
    status: props.status ? props.status : null,
    products: props.products ? props.products : null,
    total_price: props.total_price ? props.total_price : null
  }
  if (!body.value.pickup_at) {
    body.value.pickup_at = new Date(Date.now() + 30 * 60 * 1000)
  }


})

const body = ref({
  name: props.name ? props.name : null,
  pickup_at: props.pickup_at ? props.pickup_at : null,
  status: props.status ? props.status : null,
  products: props.products ? props.products : null,
  total_price: props.total_price ? props.total_price : null,
})

const changePickupTime = async (change) => {
  body.value.pickup_at = new Date(new Date(body.value.pickup_at).getTime() + change)
}

const save = async () => {

  emit('setNewPickupAt', body.value.pickup_at)
  emit('changeOrderStatus', 'Bestätigt')

  dialog.value = false
}

const reject = async () => {

  emit('changeOrderStatus', 'Storniert')
  dialog.value = false

}
</script>
