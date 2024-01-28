/**
 * Store für die Inbox, es muss vor der Verwendung init() aufgerufen werden
 * @description Dieser Store enthält alle Bestellungen eines Restaurants und kann neue Bestellungen empfangen
 * @method init() initialisiert den Store, muss vor der Verwendung aufgerufen werden
 * @method playClick() spielt einen Klick-Sound ab
 * @method openOrder(order) öffnet eine Bestellung
 * @method closeOrder() schließt die aktuell geöffnete Bestellung
 * @method updateOrderStatus(order, status) aktualisiert den Status einer Bestellung
 * @method listenForNewOrders() setzt den Listener für neue Bestellungen
 * @property order die aktuell geöffnete Bestellung
 * @property orders alle Bestellungen
 * @property updatedAt wann wurden die letzten Daten abgerufen
 * @property listenerSet wurde der Listener für neue Bestellungen gesetzt
 * @property orderStates alle möglichen Bestell-Status
 */

export const useInboxStore = defineStore('inbox', {
    state: () => ({
        order: null, // die aktuell geöffnete Bestellung
        orders: [], // alle Bestellungen
        updatedAt: new Date(),
        listenerSet: false, // wurde der Listener für neue Bestellungen gesetzt
        initDone: false,
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
            const {data, error} = await supabase.from('orders').select('*').neq('status', 'Entwurf').neq('status', 'Archiviert')
            if (error) {
                console.error(error)
                return
            }
            this.orders = data
            console.log('orders', this.orders)

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
                console.warn('listenForNewOrders() already called')
                return
            }
            const supabase = useSupabaseClient()
            // TODO implement


            supabase
                .channel('realtime')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
                    console.log('Change received!', payload)
                    this.orders.push(payload.new)
                })
                .subscribe()

            // also listen to update
            supabase
                .channel('realtime')
                .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, payload => {
                    console.log('Change received!', payload)
                    const index = this.orders.findIndex(o => o.id === payload.new.id)
                    this.orders[index] = payload.new
                })
                .subscribe()

            // const {data, error} = await supabase.from('orders').on('INSERT', (payload) => {
            //     this.orders.push(payload.new)
            //     this.playClick()
            // }).subscribe()
            // if (error) {
            //     console.error(error)
            //     return
            // }
            this.listenerSet = true
        },
    }
})

export const orderStates = 'Neu, Bestätigt, In Zubereitung, Bereit zur Abholung, Abgeholt, Storniert, Fehler'.split(', ')
