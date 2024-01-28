// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/supabase",
        "nuxt-vuetify",
        "@pinia-plugin-persistedstate/nuxt"
    ],
    app: {
        head: {
            title: 'Bestell Fair',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {hid: 'description', name: 'description', content: ''},
            ],
            link: [{rel: 'icon', type: 'image/x-icon', href: '/icon.png'}],
            // favicon


        },
    },
    supabase: {
        redirectOptions: {
            exclude: ["/", "/test", "/login", "/register", "/kontakt", "/partner-werden", "/confirm",
                "/restaurant", "/restaurant/**", "/bestellung", "/bestellung/**", "/partner/inbox", "/partner/inbox/**"
            ],

        }
    },
    imports: {
        presets: [{
            // run yarn add sweetalert2
            from: 'sweetalert2',
            imports: [{name: 'default', as: 'Swal'}],
        }]
    },
    css: ['~/assets/css/main.sass'],
    ssr: false,
})
