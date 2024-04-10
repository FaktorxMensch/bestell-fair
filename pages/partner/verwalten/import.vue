<template>
  <v-textarea v-model="instruction" label="Kopiere folgenden Prompt in ChatGPT" rows="4"></v-textarea>
  <v-textarea v-model="importJSON" label="Füge die JSON-Antwort hier ein" rows="4"/>
  <v-btn @click="importNow">JSON-Antwort jetzt importieren</v-btn>

</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
const verwaltenStore = useVerwaltenStore()
const {restaurants} = storeToRefs(verwaltenStore)

const exampleRestaurant = {
  // "id": "8c9ca1b6-0f91-407f-a073-c2b90407d571",
  "lat": 13.72094,
  "lon": 51.03439,
  "name": "McDagobert's",
  "tags": null,
  "opened": false,
  "visible": true,
  "website": "www.ziegenhagel.com",
  "location": "Emder Straße 21 26603 Aurich",
  "products": [{
    "name": "20 Chicken McNuggets®",
    "tags": ["vegetarisch", "vegan"],
    "image": "7aa95723-34a3-42d3-b71a-7bc8998fcffe/products/ta-gui_de_main_2120.avif",
    "price": "11.490",
    "category": "Beliebt ❤️",
    "additives": ["5436", "65", "456", "465"],
    "allergens": ["fdsa", "fds", "a", "431"],
    "description": "Mit saftigem Hähnchenbrustfleisch",
    "ingredients": ["ffdsa", "fdsa", "fsd"],
    "optionGroups": [{
      "name": "Sauße",
      "default": 0,
      "options": [{
        "name": "Sweet Chili Sauce 25ml",
        "price": 0,
        "additives": [],
        "allergens": [],
        "ingredients": []
      }, {"name": "Ketchup", "price": "0.6", "additives": [], "allergens": [], "ingredients": []}],
      "multiple": true
    }]
  }, {
    "name": "Big Mac® McMenü®",
    "tags": [],
    "image": "7aa95723-34a3-42d3-b71a-7bc8998fcffe/products/ta-gui_de_main_2838.avif",
    "price": "10.89",
    "category": "Beliebt ❤️",
    "additives": [],
    "allergens": [],
    "description": "1 Klassiker + 1 Beilage + 1 Getränk. Bei Auswahl pfandpflichtiger Getränke erhöht sich der Endpreis um das Pfand (+ 0,25 € EINWEG). Infos zu Allergenen u. Zusatzstoffen siehe jew. Einzelprodukt der Kategorien Burger, McNuggets oder McPlant.",
    "ingredients": [],
    "optionGroups": [{
      "name": "Sauce 1/3",
      "default": 2,
      "options": [{
        "name": "Sweet Chili Sauce 25ml",
        "price": 0,
        "additives": [],
        "allergens": ["brot"],
        "ingredients": []
      }, {
        "name": "Sour Cream-Schnittlauch Dip 25ml",
        "price": "1",
        "additives": ["e512"],
        "allergens": ["käse", "brat"],
        "ingredients": ["mehl ei", "zutat"]
      }, {
        "name": "Ketchup",
        "price": "0.5",
        "additives": [],
        "allergens": ["süsmplkepulver und ", "ei"],
        "ingredients": []
      }]
    }, {
      "name": "Sauce 2/3",
      "default": 0,
      "options": [{"name": "Ketchup", "price": 0, "additives": [], "allergens": [], "ingredients": []}],
      "mandatory": true
    }, {
      "name": "Ihr Big Mac",
      "default": [1],
      "options": [{
        "name": "ohne Sauce ",
        "price": "0.5",
        "additives": ["4321", "423"],
        "allergens": [],
        "ingredients": []
      }, {
        "name": "ohne Zwiebeln",
        "price": "-.5",
        "additives": [],
        "allergens": ["fdsa fsd", "fdsa", "afds"],
        "ingredients": ["zweibel"]
      }, {"name": "ohne Salat", "price": 0, "additives": [], "allergens": [], "ingredients": ["fads"]}],
      "multiple": true,
      "mandatory": false
    }, {
      "name": "Neue Optionsgruppe #4",
      "options": [{
        "name": "Neue Option #1",
        "price": 0,
        "additives": [],
        "allergens": [],
        "ingredients": []
      }, {"name": "Neue Option #2", "price": 0, "additives": [], "allergens": [], "ingredients": []}]
    }]
  }, {
    "name": "Neues Produkt #3",
    "tags": [],
    "image": null,
    "price": 0,
    "category": "",
    "additives": [],
    "allergens": [],
    "description": "",
    "ingredients": [],
    "optionGroups": [{"name": "Neue Optionsgruppe #1fasd", "options": []}, {
      "name": "Neue Optionsgruppe #2",
      "options": []
    }]
  }],
  "description": "Hier steht eine Zeile zu dem Restaurant",
  "contact_name": "Domi",
  "contact_email": "domi@ffjdkasljlfd.de",
  "contact_phone": "043215241",
  "custom_fields": ["Tischnummer", "Lieferadresse"],
  "opening_hours": [{"day_open": 1, "time_open": "20:00", "time_close": "23:00"}, {
    "day_open": 3,
    "time_open": "00:30",
    "time_close": "23:30"
  }, {"day_open": 4, "time_open": "07:00", "time_close": "12:30"}, {
    "day_open": 5,
    "time_open": "09:00",
    "time_close": "23:30"
  }, {"day_open": 6, "time_open": "02:00", "time_close": "00:00 (nächster Tag)"}],
  "icon_image_url": "7aa95723-34a3-42d3-b71a-7bc8998fcffe/products/SCR-20240128-kqmt.png",
  "payment_methods": ["Apple Pay", "Paypal", "Kreditkarte"],
  "feature_image_url": "7aa95723-34a3-42d3-b71a-7bc8998fcffe/products/header.avif"
}
const instruction = `Du hilfst beim Einpflegen von Restaurants in einen Bestellservice. Das Ausgabeformat ist ein riesen JSON String pro Restaurant.
Der User wird Dir vielleicht auch eine Menge Informationen irgendwo zufällig herkopieren. Versuche das auch in diesen Kontext zu parsen.
Du holst Dir vom User alle Infos ein, sofern er sie Dir nicht bereits gegeben hat.
Antworte auf keinen Fall, bevor Du nicht alle Informationen hast.
Insbesondere zu den Öffnungszeiten und der Speisekarte sowie allen Konfigurationsoptionen innerhalb der Speisekarte.

Danach antwortest Du in folgendem validen JSON Schema:
${JSON.stringify(exampleRestaurant)}
`

