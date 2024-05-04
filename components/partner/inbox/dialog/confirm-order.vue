<template>
  <v-dialog
      v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar density="comfortable" class="fixed">
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

        <v-app-bar-title>Bestellung von {{ order.name }}</v-app-bar-title>


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
      </v-toolbar>
      <v-col class="p-0">
        <v-row class="mt-14 mx-1 ">
          <v-col
              cols="6"
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
              cols="6"
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
              cols="12"
              sm="4"
          >
            <v-text-field
                label="Abholzeit"
                type="time"
                ref="autofocus"
                tabindex="1"
                append-inner-icon="mdi-timer-outline"
                required
                disabled
                hide-details
                :value="new Date(order.pickup_at).toLocaleTimeString('de-de', {hour: '2-digit', minute: '2-digit'})"
            ></v-text-field>
          </v-col>
          <v-col
              cols="6"
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
              cols="6"
              sm="2"
          >
            <v-btn color="warning" class="mt-2 w-full"
                   @click="changePickupTime(10*60*1000)"
                   variant="tonal"
                   prepend-icon="mdi-chevron-double-right">
              +10 min
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" v-if="order.status === 'Neu'" align-self="start">
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

        <div class="flex flex-col p-4">
          <p class="text-md">Bestellt von {{ order?.name }}</p>
          <p>Anmerkungen: {{ order?.remark }}</p>
          <p>Telefon: {{ order?.phone }}</p>
          <p>Email: {{ order?.email }}</p>
        </div>
      </v-col>
    </v-card>
  </v-dialog>
</template>
<script setup>
console.log('in confirm order dialog')
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
  if (!order.value.notifications) {
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

let autoClose = null
const setupAutoclose = () => {
  clearTimeout(autoClose)
  autoClose = setTimeout(async () => {

    // have an autocloseing swal that after 3 seconds without interaction closes the dialog otherwise resets the timer
    const shoudlClose = await Swal.fire({
      title: 'Noch da?',
      text: 'Wir schließen das Fenster in 3 Sekunden',
      icon: 'question',
      timer: 3000,
      timerProgressBar: true,
      showTimerProgressBar: true,
      showConfirmButton: true,
      showDenyButton: true,
      denyButtonText: 'Abbrechen'
    })

    if (shoudlClose.isDenied) {
      setupAutoclose()
    } else {
      dialog.value = false
    }
  }, 120 * 1000)
}
onMounted(() => {
  setupAutoclose()
})

onUnmounted(() => {
  clearTimeout(autoClose)
})
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>


