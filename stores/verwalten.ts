export const useVerwaltenStore = defineStore('verwalten', {
    state: () => ({
        restaurants: [],
        restaurantIndex: 0,
        initDone: false,
        nav: null,
        drawer: true,
    }),
    getters: {
        restaurant(state) {
            if (state.restaurants.length === 0) return null
            return state.restaurants[state.restaurantIndex]
        },
    },
    actions: {
        setNav(nav) {
            this.nav = nav
            console.log('set nav', nav)
        },
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
        pushRestaurant(restaurant) {
            this.restaurants.push(restaurant)
        },
        setRestaurant(id) {
            const index = this.restaurants.findIndex((r) => r.id === id)
            if (index >= 0) {
                this.restaurantIndex = index
                return;
            }
            if (id == 'CREATE') {
                const user = useSupabaseUser()
                Swal.fire({
                    icon: 'info',
                    title: 'Neues Restaurant',
                    html: `
<p>
Bitte gebe den Namen des Restaurants ein. Bevor das Restaurant aktiviert wird, prüfen wir die Daten.
</p>
<br/>
    <input id="name" class="swal2-input" placeholder="Restaurantname" required>
    <input id="location" class="swal2-input" placeholder="Adresse" required>
  `,

                    inputPlaceholder: 'Restaurantname',
                    showCancelButton: true,
                    confirmButtonText: 'Erstellen',
                    cancelButtonText: 'Abbrechen',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        const name = (document.getElementById('name') as HTMLInputElement).value
                        const location = (document.getElementById('location') as HTMLInputElement).value

                        const supabase = useSupabaseClient()
                        const {data, error} = await supabase
                            .from('restaurants_pending')
                            .insert({name: name, user_id: user.value.id, location: location})
                        if (error) {
                            Swal.showValidationMessage(
                                `Restaurant konnte nicht erstellt werden: ${error.message}`
                            )
                            return
                        }

                        return data
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Restaurant wird nun überprüft, wir melden uns bei Dir!',
                            showConfirmButton: false,
                            timer: 1500,
                        })
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
