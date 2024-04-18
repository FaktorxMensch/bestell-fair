// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/supabase",
        'vuetify-nuxt-module',
        '@sidebase/nuxt-pdf',
        "@pinia-plugin-persistedstate/nuxt"
    ],
    app: {
        head: {
            title: 'Bestell Fair',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {hid: 'description', name: 'description', content: ''},
                // web app capable
                {name: 'mobile-web-app-capable', content: 'yes'},
                {name: 'apple-mobile-web-app-capable', content: 'yes'},
                // web app icon
                {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
                {name: 'theme-color', content: '#282d37'},
                // favicon
                {rel: 'icon', type: 'image/x-icon', href: '/logo.png'},
                {rel: 'apple-touch-icon', href: '/logo.png'},

            ],
            link: [{rel: 'icon', type: 'image/x-icon', href: '/logo.png'}],
            // favicon
        },
    },
    supabase: {
        redirectOptions: {
            exclude: ["/", "/test", "/login", "/register", "/kontakt", "/partner-werden", "/confirm", "/demo",
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
    vuetify: {
        moduleOptions: {
            /* module specific options */
        },
        vuetifyOptions: {
            /* vuetify options */
            defaults: {
                VTextarea: {variant: 'outlined', density: 'comfortable'},
                VTextField: {variant: 'outlined', density: 'comfortable'},
                VCombobox: {variant: 'outlined', density: 'comfortable'},
                VSelect: {variant: 'outlined', density: 'comfortable'},
                VSwitch: {variant: 'outlined', density: 'comfortable'},
                VBtn: {color: 'teal-darken-3', style: {'text-transform': 'none', 'letter-spacing': 'initial'}},
                VCard: {
                    VCard: {
                        VTextField: {density: 'compact'},
                        VCombobox: {density: 'compact'},
                    }
                },
                VList: {
                    VBtn: {variant: 'flat'}
                }
            },
        }
    }
})

/*
  defaults: {
                global: {
                    // ripple: false,
                },
                VBtn: {
                    variant: 'flat',
                    color: '#282d37',
                    style: 'text-transform: none;',
                    size: 'large',
                },
 */
