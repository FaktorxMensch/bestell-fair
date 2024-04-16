import {createClient} from '@supabase/supabase-js'

// dotenv
import {config} from 'dotenv'
config()

// zeit, nach der ein demo restaurant gelöscht wird
const lifeTime = 24 * 60 * 60 * 1000

export default defineEventHandler(async event => {

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

    // allow a maxium of 50 demo restaurants at a time
    const {
        data: demoRestaurants,
        error: demoRestaurantsError
    } = await supabase.from('restaurants').select().eq('is_demo', true)
    if (demoRestaurants && demoRestaurants.length >= 50) return {error: 'Max number of demo restaurants reached'}

    // delete all demo restaurants older than 5 minutes and that are is_demo=true
    const {
        data: deletedRestaurants,
        error: deletedRestaurantsError
    } = await supabase.from('restaurants').select().lt('created_at', new Date(Date.now() - lifeTime).toISOString()).eq('is_demo', true).select()

    // finde die zugehörigen user_owns_restaurant und lösche diese als auch die user
    if (deletedRestaurants) {
        for (const restaurant of deletedRestaurants) {
            console.log('deleting restaurant', restaurant.id, restaurant.name)
            const {
                data: userOwnsRestaurants,
                error: userOwnsRestaurantsError
            } = await supabase.from('user_owns_restaurant').delete().eq('restaurant_id', restaurant.id).select()
            console.log('found a user_owns_restaurant', userOwnsRestaurants)
            if (userOwnsRestaurantsError) return {userOwnsRestaurantsError}

            // now delete the restaurant
            const {
                data: deletedRestaurant,
                error: deletedRestaurantError
            } = await supabase.from('restaurants').delete().eq('id', restaurant.id).select()
            console.log('deleted restaurant', deletedRestaurant, deletedRestaurantError)

            for (const userOwnsRestaurant of userOwnsRestaurants) {
                console.log('deleted user_owns_restaurant', userOwnsRestaurant.id, userOwnsRestaurant.user_id)
                const {
                    data: user,
                    error: userError
                } = await supabase.auth.admin.deleteUser(userOwnsRestaurant.user_id)
                console.log('deleted user', userOwnsRestaurant.user_id)
                if (userError) return {userError}
            }
        }
    }

    // hole das beispiel restaurant
    const {
        data: demoRestaurant,
        error: demoRestaurantError
    } = await // get single restaurant with is_demo= true
        supabase.from('restaurants').select('*').eq('is_demo_template', true).single()

    // copy the demo restaurant to a new restaurant and set is_demo_template to false and is_demo to true and empty created_at
    const {
        data: newRestaurant,
        error: newRestaurantError
    } = await supabase.from('restaurants').insert({
        ...demoRestaurant,
        id: undefined,
        name: restaurantNamesGerman[Math.floor(Math.random() * restaurantNamesGerman.length)] + ' (Demo)',
        is_demo_template: false,
        is_demo: true,
        created_at: undefined
    }).single().select()

    // if creation failed, return
    if (newRestaurantError) return {
        demoRestaurantError,
        newRestaurantError,
        deletedRestaurants,
        deletedRestaurantsError
    }

    // successful, create a new dummy user which is already confirmed
    let password = ''
    for (let i = 0; i < 2; i++) {
        password += passwordParts[Math.floor(Math.random() * passwordParts.length)]
    }

    const newUserData = {
        // email ist der restaurant name ohne demo und ohne sonderzeichen, dann leerzeichen zu - ersetzen
        email: (newRestaurant.name.replace(' (Demo)', '').replace(/demo/g, '').replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + Math.floor(Math.random() * 100) + '@beispiel.de').toLowerCase(),
        password
    }
    const {
        data: newDummyUser,
        error: newDummyUserError
    } = await supabase.auth.admin.createUser({
        ...newUserData,
        email_confirm: true,
        user_metadata: {
            name: 'Demo User',
            role: 'demo',
        }
    })

    // newDummyUser.user.id soll mit dem newRestaurant.id verknüpft werden in user_owns_restaurant
    const {
        data: userOwnsRestaurant,
        error: userOwnsRestaurantError
    } = await supabase.from('user_owns_restaurant').insert({
        user_id: newDummyUser.user.id,
        restaurant_id: newRestaurant.id
    }).select()

    return {
        newUserData,
        // userOwnsRestaurant,
        // userOwnsRestaurantError,
        newRestaurant: {
            id: newRestaurant.id, name: newRestaurant.name,
            // deletedAfter: new Date(Date.now() + lifeTime).toISOString()
        },
    }
})

