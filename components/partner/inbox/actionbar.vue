<script setup>
const inboxStore = useInboxStore()
const {orders, order} = storeToRefs(inboxStore)

const showMorePopup = ref(false)

const props = defineProps(['theme'])
const emit = defineEmits(['toggleTheme'])

const toggleTheme = () => {
  emit('toggleTheme')
}

// const cleanable = computed(() => orders.orderen.filter((b) => b.status === 'Storniert' || b.status === 'Abgeholt').length > 0)
// defineProps(['refresh'])
</script>
<template>
  <v-app-bar density="comfortable">
    <template v-if="order?.id">
      <v-btn icon="mdi-chevron-left" @click="inboxStore.closeOrder()"/>
      <v-toolbar-title>Bestellung {{order.name}}, Nr: ...{{ order.id.slice(-4) }}</v-toolbar-title>
      <div class="flex gap-1.5 align-center justify-end py-1 mr-4">
      <a :href="'tel: '+order.phone">
        <v-chip color="success"
                @click.stop
                prepend-icon="mdi-phone">
          Anrufen
        </v-chip>
      </a>
      <v-chip color="warning"
              @click.stop
              title="Problem mit Bestellung melden"
              prepend-icon="mdi-alert-circle-outline">
        Problem
      </v-chip>
      <v-chip color="error"
              @click.stop="inboxStore.updateOrderStatus(order, 'Storniert')"
              title="Stornieren"
              prepend-icon="mdi-cancel">
        Stornieren
      </v-chip>
      </div>
    </template>
    <template v-else>
      <v-toolbar-title>Übersicht</v-toolbar-title>
      <v-spacer/>

      <p class="pr-4">Letzte Änderung:
        {{
          new Date(inboxStore.updatedAt).toLocaleTimeString('de-de', {hour: '2-digit', minute: '2-digit'})
        }}
        Uhr
      </p>
      <v-menu v-model="showMorePopup" :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card >
          <v-list>
            <v-list-item>
              <v-switch @click="toggleTheme"
                        true-icon="mdi-weather-sunny"
                        false-icon="mdi-weather-night"
                        :label="theme==='light' ? 'Tagmodus' : 'Nachtmodus'"
                        class="themeSwitch"/>
            </v-list-item>
            <v-list-item to="/logout" prepend-icon="mdi-logout">Logout</v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>
<style scoped>
  .themeSwitch {
    grid-template-areas: none;
  }
  v-chip {
    @apply cursor-pointer;
  }
  .showMoreMenu {
    @apply min-w-6 max-md:w-full
  }
</style>
