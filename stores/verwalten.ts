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
        setRestaurant(id) {
            const index = this.restaurants.findIndex((r) => r.id === id)
            if (index >= 0) {
                this.restaurantIndex = index
                return;
            }
            if (id == 'CREATE') {
                Swal.fire({
                    icon: 'info',
                    title: 'Neues Restaurant',
                    text: 'Bitte geben Sie den Namen des Restaurants ein',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Erstellen',
                    cancelButtonText: 'Abbrechen',
                    showLoaderOnConfirm: true,
                    preConfirm: async (name) => {
                        const supabase = useSupabaseClient()
                        const {data, error} = await supabase
                            .from('restaurants')
                            .insert({name: name, slug: name.toLowerCase().replace(' ', '-')+'-'+Math.floor(Math.random()*10000)})
                        if (error) {
                            Swal.showValidationMessage(
                                `Restaurant konnte nicht erstellt werden: ${error.message}`
                            )
                        }
                        return data
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                }).then((result) => {
                    if (result.isConfirmed) {
                        const restaurant = result.value
                        this.restaurants.push(restaurant)
                        this.restaurantIndex = this.restaurants.length - 1
                    }
                })
                return
            }
            Swal.fire({
                icon: 'error',
                title: 'Restaurant nicht gefunden',
                text: 'Das Restaurant konnte nicht gefunden werden',
            })
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
