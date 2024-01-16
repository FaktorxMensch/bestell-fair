export const useOrderStore = defineStore('order', {
    state: () => ({products: [], product_refs: [], order_fields: [], restaurant_id: null}),
    getters: {
        // wieviele (auch count)
        count: (state) => state.products.reduce((acc, cur) => acc + cur.quantity ?? 1, 0),
        price: (state) => state.products.reduce((acc, cur) => acc + cur.price ?? 0 * cur.quantity ?? 1, 0),
    },
    actions: {
        // have a function to add a product to the order, with quantity (default 1) and write the product_ref as id of the original product
        addProduct(product, quantity: number = 1) {
            this.products.push({...product, quantity: quantity, price: product.price * quantity})
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
        },

        // have a function to set the restaurant_id
        setRestaurantId(restaurant_id: number) {
            this.restaurant_id = restaurant_id
        },

        // have a function to set the order_fields
        setOrderFields(order_fields: OrderField[]) {
            this.order_fields = order_fields
        },

        // place order in supabase and return the order_id
        async placeOrder() {
            const {data, error} = await supabase.from('orders').insert({
                restaurant_id: this.restaurant_id,
                order_fields: this.order_fields,
                products: this.products,
                status: 'new',
            })
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
            return data[0].id
        },
    },
})
