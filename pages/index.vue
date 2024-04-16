<template>

  <v-main>


    <!-- EIN BEREICH, WO DIE LEUTE DIREKT ESSEN BESTELLEN KÖNNEN -->
    <!-- BEREICH FÜR GÄSTE HINWEISE -->
    <div
        class="bg-lime-300 border-b p-10 sm:p-20 gap-x-20 gap-y-10 border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-center">
      <!--      <img-->
      <!--          src="/landing/banner.jpeg"-->
      <!--          class="lg:w-1/2 object-cover"-->
      <!--      >-->

      <img src="/logo.png"
           class="object-contain max-w-56"/>

      <div class="border-box lg:w-1/2">
        <h1 class="mb-6 lg:text-6xl lg:pt-8 ">
          Hunger?
        </h1>
        <div class="text-lime-800 max-w-4xl my-4 mx-auto lg:text-xl text-lg mb-6">
          Statt anzurufen, kannst du jetzt ganz einfach online vorbestellen und dann bei deinem Lieblingsrestaurant
          abholen.
          Du unterstützt damit die Gastronomie in der Dresdner Neustadt und sparst dir das Warten.
        </div>
        <v-btn class="mb-9" rounded size="x-large" variant="flat" color="white" href="/restaurant"
               append-icon="mdi-arrow-right">Jetzt vorbestellen
        </v-btn>
      </div>
    </div>


    <!-- SCREENSHOTS -->
    <div class="bg-gray-100 px-4 py-8 md:px-6 lg:px-8 text-center">

      <div class="px-20 py-28 max-w-3xl mx-auto">
        <h1 class="text-7xl font-bold text-center">Schnell erklärt</h1>
        <p class="text-2xl text-center mt-6">Du kannst bei Deinem Lieblingsrestaurant zur Abholung vorbestellen. Dein
          Restaurant zahlt keine Provision, und erhält den vollen Betrag.</p>
      </div>

      <!--      <div class="mb-3 font-bold text-4xl lg:text-6xl lg:pt-12 ">-->
      <!--        <span class="text-gray-900">Schnell erklärt, </span>-->
      <!--        <span class="text-teal-800"> was wir tun</span>-->
      <!--      </div>-->
      <!--      <div class="text-gray-700 max-w-6xl my-4 mx-auto lg:text-xl text-lg mb-8">Wir haben eine Plattform entwickelt, die-->
      <!--        es-->
      <!--        dir ermöglicht,-->
      <!--        deine Lieblingsgerichte vorzubestellen und dann bei deinem Lieblingsrestaurant abzuholen. Dabei verzichten wir-->
      <!--        auf eine Provision, sodass die Restaurants den vollen Betrag erhalten.-->
      <!--      </div>-->

      <div class="mb-3 font-bold text-3xl lg:text-4xl lg:pt-8 text-gray-900">Für den Gast:</div>
      <!-- Beispiel Bild 1 -->
      <div class="examples">
        <div>
          <img src="/landing/screenshots/img7.jpeg" alt="Image"/>
          <h2>1. Direkte Webseiten Integration</h2>
        </div>
        <div>
          <img src="/landing/screenshots/img6.jpeg" alt="Image"/>
          <h2>2. Speisekarte mit Vorbestellung</h2>
        </div>
        <div>
          <img src="/landing/screenshots/img5.jpeg" alt="Image"/>
          <h2>3. Bestellung abschicken</h2>
        </div>
        <div>
          <img src="/landing/screenshots/img4.jpeg" alt="Image"/>
          <h2>4. Zusammenfassung</h2>
        </div>
      </div>

      <div class="mb-3 font-bold text-3xl lg:text-4xl lg:pt-12 text-gray-900">Für das Restaurant:</div>
      <div class="examples">
        <div>
          <img src="/landing/screenshots/img3.jpeg" alt="Image"/>
          <h2>1. Neue Bestellung gemeldet</h2>
        </div>
        <div>
          <img src="/landing/screenshots/img2.jpeg" alt="Image"/>
          <h2>2. Bestellung wird zur Abholung bereitet</h2>
        </div>
      </div>

    </div>

    <!-- HERO -->
    <!--    <div class="flex flex-col md:flex-row">-->
    <!--      <img src="/landing/draw_authentication_fs4.jpeg"-->
    <!--           alt="Image" class="md:ml-auto block md:hidden object-cover"-->
    <!--           style="height: 30vh"/>-->
    <!--      <div class="col-12 flex-1 md:col-6 p-8 py-12 md:text-left flex flex-col justify-center md:items-start">-->
    <!--        <section class="flex flex-col lg:px-12 gap-2">-->
    <!--          <span class="block text-4xl sm:text-6xl font-bold mb-1">Über <span-->
    <!--              class="text-green-600">Bestell Fair</span></span>-->
    <!--          <div class="text-2xl sm:text-4xl font-bold mb-7">Was wir machen</div>-->
    <!--          <p class="mt-0 mb-5 text-xl text-700 line-height-3">-->
    <!--            Unser Team hat es sich zur Aufgabe gemacht, die Gastronomie in der Dresdner Neustadt zu unterstützen.-->
    <!--            Wir bieten eine Plattform, auf der du deine Lieblingsgerichte vorbestellen kannst, um sie dann bei deinem-->
    <!--            Lieblingsrestaurant abzuholen. Dabei verzichten wir auf eine Provision, sodass die Restaurants den vollen-->
    <!--            Betrag erhalten.-->

    <!--          </p>-->
    <!--          <div>-->
    <!--            <v-btn rounded size="large" variant="flat" color="teal-darken-3" href="/partner-werden">Jetzt Partner-->
    <!--              werden-->
    <!--            </v-btn>-->
    <!--          </div>-->
    <!--        </section>-->
    <!--      </div>-->
    <!--      <div class="col-12 flex-1 md:col-6 overflow-hidden">-->
    <!--        <img src="/landing/draw_authentication_fs4.jpeg" alt="Image" class="md:ml-auto hidden md:block"-->
    <!--             style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);min-height: calc(100vh - 64px);"/>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="px-20 py-28 max-w-3xl mx-auto">
      <h1 class="text-7xl font-bold text-center">Roadmap</h1>
      <p class="text-2xl text-center mt-6">Wir entwickeln unsere Plattform stetig weiter, um dir die beste Erfahrung zu
        bieten.</p>
    </div>

    <!-- FUTURE FUNCTIONALITY 1/3 -->
    <div class="bg-white flex  flex-col md:flex-row">
      <!-- badge "In kürze verfügbar" -->
      <div class="col-12 flex flex-1 md:col-6 overflow-hidden">
        <img src="/landing/functionality/table_qr.jpeg" alt="Image" class="md:ml-auto hidden md:block"
             style="clip-path: polygon(0 0, 100% 0%, 90% 100%, 0 100%);min-height: calc(50vh - 64px);"/>
        <img src="/landing/functionality/table_qr.jpeg" alt="Image" class="md:ml-auto block md:hidden"
             style="min-height: calc(50vh - 64px);"/>
        <v-spacer/>
      </div>
      <div class="col-12 flex-1 md:col-6 p-8 py-12 md:text-left flex flex-col justify-center md:items-start">
        <section class="flex flex-col lg:px-12 gap-2">
          <div class="bg-teal-800 text-white text-center w-56 rounded-full py-2 px-4 mb-4">In Kürze verfügbar</div>
          <span class="block text-4xl sm:text-6xl font-bold mb-1">Vom Tisch bestellen</span>
          <div class="text-2xl sm:text-4xl font-bold mb-7">Bestelle direkt am Tisch ohne Speisekarte</div>
          <p class="mt-0 mb-5 text-xl text-700 line-height-3">
            Wir entwickeln gerade eine Funktion, mit der du direkt am Tisch bestellen kannst. Dazu musst du nur den
            QR-Code auf dem Tisch scannen und kannst dann direkt deine Bestellung aufgeben. So kannst du ganz einfach
            deine Lieblingsgerichte vorbestellen und dann bei deinem Lieblingsrestaurant abholen.
          </p>
        </section>
      </div>
    </div>

    <!-- FUTURE FUNCTIONALITY 2/3 -->
    <div class="bg-gray-200 flex  flex-col md:flex-row">
      <!-- badge "In kürze verfügbar" -->
      <div class="col-12 flex-1 md:col-6 p-8 py-12 md:text-left flex flex-col justify-center md:items-start">
        <section class="flex flex-col lg:px-12 gap-2">
          <div class="bg-teal-600 text-white text-center w-56 rounded-full py-2 px-4 mb-4">Demnächst verfügbar</div>
          <span class="block text-4xl sm:text-6xl font-bold mb-1">Gruppen</span>
          <div class="text-2xl sm:text-4xl font-bold mb-7">Bestelle für deine Kollegen oder Freunde mit</div>
          <p class="mt-0 mb-5 text-xl text-700 line-height-3">
            Du erstellst eine Bestellung und deine Kollegen oder Freunde können sich dann mit einem Code zu deiner
            Bestellung hinzufügen. So kannst du ganz einfach für deine Kollegen oder Freunde mitbestellen und dann bei
            deinem Lieblingsrestaurant abholen. Ihr könnt die Kosten dann ganz einfach untereinander aufteilen.
          </p>
        </section>
      </div>
      <div class="col-12 flex flex-1 md:col-6 overflow-hidden">
        <v-spacer/>
        <img src="/landing/functionality/collection_orders.jpeg" alt="Image" class=" md:ml-auto hidden md:block"
             style="clip-path: polygon(0% 0, 100% 0%, 100% 100%, 10% 100%);min-height: calc(50vh - 64px);"/>
        <img src="/landing/functionality/collection_orders.jpeg" alt="Image" class="md:ml-auto block md:hidden"
             style="min-height: calc(50vh - 64px);"/>
      </div>
      <!--      -->
      <!--      <div class="col-12 flex-1 md:col-6 overflow-hidden p-20">-->
      <!--        <img src="/landing/functionality/collection_orders.jpeg" alt="Image"-->
      <!--             class="rounded-full md:ml-auto hidden md:block"-->
      <!--             style="min-height: calc(50vh - 64px);"/>-->
      <!--      </div>-->
    </div>
    <!-- FUTURE FUNCTIONALITY 3/3 -->
    <div class="bg-white flex  flex-col md:flex-row">
      <!-- badge "In kürze verfügbar" -->
      <div class="col-12 flex flex-1 md:col-6 overflow-hidden">
        <img src="/landing/functionality/eve_discount.jpeg" alt="Image" class="md:ml-auto hidden md:block"
             style="clip-path: polygon(0 0, 100% 0%, 90% 100%, 0 100%);min-height: calc(50vh - 64px);"/>
        <img src="/landing/functionality/eve_discount.jpeg" alt="Image" class="md:ml-auto block md:hidden"
             style="min-height: calc(50vh - 64px);"/>
        <v-spacer/>
      </div>
      <div class="col-12 flex-1 md:col-6 p-8 py-12 md:text-left flex flex-col justify-center md:items-start">
        <section class="flex flex-col lg:px-12 gap-2">
          <div class="bg-amber-500 text-white text-center w-56 rounded-full py-2 px-4 mb-4">In Planung</div>
          <span class="block text-4xl sm:text-6xl font-bold mb-1">Reste-Verkauf</span>
          <div class="text-2xl sm:text-4xl font-bold mb-7">Verkaufe deine Reste am Ende des Tages</div>
          <p class="mt-0 mb-5 text-xl text-700 line-height-3">
            Wir entwickeln gerade eine Funktion, mit der du deine Reste am Ende des Tages verkaufen kannst. So kannst
            du ganz einfach deine Reste verkaufen und musst sie nicht wegwerfen. Deine Kunden können dann ganz einfach
            deine Reste vorbestellen und dann bei dir abholen.
          </p>
        </section>
      </div>
    </div>


    <!-- FEATURES -->
    <div class="px-4 py-8 md:px-6 lg:px-8 text-center bg-neutral-100">
      <div class="mb-6 font-bold text-4xl lg:text-6xl lg:pt-12 ">
        <span class="text-gray-900">Einmal zahlen, </span>
        <span class="text-teal-800">unzählige Funktionen</span>
      </div>
      <div class="text-gray-700 lg:text-2xl text-lg mb-8 max-w-4xl mx-auto">Wir entwickeln unsere Plattform stetig
        weiter, alle
        Funktionen sind im Preis enthalten und jegliche Zusatzkosten.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-16 lg:max-w-6xl mx-auto">
        <!-- Transparent Pricing -->
        <div class="mb-4 px-5">
            <span class="p-3 shadow-lg mb-3 inline-block bg-white rounded-lg">
                <v-icon size="54" color="teal">mdi-water-opacity</v-icon>
            </span>
          <div class="text-gray-900 text-xl mb-3 font-medium">Transparente Preisgestaltung</div>
          <span class="text-gray-700">Keine versteckten Kosten. Gebühr 22€/Monat oder 220€/Jahr.</span>
        </div>

        <!-- Independence from Big Delivery Services -->
        <div class="mb-8 px-5">
            <span class="p-3 shadow-lg mb-3 inline-block bg-white rounded-lg">
                <v-icon size="54" color="teal">mdi-truck-delivery</v-icon>
            </span>
          <div class="text-gray-900 text-xl mb-3 font-medium">Unabhängigkeit von großen Lieferdiensten</div>
          <span class="text-gray-700">Direkte Bestellungen, keine hohen Plattformkosten.</span>
        </div>

        <!-- On-site Support -->
        <div class="mb-4 px-5">
            <span class="p-3 shadow-lg mb-3 inline-block bg-white rounded-lg">
                <v-icon size="54" color="teal">mdi-account-group</v-icon>
            </span>
          <div class="text-gray-900 text-xl mb-3 font-medium">Vor-Ort-Support</div>
          <span class="text-gray-700">Persönliche Unterstützung in Dresden.</span>
        </div>

        <!-- Compatibility and Flexibility -->
        <div class="mb-4 px-5">
            <span class="p-3 shadow-lg mb-3 inline-block bg-white rounded-lg">
                <v-icon size="54" color="teal">mdi-cellphone-link</v-icon>
            </span>
          <div class="text-gray-900 text-xl mb-3 font-medium">Kompatibilität und Flexibilität</div>
          <span class="text-gray-700">Für alle Android- und Apple-Geräte optimiert. Kein zusätzliches Gerät erforderlich.</span>
        </div>

        <!-- Collective Innovation -->
        <div class="mb-4 px-5">
            <span class="p-3 shadow-lg mb-3 inline-block bg-white rounded-lg">
                <v-icon size="54" color="teal">mdi-lightbulb-on-outline</v-icon>
            </span>
          <div class="text-gray-900 text-xl mb-3 font-medium">Gemeinsame Innovation</div>
          <span class="text-gray-700">Entwicklung neuer Features durch Austausch und Solidaritäts-Topf.</span>
        </div>

        <!-- Trusted Security -->
        <div class="mb-4 px-5">
            <span class="p-3 shadow-lg mb-3 inline-block bg-white rounded-lg">
                <v-icon size="54" color="teal">mdi-shield-check-outline</v-icon>
            </span>
          <div class="text-gray-900 text-xl mb-3 font-medium">Trusted Security</div>
          <span class="text-gray-700">Wir verwenden die neuesten Sicherheitsstandards und -technologien.</span>
        </div>
      </div>
    </div>

    <!--    <img src="/landing/draw_authentication_fs2.jpeg" alt="Image" class="w-full object-cover" style="height: 500px;"/>-->

    <!-- PRICING -->

    <div class="bg-gray-200 px-4 py-16 lg:px-24">
      <div class="text-gray-900 font-bold text-6xl mb-4 text-center">Preise</div>
      <div class="text-gray-700 lg:text-2xl text-lg mb-8 text-center">
        Wir bieten drei verschiedene Pakete an, um für alle einen fairen und bezahlbaren Preis zu ermöglichen.
        <br/>
        *Zukünftige Funktionen
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:max-w-6xl mx-auto">
        <!-- Basic Plan -->
        <div class="col-span-1">
          <div class="p-3 h-full">
            <div class="shadow-lg p-3 h-full flex flex-col bg-white rounded-md">
              <div class="text-gray-900 font-medium text-xl mb-2">Supporti</div>
              <div class="text-gray-600">Alle Funktionen, unterstützt andere Partner</div>
              <hr class="my-3 border-t border-gray-300"/>
              <div class="flex items-center">
                <span class="font-bold text-2xl text-gray-900">22€</span>
                <span class="ml-2 text-gray-600">pro Monat + freiwillig Soli-Beitrag</span>
              </div>
              <hr class="my-3 border-t border-gray-300"/>
              <ul class="list-none p-0 m-0 flex-grow">
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Online Vorbestellungen</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Vor Ort Bestellungen</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Tisch Reservierungen*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Live Auslastung anzeigen*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Digitale Speisekarte zur Bestellung am Tisch*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Reste-Verkauf am Ende des Tages*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Listung auf unserer Webseite*</span>
                </li>
              </ul>
              <hr class="mb-3 border-t border-gray-300 mt-auto"/>
              <v-btn rounded size="large" variant="flat" color="teal-darken-3" href="/partner-werden">Jetzt Partner
                werden
              </v-btn>
            </div>
          </div>
        </div>


        <!-- Basic Plan -->
        <div class="col-span-1">
          <div class="p-3 h-full">
            <div class="shadow-lg p-3 h-full flex flex-col bg-white rounded-md">
              <div class="text-gray-900 font-medium text-xl mb-2">Supporti</div>
              <div class="text-gray-600">Alle Funktionen, unterstützt andere Partner</div>
              <hr class="my-3 border-t border-gray-300"/>
              <div class="flex items-center">
                <span class="font-bold text-2xl text-gray-900">220€</span>
                <span class="ml-2 text-gray-600">pro Jahr + freiwillig Soli-Beitrag</span>
              </div>
              <hr class="my-3 border-t border-gray-300"/>
              <ul class="list-none p-0 m-0 flex-grow">
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Online Vorbestellungen</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Vor Ort Bestellungen</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Tisch Reservierungen*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Live Auslastung anzeigen*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Digitale Speisekarte zur Bestellung am Tisch*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Reste-Verkauf am Ende des Tages*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Listung auf unserer Webseite*</span>
                </li>
              </ul>
              <hr class="mb-3 border-t border-gray-300 mt-auto"/>
              <v-btn rounded size="large" variant="flat" color="teal-darken-3" href="/partner-werden">Jetzt Partner
                werden
              </v-btn>
            </div>
          </div>
        </div>


        <!-- Basic Plan -->
        <div class="col-span-1">
          <div class="p-3 h-full">
            <div class="shadow-lg p-3 h-full flex flex-col bg-white rounded-md">
              <div class="text-gray-900 font-medium text-xl mb-2">Soli-Plan</div>
              <div class="text-gray-600">Alle Funktionen, gestützt durch andere Partner</div>
              <hr class="my-3 border-t border-gray-300"/>
              <div class="flex items-center">
                <span class="font-bold text-2xl text-gray-900">110€</span>
                <span class="ml-2 text-gray-600">pro Jahr (Differenz aus Soli-Topf)</span>
              </div>
              <hr class="my-3 border-t border-gray-300"/>
              <ul class="list-none p-0 m-0 flex-grow">
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Online Vorbestellungen</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Vor Ort Bestellungen</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Tisch Reservierungen*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Live Auslastung anzeigen*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Digitale Speisekarte zur Bestellung am Tisch*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Reste-Verkauf am Ende des Tages*</span>
                </li>
                <li class="flex items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Listung auf unserer Webseite*</span>
                </li>
              </ul>
              <hr class="mb-3 border-t border-gray-300 mt-auto"/>
              <v-btn rounded size="large" variant="flat" color="grey" href="/kontakt">Kontaktiere uns</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>


  </v-main>
</template>
<style>
footer a:hover {
  text-decoration: underline;
}

footer a::after {
  content: ' ›';
}

/* .examples immer links das bild rechts der text. bzw auf mobilen geräten alles undereinander */
.examples {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.examples div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 300px;
  margin: 10px;
}

.examples div img {
  @apply rounded shadow bg-white border;
  width: 350px;
  height: 150px;
  object-fit: contain;
}

.examples div h2 {
  @apply md:h-24;
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .examples {
    flex-direction: column;
  }

  .examples div {
    width: 100%;
  }

  .examples div img {
    width: 100%;
    height: auto;
  }
}

</style>
<script setup lang="ts">
definePageMeta({layout: 'landing'})
</script>
