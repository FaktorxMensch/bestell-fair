<template>
  <v-dialog
      v-model="dialog"
      width="1024"
  >
    <v-card>
      <v-card-title>
        Bestellung
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
                :value="new Date(order.pickup_at).toLocaleTimeString('de-de', {hour: '2-digit', minute: '2-digit'})"
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
          <v-col cols="12" v-if="order.status === 'Neu'">
            <ui-order-element
                v-for="product in order.products" :key="product.name" :product="product" layout="normal"/>
          </v-col>
          <v-col cols="12" v-else>
            <h2
                class="text-xl font-semibold mb-2"
            >Gast benachrichtigen</h2>
            <div class="grid grid-cols-4 gap-4">
             <div
                 class="border p-2 rounded-lg cursor-pointer hover:bg-gray-500/10"
                 @click="notify(notification)"
                 v-for="notification in notificationTemplates" :key="notification">
               <v-icon class="text-2xl">mdi-alert</v-icon>
               {{ notification }}
              </div>
            </div>
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
          Betätigen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const emit = defineEmits(['setNewPickupAt', 'changeOrderStatus'])
const props = defineProps(['order', 'prepend-icon', 'dialog'])
const dialog = ref(typeof props.dialog === 'undefined' ? false : props.dialog)
const order = ref(props.order)

const notificationTemplates = [
    'Leider gibt es einige Zutaten nicht mehr. Möchtest du die Bestellung stornieren oder ersetzen?',
    'Aktuell keine EC-Kartenzahlung möglich. Bitte bar zahlen.',
    'Es ist gerade sehr voll. Die Bestellung kann etwas länger dauern.',
    'Deine Bestellung verzögert sich. Wir informieren dich, sobald sie fertig ist.'
]

// apply prop changes
watch(props, (value) => {
  // dialog
  dialog.value = value.dialog ? value.dialog : false

  if (!order.value.pickup_at) {
    order.value.pickup_at = new Date(Date.now() + 30 * 60 * 1000)
  }

})

const changePickupTime = async (change) => {
  order.value.pickup_at = new Date(new Date(order.value.pickup_at).getTime() + change)
}

const supabase = useSupabaseClient()
const notify = async (notification) => {
  if(!order.value.notifications) {
    order.value.notifications = []
  }
  // add to notifications in order
  order.value.notifications.push(notification)
  // submit update to supabase
  const {data, error} = await supabase
      .from('orders')
      .update({notifications: order.value.notifications})
      .eq('id', order.value.id)
      .select('*')

  if (error) {
    await Swal.fire({
      title: 'Fehler',
      text: 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
      icon: 'error'
    })
  } else {
    // autoclose
    dialog.value = false
    await Swal.fire({
      title: 'Benachrichtigung gesendet',
      text: 'Die Benachrichtigung wurde erfolgreich gesendet.',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true
    })
  }
}


const save = async () => {

  emit('setNewPickupAt', order.value.pickup_at)
  emit('changeOrderStatus', 'Bestätigt')

  dialog.value = false
}

const reject = async () => {

  emit('changeOrderStatus', 'Storniert')
  dialog.value = false

}
</script>
