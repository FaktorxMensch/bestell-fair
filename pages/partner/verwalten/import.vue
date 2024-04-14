<template>
  <h1 class="text-3xl font-bold mb-5">Account erstellen</h1>
  <div class="flex gap-2">
    <v-text-field v-model="signUp.name" label="Name"/>
    <v-text-field v-model="signUp.email" label="E-Mail" type="email"/>
    <v-text-field v-model="signUp.password" label="Passwort"/>
  </div>
  <div class="flex gap-2">
    <v-btn @click="signUpNow"
           color="primary"
           prepend-icon="mdi-account">Account erstellen
    </v-btn>
    <v-spacer/>
    <v-btn @click="fakeUser" color="grey" prepend-icon="mdi-account">Fake User erstellen</v-btn>
    <v-btn @click="randomPass" color="grey" prepend-icon="mdi-key">Passwort generieren</v-btn>
  </div>

  <h1 class="text-3xl font-bold mb-5">Restaurant importieren</h1>
  <v-textarea v-model="instruction" label="Kopiere folgenden Prompt in ChatGPT" rows="4"></v-textarea>
  <v-textarea v-model="importJSON" label="Füge die JSON-Antwort hier ein" rows="4"/>
  <v-btn :disabled="!newUser" @click="importNow">JSON-Antwort jetzt importieren</v-btn>

  <div v-if="newRestaurant" class="border-t">
    <h1 class="text-3xl font-bold mb-5">Text für Kund:innen</h1>
    <textarea v-model="newRestaurantText" class="w-full h-96" readonly></textarea>
  </div>


  <h1 class="text-3xl font-bold mb-5">Freigabe per PostgreSQL</h1>
  <p class="text-lg">Führe folgendes SQL-Statement aus, um die E-Mail-Adresse zu bestätigen:</p>
  <div
      class="bg-gray-100 p-4 rounded-lg text-sm"
      label="SQL-Statement" rows="4"> update auth.users set email_confirmed_at = now() where  true </div>
</template>
<script setup>
definePageMeta({layout: 'partner-verwalten'})
const verwaltenStore = useVerwaltenStore()
const {restaurants} = storeToRefs(verwaltenStore)
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signUp = ref({
  email: '',
  name: '',
  password: ''
})

