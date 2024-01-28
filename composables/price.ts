export const price = (price: number) => {
    console.log(price)
    // parse the price to a number
    price = parseFloat('0' + price)
    if (!price) return '0.00 €'
    return price.toFixed(2) + ' €'
}

