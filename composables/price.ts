export const pricef = (price: number) => {
    // if price is not a number, return 0,00 €
    if (!price) return '0,00 €'
    // replace any , with .
    price = price.toString().replace(',', '.')
    // parse the price to a number
    price = parseFloat('0' + price)
    return price.toFixed(2).replace('.', ',') + ' €'
}