const randomPass = () => {
  // 100 adjektive in der küche/essen
  const randomAdjektive = ['scharf', 'salzig', 'süß', 'bitter', 'saftig', 'knusprig', 'cremig', 'fluffig', 'kross', 'zart', 'würzig', 'mild', 'fruchtig', 'herzhaft', 'fettig', 'fettarm', 'fettfrei']
  const randomWorte = ['Hund', 'Katze', 'Maus', 'Haus', 'Auto', 'Brot', 'Käse', 'Wurst', 'Kuchen', 'Kaffee', 'Tee', 'Milch', 'Zucker', 'Salz', 'Pfeffer', 'Butter', 'Marmelade', 'Honig', 'Ei', 'Mehl', 'Zitrone', 'Orange', 'Apfel', 'Birne', 'Banane', 'Erdbeere', 'Himbeere', 'Blaubeere', 'Kirsche', 'Pfirsich', 'Pflaume', 'Zwetschge', 'Kürbis', 'Gurke', 'Tomate', 'Kartoffel', 'Zwiebel', 'Knoblauch', 'Paprika', 'Chili', 'Ingwer', 'Koriander', 'Petersilie', 'Basilikum', 'Rosmarin', 'Thymian', 'Majoran', 'Oregano', 'Salbei', 'Lavendel', 'Minze', 'Zitronenmelisse', 'Kamille', 'Fenchel', 'Anis', 'Kümmel', 'Kreuzkümmel', 'Kardamom', 'Vanille', 'Zimt', 'Nelke', 'Muskat', 'Piment', 'Curry', 'Kurkuma', 'Safran', 'Senf', 'Meerrettich', 'Wasabi', 'Sojasauce', 'Worcestersauce', 'Ketchup', 'Mayonnaise', 'Senf', 'Remoulade', 'Tartare', 'Aioli', 'Pesto', 'Guacamole', 'Salsa', 'Chutney', 'Relish', 'Sambal', 'Harissa', 'Ajvar', 'Tapenade', 'Hummus', 'Tzatziki', 'Cacik', 'Labneh', 'Baba Ganoush', 'Muhammara', 'Skordalia', 'Raita', 'Miso', 'Tahini', 'Peanutbutter', 'Nutella', 'Marmite', 'Vegemite', 'Haggis', 'Surströmm']
  const randomFarben = ['rot', 'grün', 'blau', 'gelb', 'orange', 'lila', 'rosa', 'schwarz', 'weiß', 'braun', 'grau', 'silber', 'gold', 'türkis', 'magenta', 'cyan', 'indigo', 'violett', 'beige', 'khaki', 'oliv', 'apricot', 'koralle', 'rosé', 'mint', 'limette', 'zitrone', 'mandarine', 'kastanie', 'kupfer', 'bronze', 'bernstein', 'saphir', 'rubin', 'smaragd', 'topas', 'opal', 'amethyst', 'granat', 'peridot', 'aquamarin', 'turmalin', 'malachit', 'onyx', 'karneol', 'jade', 'lapislazuli', 'tansanit', 'morganit']
  const randomEssen = ['Pizza', 'Pasta', 'Burger', 'Salat', 'Suppe', 'Eintopf', 'Curry', 'Sushi', 'Tapas', 'Tacos', 'Burritos', 'Enchiladas', 'Quesadillas', 'Tortillas', 'Empanadas', 'Arepa', 'Pupusa', 'Tamales', 'Ceviche', 'Chimichanga', 'Fajitas', 'Mole', 'Chili', 'Gumbo', 'Jambalaya', 'Grits', 'Biscuits', 'Gravy', 'Pancakes', 'Waffles', 'French Toast', 'Croissant', 'Baguette', 'Ciabatta', 'Focaccia', 'Pretzel', 'Bagel', 'Muffin', 'Donut', 'Cupcake', 'Brownie', 'Cookie', 'Pie', 'Cobbler', 'Crisp', 'Crumble', 'Pudding', 'Parfait', 'Trifle', 'Mousse', 'Sorbet', 'Gelato', 'Sherbet', 'Granita', 'Popsicle', 'Ice Cream', 'Sundae', 'Float', 'Milkshake', 'Smoothie', 'Juice', 'Lemonade', 'Iced Tea', 'Coffee', 'Espresso', 'Cappuccino', 'Latte', 'Mocha', 'Macchiato', 'Americano', 'Affogato', 'Tea', 'Chai', 'Matcha', 'Hot Chocolate', 'Cider', 'Eggnog', 'Punch', 'Sangria', 'Margarita', 'Mojito', 'Martini', 'Mimosa', 'Cosmopolitan', 'Daiquiri', 'Mai Tai', 'Pina Colada', 'Mule', 'Screwdriver', 'Bloody Mary', 'Mint Julep', 'Old Fashioned', 'Manhattan', 'Negroni', 'Whiskey Sour', 'Tom Collins', 'Gin Fizz', 'Sidecar', 'Bellini', 'Kir Royale', 'Spritz', 'Paloma', 'Dark and Stormy', 'Pisco Sour', 'Caipirinha', 'Moscow Mule', 'Mojito', 'Margarita']
  const allesZusammen = [...randomAdjektive, ...randomWorte, ...randomFarben, ...randomEssen]

  let parts = []
  for (let i = 0; i < 2; i++) {
    parts.push(allesZusammen[Math.floor(Math.random() * allesZusammen.length)])
  }
  const pass = parts.join(Math.floor(Math.random() * 100) + '-')
  // werfe per regex alle nicht alphanumerischen oder - oder zahlen raus
  signUp.value.password = pass.replace(/[^a-zA-Z0-9-]/g, '')
}

const newUser = ref(null)


