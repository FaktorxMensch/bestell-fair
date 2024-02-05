export const pricef = (price: number) => {
    // if price is not a number, return 0,00 €
    if (!price) return '0,00 €'
    // replace any , with .
    price = price.toString().replace(',', '.')
    // parse the price to a number
    price = parseFloat('0' + price)
    return '|'+price.toFixed(2).replace('.', ',') + ' €'+ '|'
}

export const getProductTotalPrice = (product: any, quantity: number = 1) => {
        let price = parseFloat(product.price)
        for (let og of product.optionGroups) {
            console.log(typeof og.selected, og.selected)

            if (typeof og.selected === 'number') {
                price += parseFloat(og.options[og.selected].price)
            } else if (typeof og.selected === 'object') {
                for(let o of og.selected) {
                    price += parseFloat(og.options[o].price)
                }
            }
        }
        console.log('price', price, quantity, price * quantity)
        return price * quantity

}
