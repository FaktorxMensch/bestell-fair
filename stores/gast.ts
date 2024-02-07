import {getProductTotalPrice} from "../composables/price";

/**
 * Store for the guest
 * @method addProduct(product, quantity) add a product to the order
 * @method changeQuantity(product, quantity) change the quantity of a product
 * @method removeProduct(product) remove a product from the order
 * @method resetOrder() reset the order
 * @method setRestaurantId(restaurant_id) set the restaurant_id
 * @method setCustomFields(custom_fields) set the custom_fields
 * @method setField(field, value) set a field
 * @method placeOrder() place the order in supabase
 * @method storeTempClosedFunc(restaurant_id) check if the store is temporarily closed
 * @property products the products in the order
 * @property product_refs the product_refs in the order
 * @property custom_fields the custom_fields in the order
 * @property name the name of the guest
 * @property phone the phone of the guest
 * @property email the email of the guest
 * @property restaurant_id the restaurant_id
 * @property pickup_at the pickup_at
 * @property remark the remark
 * @property cartOpen if the cart is open
 * @property storeTempClosed if the store is temporarily closed
 *
 */

export const useGastStore = defineStore('gast', {
    persist: true,
    state: () => ({
        products: [], product_refs: [], custom_fields: [], name: '', phone: '', email: '', restaurant_id: null,
        pickup_at: null,
        remark: '',
        cartOpen: false,
        storeTempClosed: false,
        ordersHistory: [],
        // embedOptions: {
        // should the back button be shown (to the other restaurants)
        // showBackButton: false,
        // }
    }),
    getters: {
        // wieviele (auch count)
        count: (state) => state.products.reduce((acc, cur) => acc + cur.quantity ?? 1, 0),
        price: (state) => state.products.reduce((acc, cur) => acc + cur.price * (cur.quantity ?? 1) ?? 0, 0),
    },
    actions: {
        // have a function to add a product to the order, with quantity (default 1) and write the product_ref as id of the original product
        addProduct(product, quantity: number = 1) {
            product = JSON.parse(JSON.stringify(product))
            this.products.push({...product, quantity: quantity, total_price: getProductTotalPrice(product, quantity)})
            this.product_refs.push(product.id)
            // open cart if screensize is greater than 540px
            if (window.innerWidth > 540)
                this.cartOpen = true
            Swal.fire({
                title: 'Produkt hinzugefügt',
                text: 'Das Produkt wurde erfolgreich hinzugefügt.',
                icon: 'success',
                timer: 2e3,
                timerProgressBar: true,
            })
        },

        // have a function to remove a product from the order
        changeQuantity(product, quantity: number) {
            if (quantity < 1) {
                this.removeProduct(product)
                return
            }

            const index = this.product_refs.indexOf(product.id)
            this.products[index].quantity = quantity
            this.products[index].price = product.price * quantity
        },

        // have a function to remove a product from the order
        removeProduct(product) {

            Swal.fire({
                title: 'Produkt entfernen',
                text: 'Möchtest du das Produkt wirklich entfernen?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ja',
                cancelButtonText: 'Nein',
            }).then((result) => {
                if (result.isConfirmed) {
                    const index = this.products.indexOf(product)
                    this.products.splice(index, 1)
                    this.product_refs.splice(index, 1)
                }
            })

        },

        // have a function to reset the order
        resetOrder() {
            this.products = []
            this.product_refs = []
            this.cartOpen = false
        },

        // have a function to set the restaurant_id
        setRestaurantId(restaurant_id: number) {
            this.restaurant_id = restaurant_id
        },

        // have a function to set the custom_fields
        setCustomFields(custom_fields) {
            this.custom_fields = custom_fields
        },

        setField(field, value) {
            this[field] = value
        },

        // load ordersHistory
        loadOrdersHistory() {
            this.ordersHistory = JSON.parse(localStorage.getItem('ordersHistory')) || []
        },
        clearOrdersHistory() {
            localStorage.removeItem('ordersHistory')
            this.ordersHistory = []
        },

        // place order in supabase and return the order_id
        async placeOrder() {
            const supabase = useSupabaseClient()
            var timestampValue = new Date();
            var [hours, minutes] = this.pickup_at.split(":");
            timestampValue.setHours(hours);
            timestampValue.setMinutes(minutes);
            timestampValue.setSeconds(0); // Setze Sekunden auf
            const insert_id = crypto.randomUUID();
            console.log('insert_if', insert_id)
            const newOrder = {
                id: insert_id,
                restaurant_id: this.restaurant_id,
                custom_fields: this.custom_fields,
                products: this.products,
                total_price: this.price,
                status: 'Neu',
                name: this.name,
                phone: this.phone,
                email: this.email,
                pickup_at: timestampValue,
            }
            const {data, error} = await supabase.from('orders').insert(newOrder)

            // dann könen wir die products und product_refs im store löschen
            this.resetOrder()

            if (error) {
                console.error(error)
                await Swal.fire({
                    title: 'Fehler beim Bestellen',
                    text: 'Bitte versuche es später noch einmal.',
                    icon: 'error',
                })
                return
            }
            await Swal.fire({
                title: 'Bestellung aufgegeben',
                text: 'Deine Bestellung wurde erfolgreich aufgegeben.',
                icon: 'success',
            })

            // im localstorage speichern
            let ordersHistory = JSON.parse(localStorage.getItem('ordersHistory')) || []
            const restaurant = await supabase.from('restaurants').select('name,icon_image_url').eq('id', this.restaurant_id).single()
            console.log('restaurant', restaurant.data.name)
            ordersHistory.push({
                ...newOrder,
                restaurant: restaurant.data
            })
            localStorage.setItem('ordersHistory', JSON.stringify(ordersHistory))

            return;

            // weiterleitne zur bestellübersicht
            navigateTo('/bestellung/' + insert_id)
            // return data[0].id
        }
        // async storeTempClosedFunc(restaurant_id: number) {
        //     const supabase = useSupabaseClient()
        //     const {data, error} = await supabase.from('restaurant_open').select('*').eq('restaurant', restaurant_id)
        //     if (error) {
        //         console.error(error)
        //         return
        //     }
        //     this.storeTempClosed = data[0].open
        //     return this.storeTempClosed
        // //     Check if the restaurant is open every 2 minutes
        //     setInterval(async () => {
        //         const {data, error} = await supabase.from('restaurant_open').select('*')
        //         if (error) {
        //             console.error(error)
        //             return
        //         }
        //         this.storeTempClosed = data[0].open
        //     })
        // }
    },
})
