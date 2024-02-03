import {getProductTotalPrice} from "../composables/price";

export const useGastStore = defineStore('gast', {
    persist: true,
    state: () => ({
        products: [], product_refs: [], custom_fields: [], name: '', phone: '', email: '', restaurant_id: null,
        pickup_at: null,
        remark: '',
        cartOpen: false,
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
            Swal.fire({
                title: 'Produkt hinzugefügt',
                text: 'Das Produkt wurde erfolgreich hinzugefügt.',
                icon: 'success',
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
            const index = this.product_refs.indexOf(product.id)
            this.products.splice(index, 1)
            this.product_refs.splice(index, 1)
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
            const {data, error} = await supabase.from('orders').insert({
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
            })

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
                text: 'Deine Bestellung wurde erfolgreich aufgegeben, bitte prüfe Deine E-Mails.',
                icon: 'success',
            })
            // weiterleitne zur bestellübersicht
            navigateTo('/bestellung/danke')
            // return data[0].id
        },
    },
})