const signUpNow = async () => {
  try {

    const {data, error} = await supabase.auth.getSession()
    console.log('session:', data, error)

    let {data: data2, error: error2} = await supabase.auth.signUp({
      email: signUp.value.email,
      password: signUp.value.password,
      options: {
        data: {
          name: signUp.value.name,
          generator: 'import',
          role: 'partner',
        }
      }
    })

    if (!data2) {
      alert(error2.message)
      return
    }

    console.log('user id:', data2?.user?.id)
    newUser.value = data2?.user

    await supabase.auth.setSession(data.session)

    await Swal.fire({
      title: 'Erfolgreich!',
      text: 'Dein Account wurde erstellt.',
      icon: 'success',
      timer: 1000,
      confirmButtonText: 'OK',
    })
  } catch (e) {
    alert(e.message)
  }
}

const fakeUser = () => {
  const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Samuel', 'Taylor', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yvonne', 'Zachary'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford', 'Hamilton', 'Graham', 'Sullivan', 'Wallace', 'Woods', 'Cole', 'West', 'Jordan', 'Owens', 'Reynolds', 'Fisher', 'Ellis', 'Harrison', 'Gibson', 'Mcdonald', 'Cruz', 'Marshall', 'Ortiz', 'Gomez', 'Murray', 'Freeman', 'Wells', 'Webb', 'Simpson', 'Stevens', 'Tucker', 'Porter', 'Hunter', 'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Morales', 'Kennedy', 'Warren', 'Dixon', 'Ramos', 'Reyes', 'Burns', 'Gordon', 'Shaw', 'Holmes', 'Rice', 'Robertson', 'Hunt', 'Black', 'Daniels', 'Palmer', 'Mills', 'Nichols', 'Grant', 'Knight', 'Ferguson', 'Rose', 'Stone', 'Hawkins', 'Dunn', 'Perkins', 'Hudson', 'Spencer', 'Gardner', 'Stephens', 'Payne', 'Pierce', 'Berry', 'Matthews', 'Arnold', 'Wagner', 'Willis', 'Ray', 'Watkins', 'Olson', 'Carroll', 'Duncan', 'Snyder', 'Hart', 'Cunningham', 'Bradley', 'Lane', 'Andrews', 'Ruiz', 'Harper', 'Fox', 'Riley', 'Armstrong', 'Carpenter', 'Weaver', 'Greene', 'Lawrence', 'Elliott', 'Chavez', 'Sims', 'Austin', 'Peters', 'Kelley', 'Franklin', 'Lawson', 'Fields', 'Gutierrez', 'Ryan', 'Schmidt', 'Carr', 'Vasquez', 'Castillo', 'Wheeler', 'Chapman', 'Oliver', 'Montgomery', 'Richards', 'Williamson', 'Johnston', 'Banks', 'Meyer', 'Bishop', 'Mccoy', 'Howell', 'Alvarez', 'Morrison', 'Hansen', 'Fernandez', 'Garza', 'Harvey', 'Little', 'Burton', 'Stanley', 'Nguyen', 'George', 'Jacobs', 'Reid', 'Kim', 'Fuller', 'Lynch', 'Dean', 'Gilbert', 'Garrett', 'Romero', 'Welch', 'Larson', 'Frazier', 'Burke', 'Hanson', 'Day', 'Mendoza', 'Moreno', 'Bowman', 'Medina', 'Fowler', 'Brewer', 'Hoffman', 'Carlson', 'Silva', 'Pearson', 'Holland', 'Douglas', 'Fleming', 'Jensen', 'Vargas', 'Byrd', 'Davidson', 'Hopkins', 'May', 'Terry', 'Herrera', 'Wade', 'Soto', 'Walters', 'Curtis', 'Neal', 'Caldwell', 'Lowe', 'Jennings', 'Barnett', 'Graves', 'Jimenez', 'Horton', 'Shelton', 'Barrett', 'Obrien', 'Castro', 'Sutton', 'Gregory', 'Mckinney', 'Lucas', 'Miles', 'Craig', 'Rodriquez', 'Chambers', 'Holt', 'Lambert', 'Fletcher', 'Watts', 'Bates', 'Hale', 'Rhodes', 'Pena', 'Beck', 'Newman', 'Haynes', 'Mcdaniel', 'Mendez', 'Bush', 'Vaughn', 'Parks', 'Dawson', 'Santiago', 'Norris', 'Hardy', 'Love', 'Steele', 'Curry', 'Powers', 'Schultz', 'Barker', 'Guzman', 'Page', 'Munoz', 'Ball', 'Keller', 'Chandler', 'Weber', 'Leonard', 'Walsh', 'Lyons', 'Ramsey', 'Wolfe', 'Schneider', 'Mullins', 'Benson', 'Sharp', 'Bowen', 'Daniel', 'Barber', 'Cummings', 'Hines', 'Baldwin', 'Griffith', 'Valdez', 'Hubbard', 'Salazar', 'Reeves', 'Warner', 'Stevenson', 'Burgess', 'Santos', 'Tate', 'Cross', 'Garner', 'Mann', 'Mack', 'Moss', 'Thornton', 'Dennis', 'Mcgee', 'Farmer', 'Delgado', 'Aguilar', 'Vega', 'Glover', 'Manning', 'Cohen', 'Harmon', 'Rodgers', 'Robbins', 'Newton', 'Todd', 'Blair', 'Higgins', 'Ingram', 'Reese', 'Cannon', 'Strickland', 'Townsend', 'Potter', 'Goodwin', 'Walton']

  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
  const email = `${name.replace(/ /g, '.').toLowerCase()}@mail.bestell-fair.de`

  signUp.value.email = email.replace(/ /g, '').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9.@-]/g, '')
  signUp.value.name = name

  randomPass()
}

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
Insbesondere zu den Öffnungszeiten (0=Mo,1=Di,...) und der Speisekarte sowie allen Konfigurationsoptionen innerhalb der Speisekarte.

