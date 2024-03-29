/**
 * Store für die Inbox, es muss vor der Verwendung init() aufgerufen werden
 * @description Dieser Store enthält alle Bestellungen eines Restaurants und kann neue Bestellungen empfangen
 * @method init() initialisiert den Store, muss vor der Verwendung aufgerufen werden
 * @method playClick() spielt einen Klick-Sound ab
 * @method openOrder(order) öffnet eine Bestellung
 * @method closeOrder() schließt die aktuell geöffnete Bestellung
 * @method updateOrderStatus(order, status) aktualisiert den Status einer Bestellung
 * @method updatePickupAt(order, pickupAt) aktualisiert den Abholzeitpunkt einer Bestellung
 * @method listenForNewOrders() setzt den Listener für neue Bestellungen
 * @method setOpen(open) ändert den Status der Inbox
 * @property order die aktuell geöffnete Bestellung
 * @property orders alle Bestellungen
 * @property updatedAt wann wurden die letzten Daten abgerufen
 * @property listenerSet wurde der Listener für neue Bestellungen gesetzt
 * @property orderStates alle möglichen Bestell-Status
 * @property initDone wurde init() bereits aufgerufen
 * @property changeTempClose bis wann ist das Restaurant tenporär geschlossen
 */

export const useInboxStore = defineStore('inbox', {
    state: () => ({
        order: null, // die aktuell geöffnete Bestellung
        orders: [], // alle Bestellungen
        updatedAt: new Date(),
        restaurant:null,
        listenerSet: false, // wurde der Listener für neue Bestellungen gesetzt
        initDone: false,
        closedUntil: null,
        closedMinutes: 0,
        closedDecreaser: null,
        // isDarkMode: true,
    }),
    actions: {
        playClick() {
            const audio = new Audio('/partner/inbox/click.mp3')
            audio.volume = 0.5
            audio.play()
        },
        openOrder(order) {
            this.order = order
            this.playClick()
        },
        closeOrder() {
            this.order = null
            this.playClick()
        },
        // get orders for the restaurant
        async init() {
            if (this.initDone) {
                console.warn('init() already called')
                return
            }
            const supabase = useSupabaseClient()
            // alle orders ausser Entwurf und Archiviert
            const {
                data,
                error
            } = await supabase.from('orders').select('*').neq('status', 'Entwurf').neq('status', 'Archiviert')
            if (error) {
                console.error(error)
                return
            }
            this.orders = data
            console.log('orders', this.orders)

            // get restaurant_open
            // ToDo Domi: Select restaurant_id from restaurant_has_personal oder user_owns_restaurant
            const {data: restaurant_open, error: error2} = await supabase.from('restaurant_open').select('*').eq('restaurant', '8c9ca1b6-0f91-407f-a073-c2b90407d571')
            if (error2) {
                console.error(error2)
                return
            }
            if (restaurant_open) {
                this.closedUntil = restaurant_open[0].closed_until
                // this.changeTempClose()
            }

            this.updatedAt = new Date()

            // listen for new orders
            this.listenForNewOrders()

            this.initDone = true
        },
        // update the status of an order
        async updateOrderStatus(order, status) {
            const supabase = useSupabaseClient()
            // check if status is valid
            if (!orderStates.includes(status)) {
                console.error('Invalid status: ' + status)
                return
            }
            if (status === 'Storniert') {
                const result = await Swal.fire({
                    title: 'Bestellung stornieren?',
                    text: 'Möchtest du die Bestellung wirklich stornieren?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ja, stornieren',
                    cancelButtonText: 'Nein, abbrechen'
                })
                if (!result.isConfirmed) {
                    console.log('canceled by user')
                    return
                }
            }
            const {data, error} = await supabase.from('orders').update({status: status}).eq('id', order.id)
            if (error) {
                console.error(error)
                return
            }

            // manipulate the order in the store to avoid a new request
            const index = this.orders.indexOf(order)
            this.orders[index].status = status
            this.updatedAt = new Date()
            this.playClick()
        },
        // update the pickup time of an order
        async updatePickupAt(order, pickupAt) {
            const supabase = useSupabaseClient()
            // check if pickupAt is a valid date
            if (!Date.parse(pickupAt)) {
                console.error('Invalid pickupAt: ' + pickupAt)
                return
            }
            const {data, error} = await supabase.from('orders').update({pickup_at: pickupAt}).eq('id', order.id)
            if (error) {
                console.error(error)
                return
            }

            // manipulate the order in the store to avoid a new request
            const index = this.orders.indexOf(order)
            this.orders[index].pickup_at = pickupAt
            this.updatedAt = new Date()

            this.playClick()
        },
        async changeTempClose(reset = false) {
            if (reset) {
                this.closedUntil = null
                this.closedMinutes = 0
                //     Kill setInterval which was set a bit earlier
                // console.log('clearing interval timer')
                clearInterval(this.closedDecreaser)
            } else if (this.closedUntil && new Date(this.closedUntil) > new Date()){
                    // Increment it by 30 minutes but be aware of date
                    this.closedUntil = new Date(new Date(this.closedUntil).getTime() + 30 * 60000)
                    this.closedMinutes = Math.round((new Date(this.closedUntil).getTime() - new Date().getTime()) / 60000)
            } else {
                    // Set it to 30 minutes in the future
                    this.closedUntil = new Date(new Date().getTime() + 30 * 60000)
                    this.closedMinutes = 30
            }
            if(this.closedMinutes > 0) {
                // Start async function that decreases closedUntil every 1 minute
                this.closedDecreaser = setInterval(() => {
                    console.log('decreaseClosedMinutes running')
                    this.closedMinutes = Math.round((new Date(this.closedUntil).getTime() - new Date().getTime()) / 60000)
                }, 60000)
            }
            const supabase = useSupabaseClient()
            const {data, error} = await supabase.from('restaurant_open').upsert({
                    // ToDo Domi: Select restaurant_id from restaurant_has_personal oder user_owns_restaurant
                    restaurant: "8c9ca1b6-0f91-407f-a073-c2b90407d571",
                    closed_until: this.closedUntil
                }
            )
            if (error) {
                console.error(error)
                return
            }

        },
        // set up the listener for new orders
        async listenForNewOrders() {
            if (this.listenerSet) {
                console.warn('listenForNewOrders() already called')
                return
            }
            const supabase = useSupabaseClient()
            // TODO implement


            supabase
                .channel('realtime')
                .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'orders'}, payload => {
                    console.log('Change received!', payload)
                    this.orders.push(payload.new)
                    this.updatedAt = new Date()
                })
                .subscribe()

            // also listen to update
            supabase
                .channel('realtime')
                .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'orders'}, payload => {
                    console.log('Change received!', payload)
                    const index = this.orders.findIndex(o => o.id === payload.new.id)
                    this.orders[index] = payload.new
                    this.updatedAt = new Date()
                })
                .subscribe()


            this.listenerSet = true
        },
    }
})

export const orderStates = 'Neu, Bestätigt, In Zubereitung, Bereit zur Abholung, Abgeholt, Storniert, Fehler'.split(', ')
