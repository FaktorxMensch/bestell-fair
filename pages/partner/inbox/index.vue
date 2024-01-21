<script setup>

 const {
   data, refresh, loading, pending
   } = await useLazyFetch('https://fatima-dresden.de/wp-content/plugins/fatima_api_status_plugin/api.php?api_key=ad31f2b0-8b7c-11eb-8dcd-0242ac17841741897830003')
 // } = {"bestellungen":[{"id":"12","name":"tester123","abholzeit":"2024-01-22 01:01:00","rufnummer":"9384u1294082345134","vegan":"1","kommentar":"nur ein test","vor_ort":"0","status":"Neu","summe":"26.00","posten":[{"posten_id":"20","bestellung_id":"12","gericht_id":"13","menge":"1","spezielle_anforderungen":null,"gericht":{"id":"13","name":"Falafelrolle","bild_url":"http:\/\/fatima-dresden.de\/wp-content\/uploads\/2023\/12\/gericht-bild4.jpeg","preis":"6.00","kategorie":"Hauptgericht"}},{"posten_id":"21","bestellung_id":"12","gericht_id":"4","menge":"1","spezielle_anforderungen":null,"gericht":{"id":"4","name":"Teller nach arabischer Art","bild_url":"http:\/\/fatima-dresden.de\/wp-content\/uploads\/2023\/12\/gericht-bild-20.jpeg","preis":"7.50","kategorie":"Hauptgericht"}},{"posten_id":"22","bestellung_id":"12","gericht_id":"1","menge":"1","spezielle_anforderungen":null,"gericht":{"id":"1","name":"Kufta Teller","bild_url":"http:\/\/fatima-dresden.de\/wp-content\/uploads\/2023\/12\/gericht-bild7.jpeg","preis":"9.50","kategorie":"Hauptgericht"}},{"posten_id":"23","bestellung_id":"12","gericht_id":"9","menge":"1","spezielle_anforderungen":null,"gericht":{"id":"9","name":"Gew\u00fcrzte Oliven","bild_url":"http:\/\/fatima-dresden.de\/wp-content\/uploads\/2023\/12\/gericht-bild11.jpeg","preis":"3.00","kategorie":"Kleinere Leckereien"}}]}],"request_time":"2024-01-21 11:30:40"}
 //   data: ref(null),
 //   refresh: ref(() => {
 //   }),
 //   loading: ref(false),
 //   pending: ref(false),
 // }
 setInterval(refresh, 1000 * 10 * 1)
 // setInterval(refresh, 1000 * 60 * 1)

 const orders = useOrdersStore()
 watch(data, (newValue) => {
   console.log('data changed', data.value.bestellungen)
   console.log('bestellungen changed')
   orders.request_time = data.value.request_time
   orders.bestellungen = data.value.bestellungen
   console.log('bestellungen updated', orders.bestellungen)
 })

 const {bestellungen, request_time} = storeToRefs(orders)
 onMounted(refresh)
</script>
<template>
  <v-theme-provider theme="dark">
    <v-app>
      <partner-inbox-actionbar :refresh="refresh"/>
      <v-main v-if="data !== null">
        <v-container fluid>
          <v-progress-linear v-if="data.pending" indeterminate/>
          <partner-inbox-bestellungen-tabelle v-else/>
          <partner-inbox-notification-sound/>
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>