const restaurantNamesGerman = [
    "Zum goldenen Löffel",
    "Die Bratwurstbude",
    "Kleine Kneipe",
    "Das Gasthaus",
    "Gaststätte Zur Linde",
    "Zur alten Mühle",
    "Wirtshaus Zum Grünen Baum",
    "Zum Hirschen",
    "Ristorante Bella Italia",
    "Brauereigasthof Adler",
    "Weinstube Zum Schloss",
    "Gasthof Zur Post",
    "Gasthaus Zum Schützen",
    "Wirtshaus Zur Traube",
    "Restaurant Sonnenblick",
    "Hotel-Restaurant Löwen",
    "Schlossrestaurant",
    "Weinhaus Am Markt",
    "Zur Weinlaube",
    "Biergarten Zur alten Eiche",
    "Brasserie",
    "Café Am See",
    "Restaurant Zum Felsen",
    "Bäckerei-Café Sonnenschein",
    "Pizzeria Venezia",
    "Gasthof Zur Quelle",
    "Zum Ritter St. Georg",
    "Gasthof Zum Ochsen",
    "Zur Eiche",
    "Brauhaus Zum Schweinehund",
    "Die Weinstube",
    "Wirtshaus Zur Krone",
    "Gasthaus Zum Löwen",
    "Café Harmonie",
    "Restaurant Kaiserhof",
    "Bierstube Zum Anker",
    "Zur Burgschänke",
    "Die Dorfschänke",
    "Gasthof Zur Erholung",
    "Gasthof Zur schönen Aussicht",
    "Bräustüberl",
    "Gasthaus Zur alten Apotheke",
    "Gasthof Zur Mühle",
    "Wirtshaus Zum Falken",
    "Restaurant Zum Engel",
    "Bistro Le Petit",
    "Zum Waldhaus",
    "Gasthof Zum Fuchsbau",
    "Biergarten Am Weiher",
    "Die Kaffeestube",
    "Restaurant Zur Wasserburg",
    "Gasthaus Zur Forelle",
    "Wirtshaus Zur Sonne",
    "Café Altstadt",
    "Brauereigaststätte",
    "Pension-Restaurant Sonnenhof",
    "Gasthaus Zum alten Brauhaus",
    "Zum Landgasthof",
    "Gasthaus Zur Rose",
    "Gaststätte Zur Eisenbahn",
    "Restaurant Seeblick",
    "Wirtshaus Zur Wiese",
    "Biergarten Am Schlosspark",
    "Bratwurstbraterei",
    "Café am Rathausplatz",
    "Weinrestaurant Sonnenschein",
    "Gasthof Zur Taverne",
    "Zur Brotzeitstube",
    "Gasthof Zur Römerquelle",
    "Wirtshaus Zum Hafen",
    "Restaurant Zur Linde",
    "Gasthaus Zur guten Stube",
    "Brauhaus Zum Hirsch",
    "Gasthaus Zur alten Schmiede",
    "Gasthof Zum Wasserfall",
    "Café Zum Römer",
    "Bräustüble",
    "Zum Fischmarkt",
    "Gasthof Zur alten Brauerei",
    "Brauereigaststätte Zur Linde",
    "Biergarten Am Stadtpark",
    "Gasthaus Zum Storchennest",
    "Wirtshaus Zur alten Eiche",
    "Café Zur Stadtmauer",
    "Gasthof Zum Felsenblick",
    "Restaurant Zum Stadtgarten",
    "Zur Weinrebe",
    "Brauhaus Zur alten Stadt",
    "Gasthaus Zum goldenen Hirsch",
    "Biergarten Zum Kastanienbaum",
    "Gasthof Zur schönen Landschaft",
    "Bistro Le Soleil",
    "Restaurant Zur Seeterrasse",
    "Gasthaus Zur Linde",
    "Zum Grünen Tal",
    "Brauereigasthof Zur Post",
    "Gasthof Zum Landhaus",
    "Restaurant Zum Hirsch",
    "Biergarten Zur alten Scheune",
    "Gasthaus Zur alten Weide",
    "Wirtshaus Zum Kieferngrund",
    "Café Zur Sonnenterrasse",
    "Gasthof Zur Mühlenbach",
    "Brauhaus Zur goldenen Krone",
    "Gasthaus Zum Kirschbaum",
    "Biergarten Am Rathausplatz",
    "Gasthof Zur Brücke",
    "Restaurant Zum Taubenhaus",
    "Zur Schlemmerstube",
    "Gasthaus Zum Sternen",
    "Brauhaus Zum Felsen",
    "Gasthof Zur Waldbühne",
    "Gaststätte Zur alten Burg",
    "Café Am Markt",
    "Bierstube Zur Linde",
    "Gasthof Zur alten Eiche",
    "Restaurant Zur Linde",
    "Zum Alten Rathaus",
    "Brauereigasthof Zur Sonne",
    "Gasthof Zum Hirsch",
    "Biergarten Zur Quelle",
    "Gasthaus Zur Mühle",
    "Wirtshaus Zum Storchennest",
    "Café Am Seeufer",
    "Gasthof Zur Post",
    "Restaurant Zum Schloss",
    "Zur Bergquelle",
    "Brauhaus Zur alten Mühle",
    "Gasthaus Zum Friedenspark",
    "Gaststätte Zur Heide",
    "Café Am Flussufer",
    "Biergarten Am Waldesrand",
    "Gasthof Zur Höhle",
    "Restaurant Zum Kranz",
    "Zur Tafelrunde",
    "Brauhaus Zur goldenen Krone",
    "Gasthof Zur grünen Au",
    "Biergarten Zur Quelle",
    "Gasthaus Zur alten Eiche",
    "Wirtshaus Zur Heimat",
    "Café Am Bachlauf",
    "Gasthof Zum Schlossblick",
    "Restaurant Zur Seeblick",
    "Zum Wasserschloss",
    "Brauhaus Am Markt",
    "Gasthaus Zur alten Brücke",
    "Biergarten Zum Felsen",
    "Gasthof Zur Felsenquelle",
    "Wirtshaus Zur Quelle",
    "Café Zur Guten Stube",
    "Gasthaus Zum grünen Tal",
    "Restaurant Zur Post",
    "Zum Burggarten",
    "Brauereigasthof Am Markt",
    "Gasthof Zur alten Mühle",
    "Biergarten Zur Linde",
    "Gasthaus Zum goldenen Adler",
    "Wirtshaus Am Stadtrand",
    "Café Am Gartenteich",
    "Gasthof Zum Brunnen",
    "Restaurant Zur Blumenwiese",
    "Zur Dampflok",
    "Brauhaus Zur alten Stadtmauer",
    "Gasthaus Zur Römerquelle",
    "Biergarten Am Schlossgarten",
    "Gasthof Zur grünen Wiese",
    "Wirtshaus Am Waldrand",
    "Café Zur Sonnenwende",
    "Gasthaus Zum Treffpunkt",
    "Restaurant Am Markt",
    "Zur Kastanienallee",
    "Brauhaus Zur alten Eiche",
    "Gasthof Zur Burg",
    "Biergarten Am Park",
    "Gasthaus Zur alten Brauerei",
    "Wirtshaus Zur grünen Aue",
    "Café Am Marktplatz",
    "Gasthof Zum grünen Winkel",
    "Restaurant Zur Weinlaube",
    "Zur Fischerei",
    "Brauhaus Zur alten Linde",
    "Gasthaus Zur Sonnenblume",
    "Biergarten Am Teich",
    "Gasthof Zum Kirchturm",
    "Wirtshaus Am Bach",
    "Café Zur alten Schmiede",
    "Gasthof Zur Eiche",
    "Restaurant Am Flussufer",
    "Zur Gartenschänke",
    "Brauhaus Zur goldenen Sonne",
    "Gasthaus Zur alten Kelter",
    "Biergarten Am Dorfplatz",
    "Gasthof Zur Windmühle",
    "Wirtshaus Zur Linde",
    "Café Am Hafen"
]

