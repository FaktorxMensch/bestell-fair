// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/supabase", "nuxt-vuetify"],
    supabase: {
        redirectOptions: {
            exclude: ["/login", "/register"],
        }
    }
})