Danach antwortest Du in folgendem validen JSON Schema:
${JSON.stringify(exampleRestaurant)}
`

const importJSON = ref(`{
  "lat": 0,
  "lon": 0,
  "name": "Fatima und die 9 Zwerge",
  "tags": null,
  "opened": true,
  "visible": true,
  "website": "https://fatima-dresden.de/",
  "location": "Nürnberger Str. 28, 01187 Dresden",
  "products": [
    {
      "name": "Falafelrolle",
      "tags": [],
      "image": null,
      "price": "6.00",
      "category": "Hauptgericht",
      "additives": [],
      "allergens": [],
      "description": "",
      "ingredients": [],
      "optionGroups": []
    },
    {
      "name": "Teller nach arabischer Art",
      "price": "7.50",
      "category": "Hauptgericht"
    },
    {
      "name": "Vegetarischer Teller",
      "price": "8.50",
      "category": "Hauptgericht"
    },
    {
      "name": "Salat Teller",
      "price": "8.50",
      "category": "Hauptgericht"
    },
    {
      "name": "Hähnchen-Teller",
      "price": "9.00",
      "category": "Hauptgericht"
    },
    {
      "name": "Kufta Teller",
      "price": "9.50",
      "category": "Hauptgericht"
    },
    {
      "name": "3 Falafel",
      "price": "1.50",
      "category": "Kleinere Leckereien"
    },
    {
      "name": "Arabisches Brot 1 St.",
      "price": "1.50",
      "category": "Kleinere Leckereien"
    },
    {
      "name": "Baklava",
      "price": "1.50",
      "category": "Kleinere Leckereien"
    },
    {
      "name": "Gewürzte Oliven",
      "price": "3.00",
      "category": "Kleinere Leckereien"
    },
    {
      "name": "Hummus",
      "price": "3.50",
      "category": "Kleinere Leckereien"
    },
    {
      "name": "Linsensuppe",
      "price": "3.50",
      "category": "Kleinere Leckereien"
    },
    {
      "name": "Salat nach Saison",
      "price": "3.50",
      "category": "Kleinere Leckereien"
    }
  ],
  "description": "Die Oase für orientalische Leckereien und arabische Gastfreundschaft in Dresden. Für Studierende gibt es 1€ Rabatt auf alle Hauptgerichte!",
  "contact_name": "",
  "contact_email": "",
  "contact_phone": "0178 8172441",
  "custom_fields": ["Serviceoptionen: Nur Barzahlung", "Sitzgelegenheiten im Freien", "Keine Reservierungen möglich"],
  "opening_hours": [
    {
      "day_open": 1,
      "time_open": "12:00",
      "time_close": "23:30"
    },
    {
      "day_open": 2,
      "time_open": "12:00",
      "time_close": "23:30"
    },
    {
      "day_open": 3,
      "time_open": "12:00",
      "time_close": "23:30"
    },
    {
      "day_open": 4,
      "time_open": "12:00",
      "time_close": "23:30"
    },
    {
      "day_open": 5,
      "time_open": "12:00",
      "time_close": "23:30"
    },
    {
      "day_open": 6,
      "time_open": "12:00",
      "time_close": "23:30"
    }
  ],
  "icon_image_url": "",
  "payment_methods": ["Barzahlung"],
  "feature_image_url": ""
}
`)

const newRestaurant = ref(null)

const importNow = async () => {
  try {
    const json = JSON.parse(importJSON.value)
    const id = crypto.randomUUID();
    newRestaurant.value = {...json, id}

    // in supabase create into restaurants
    const {data, error} = await supabase
        .from('restaurants')
        .insert(newRestaurant.value)
        .select()

    console.log('restaurant created', data, error)
    verwaltenStore.pushRestaurant(newRestaurant.value)

    // if failed, show error
    if (error) {
      alert('Fehler beim Importieren: ' + error.message)
    } else {
      Swal.fire({
        title: 'Restaurant importiert!',
        text: 'Das Restaurant wurde erfolgreich importiert.',
        timer: 1000,
        icon: 'success',
        confirmButtonText: 'Schließen'
      })
    }

    // insert into user_owns_restaurant
    const {data: user_owns_restaurant, error: error2} = await supabase.from('user_owns_restaurant')
        .insert({user_id: newUser.value.id, restaurant_id: id}).select();

    console.log('user_owns_restaurant', user_owns_restaurant, error2)
    if (error2) alert('Fehler beim Zuweisen des Restaurants: ' + error2.message)

    // also add an entry for the current user
    const {data: user_owns_restaurant2, error: error3} = await supabase.from('user_owns_restaurant')
        .insert({user_id: user.value.id, restaurant_id: id}).select();
    if (error3) alert('Fehler beim Zuweisen des Restaurants: ' + error3.message)
    console.log('user_owns_restaurant2', user_owns_restaurant2, error3)

  } catch (e) {
    alert(e)
  }
}

// wenns nach dem 12 april ist, leere das json
if (new Date() > new Date('2024-04-16')) {
  importJSON.value = ''
}

const newRestaurantText = computed(() => {
  if (!newRestaurant.value) return ''
  return `\
Hallo ${signUp.value?.name},

Ihr Restaurant "${newRestaurant.value.name}" ist jetzt in unserem System eingepflegt.
Sie finden es unter folgendem Link: https://bestell-fair.de/restaurant/${newRestaurant.value.id}

Bitte überprüfen Sie die Angaben und sagen Sie uns Bescheid, wenn etwas nicht stimmt.

Falls Sie selbst noch Änderungen vornehmen möchten, können Sie sich auch unter folgendem Link einloggen: https://bestell-fair.de/login
Ihre Zugangsdaten sind:

E-Mail: ${signUp.value?.email}
Passwort: ${signUp.value?.password}

Um später die Bestellungen zu verwalten, klicken Sie auf ihrem Tablet oder Smartphone nach dem Einloggen in der Seitenleiste auf "Bestellungen".

Bei Fragen rufen Sie uns gerne an unter 0162 68 99 628 oder schreiben Sie uns eine E-Mail an info@bestell-fair.de, wir helfen Ihnen gerne weiter.

Viele Grüße,
Ihr Bestell-Fair Team aus der Dresdner Neustadt
`
})
</script>