const passwordParts = [
    "Mond", "Fisch", "Apfel", "Haus", "Wald",
    "Park", "Licht", "Spiel", "Blatt", "Hund",
    "Katze", "Ball", "Welle", "Maus", "Lied",
    "Kuh", "Kind", "Herz", "Buch", "Stuhl",
    "Tisch", "Stift", "Auto", "Boot", "Nase",
    "Fuß", "Nacht", "Tag", "Hut", "Hand",
    "Wurm", "Rose", "Hase", "Tee", "Bett",
    "Sand", "Gold", "Feder", "Tanz", "Fluss",
    "Sonne", "Morgen", "Wolke", "Brücke", "Tiger",
    "Ei", "Frosch", "Höhle", "Feld", "Berg",
    "See", "Flamme", "Dach", "Nebel", "Brille",
    "Hose", "Flasche", "Huhn", "Brot", "Lampe",
    "Hemd", "Kette", "Kuchen", "Pferd", "Ratte",
    "Korb", "Höhle", "Tiger", "Gans", "Krake",
    "Spinne", "Kran", "Boot", "Muschel", "Eule",
    "Biene", "Käfer", "Pilz", "Hase", "Fisch",
    "Fliege", "Ratte", "Igel", "Hirsch", "Rabe",
    "Fuchs", "Esel", "Käfer", "Fliege", "Hase",
    "Maulwurf", "Robbe", "Möwe", "Seestern", "Wurm",
    "Schaf", "Huhn", "Ziege", "Kamel", "Faultier",
    "Schlange", "Krokodil", "Delfin", "Schildkröte", "Krebs",
    "Hai", "Wal", "Schildkröte", "Pinguin", "Eisbär",
    "Känguru", "Panda", "Giraffe", "Nashorn", "Elefant",
    "Löwe", "Tiger", "Leopard", "Gepard", "Puma",
    "Jaguar", "Fuchs", "Wolf", "Hund", "Katze",
    "Eule", "Falke", "Adler", "Sperber", "Bussard",
    "Taube", "Spatz", "Schwalbe", "Möwe", "Kranich",
    "Sonnen", "Lach", "Sonne", "Glück",
    "Wunder", "Zauber", "Blüten", "Träume", "Spass",
    "Schnuck", "Nasch", "Knusper",
    "Kuschel", "Traum", "Wolken", "Träum", "Flausch", "Stern",
    "Zucker", "Blumen", "Fluff", "Kuss", "Wonne", "Schnuff",
    "Schnurr", "Knuff", "Sonn", "Flatter", "Schmatz", "Schnur"
];