const importJSON = ref('{\n' +
    '  "id": 367128,\n' +
    '  "lat": null,\n' +
    '  "lon": null,\n' +
    '  "name": null,\n' +
    '  "tags": null,\n' +
    '  "opened": false,\n' +
    '  "visible": true,\n' +
    '  "website": null,\n' +
    '  "location": null,\n' +
    '  "products": [\n' +
    '    {\n' +
    '      "name": "Falafelrolle",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "6.00",\n' +
    '      "category": "Hauptgericht",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Falafelrolle",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Teller nach arabischer Art",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "7.50",\n' +
    '      "category": "Hauptgericht",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Teller nach arabischer Art",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Vegetarischer Teller",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "8.50",\n' +
    '      "category": "Hauptgericht",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Vegetarischer Teller",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Salat Teller",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "8.50",\n' +
    '      "category": "Hauptgericht",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Salat Teller",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Hähnchen-Teller",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "9.00",\n' +
    '      "category": "Hauptgericht",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Hähnchen-Teller",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Kufta Teller",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "9.50",\n' +
    '      "category": "Hauptgericht",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Kufta Teller",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "3 Falafel",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "1.50",\n' +
    '      "category": "Kleinere Leckereien",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "3 Falafel",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Arabisches Brot 1 St.",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "1.50",\n' +
    '      "category": "Kleinere Leckereien",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Arabisches Brot 1 St.",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Baklava",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "1.50",\n' +
    '      "category": "Kleinere Leckereien",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Baklava",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Gewürzte Oliven",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "3.00",\n' +
    '      "category": "Kleinere Leckereien",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Gewürzte Oliven",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Hummus",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "3.50",\n' +
    '      "category": "Kleinere Leckereien",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Hummus",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Linsensuppe",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "3.50",\n' +
    '      "category": "Kleinere Leckereien",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Linsensuppe",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    },\n' +
    '    {\n' +
    '      "name": "Salat nach Saison",\n' +
    '      "tags": [],\n' +
    '      "image": null,\n' +
    '      "price": "3.50",\n' +
    '      "category": "Kleinere Leckereien",\n' +
    '      "additives": [],\n' +
    '      "allergens": [],\n' +
    '      "description": "Salat nach Saison",\n' +
    '      "ingredients": [],\n' +
    '      "optionGroups": []\n' +
    '    }\n' +
    '  ],\n' +
    '  "description": "Für Studierende gibt es 1€ Rabatt auf alle Hauptgerichte!",\n' +
    '  "contact_name": null,\n' +
    '  "contact_email": null,\n' +
    '  "contact_phone": null,\n' +
    '  "custom_fields": [],\n' +
    '  "opening_hours": [],\n' +
    '  "icon_image_url": null,\n' +
    '  "payment_methods": [],\n' +
    '  "feature_image_url": null\n' +
    '}\n')

const importNow = () => {
  try {
    const json = JSON.parse(importJSON.value)
    verwaltenStore.pushRestaurant(json)
    console.log(json)
  } catch (e) {
    alert(e)
  }
}
</script>
