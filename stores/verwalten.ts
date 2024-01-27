export const useVerwaltenStore = defineStore('verwalten', {
    state: () => ({
        restaurants: [],
        restaurantIndex: 0,
        initDone: false,
    }),
    getters: {
        restaurant(state) {
            if (state.restaurants.length === 0) return null
            return state.restaurants[state.restaurantIndex]
        },
    },
    actions: {
        async init() {
            if (this.initDone) {
                console.warning('init() already called')
                return
            }
            // we take all restaurant_id fields from  user_owns_restaurant, and get the restaurants with those ids
            const supabase = useSupabaseClient()
            const {data, error} = await supabase
                .from('user_owns_restaurant')
                .select('restaurant_id (*)')

            console.info('restaurants', data)
            if (error) {
                console.error(error)
                return
            }
            this.restaurants = data.map((r) => r.restaurant_id)
        },
        selectRestaurant(index) {
            this.restaurantIndex = index
        }
    },
})
