/**
 * Store für die Inbox, es muss vor der Verwendung init() aufgerufen werden
 * @description Dieser Store enthält alle Bestellungen eines Restaurants und kann neue Bestellungen empfangen
 * @method init(restaurant) initialisiert den Store, muss vor der Verwendung aufgerufen werden
 * @method playClick() spielt einen Klick-Sound ab
 * @method openOrder(order) öffnet eine Bestellung
 * @method closeOrder() schließt die aktuell geöffnete Bestellung
 * @method updateOrderStatus(order, status) aktualisiert den Status einer Bestellung
 * @method listenForNewOrders() setzt den Listener für neue Bestellungen
 * @property order die aktuell geöffnete Bestellung
 * @property orders alle Bestellungen
 * @property restaurant das Restaurant
 * @property updatedAt wann wurden die letzten Daten abgerufen
 * @property listenerSet wurde der Listener für neue Bestellungen gesetzt
 * @property orderStates alle möglichen Bestell-Status
 */

export const useInboxStore = defineStore('inbox', {
    state: () => ({
        order: null, // die aktuell geöffnete Bestellung
        orders: [], // alle Bestellungen
        restaurant: null, // das Restaurant
        updatedAt: null, // wann wurden die letzten Daten abgerufen
        listenerSet: false, // wurde der Listener für neue Bestellungen gesetzt
        initDone: false,
    }),
    actions: {
        playClick() {
            const audio = new Audio('/click.mp3')
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
        async init(restaurant = null) {
            if (this.initDone) {
                console.warning('init() already called')
                return
            }
            // TODO: restaurant ist egal, da rls eh nur die eigenen Bestellungen returned
            if (restaurant) {
                this.restaurant = restaurant
            }
            const supabase = useSupabaseClient()
            const {data, error} = await supabase.from('orders').select('*').eq('restaurant_id', this.restaurant)
            if (error) {
                console.error(error)
                return
            }
            this.orders = data
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
            const {data, error} = await supabase.from('orders').update({status: status}).eq('id', order.id)
            if (error) {
                console.error(error)
                return
            }

            // manipulate the order in the store to avoid a new request
            const index = this.orders.indexOf(order)
            this.orders[index].status = status
            this.playClick()
        },
        // set up the listener for new orders
        async listenForNewOrders() {
            if (this.listenerSet) {
                console.warning('listenForNewOrders() already called')
                return
            }
            const supabase = useSupabaseClient()
            const {data, error} = await supabase.from('orders').on('INSERT', (payload) => {
                this.orders.push(payload.new)
                this.playClick()
            }).subscribe()
            if (error) {
                console.error(error)
                return
            }
            this.listenerSet = true
        },
    }
})

export const orderStates = 'Neu, Bestätigt, In Zubereitung, Bereit zur Abholung, Abgeholt, Storniert, Fehler'.split(', ')
