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
        },
        async saveRestaurant() {
            const restaurant = this.restaurant
            if (!restaurant) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Restaurant konnte nicht gespeichert werden',
                    text: 'Restaurant nicht gefunden',
                })
                return
            }
            const supabase = useSupabaseClient()
            console.log('saving restaurant', restaurant)
            const {data, error} = await supabase
                .from('restaurants')
                .update(restaurant)
                .eq('id', restaurant.id)
            if (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Restaurant konnte nicht gespeichert werden',
                    text: error.message,
                })
                return
            }
            await Swal.fire({
                icon: 'success',
                title: 'Restaurant gespeichert',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    },
})
