<template>

  <v-main>

    <!-- HERO -->
    <div class="text-800 flex flex-col md:flex-row">
      <div class="col-12 flex-1 md:col-6 p-8 md:text-left flex flex-col justify-center md:items-start">
        <section class="flex flex-col lg:px-12 gap-2">
          <span class="block text-6xl font-bold mb-1">Faire Vorbestellung</span>
          <div class="text-4xl font-bold mb-7">Vorbestellen ohne Provision zu zahlen</div>
          <p class="mt-0 mb-5 text-xl text-700 line-height-3">
            Unser Team hat es sich zur Aufgabe gemacht, die Gastronomie in der Dresdner Neustadt zu unterstützen.
            Wir bieten eine Plattform, auf der du deine Lieblingsgerichte vorbestellen kannst, um sie dann bei deinem
            Lieblingsrestaurant abzuholen. Dabei verzichten wir auf eine Provision, sodass die Restaurants den vollen
            Betrag erhalten.

          </p>
          <div>
            <v-btn rounded size="large" variant="flat" color="teal-darken-3" href="/register">Jetzt Partner werden
            </v-btn>
          </div>
        </section>
      </div>
      <div class="col-12 flex-1 md:col-6 overflow-hidden">
        <img src="/partner/draw_authentication_fs1.jpeg" alt="Image" class="md:ml-auto block"
             style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);min-height: calc(100vh - 64px);"/>
      </div>
    </div>


    <!-- FEATURES -->
    <div class="bg-gray-100 px-4 py-8 md:px-6 lg:px-8 text-center">
      <div class="mb-3 font-bold text-4xl lg:text-6xl lg:pt-8 ">
        <span class="text-gray-900">Eine Plattform, </span>
        <span class="text-teal-800">viele Vorteile</span>
      </div>
      <div class="text-gray-700 lg:text-2xl text-lg mb-8">Wir entwickeln unsere Plattform stetig weiter, um mehr Ideen
        zu
        verwirklichen.
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


    <!-- PRICING -->

    <div class="bg-gray-200 px-4 py-16 lg:px-24">
      <div class="text-gray-900 font-bold text-6xl mb-4 text-center">Unsere Preise</div>
      <div class="text-gray-700 text-xl mb-6 text-center leading-relaxed">
        Wir bieten drei verschiedene Pakete an, um für alle einen fairen Preis zu gewährleisten.
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:max-w-6xl mx-auto">
        <!-- Basic Plan -->
        <div class="col-span-1">
          <div class="p-3 h-full">
            <div class="shadow-lg p-3 h-full flex flex-col bg-white rounded-md">
              <div class="text-gray-900 font-medium text-xl mb-2">Supporti</div>
              <div class="text-gray-600">Alle Funktionen</div>
              <hr class="my-3 border-t border-gray-300"/>
              <div class="flex items-center">
                <span class="font-bold text-2xl text-gray-900">22€</span>
                <span class="ml-2 text-gray-600">pro Monat</span>
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
                  <span>Listung auf unserer Webseite*</span>
                </li>
              </ul>
              <hr class="mb-3 border-t border-gray-300 mt-auto"/>
              <v-btn rounded size="large" variant="flat" color="teal-darken-3" href="/register">Jetzt Partner werden
              </v-btn>
            </div>
          </div>
        </div>


        <!-- Basic Plan -->
        <div class="col-span-1">
          <div class="p-3 h-full">
            <div class="shadow-lg p-3 h-full flex flex-col bg-white rounded-md">
              <div class="text-gray-900 font-medium text-xl mb-2">Supporti</div>
              <div class="text-gray-600">Alle Funktionen</div>
              <hr class="my-3 border-t border-gray-300"/>
              <div class="flex items-center">
                <span class="font-bold text-2xl text-gray-900">220€</span>
                <span class="ml-2 text-gray-600">pro Jahr</span>
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
                  <span>Listung auf unserer Webseite*</span>
                </li>
              </ul>
              <hr class="mb-3 border-t border-gray-300 mt-auto"/>
              <v-btn rounded size="large" variant="flat" color="teal-darken-3" href="/register">Jetzt Partner werden
              </v-btn>
            </div>
          </div>
        </div>


        <!-- Basic Plan -->
        <div class="col-span-1">
          <div class="p-3 h-full">
            <div class="shadow-lg p-3 h-full flex flex-col bg-white rounded-md">
              <div class="text-gray-900 font-medium text-xl mb-2">Soli-Plan</div>
              <div class="text-gray-600">Alle Funktionen (Preis-Differenz wird vom Soli-Topf gezahlt)</div>
              <hr class="my-3 border-t border-gray-300"/>
              <div class="flex items-center">
                <span class="font-bold text-2xl text-gray-900">85€</span>
                <span class="ml-2 text-gray-600">pro Jahr, bitte sprich uns per E-mail an.</span>
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
</style>
<script setup lang="ts">
</script>
