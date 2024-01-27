export const orderstatusToColor = (status: string) => {
    switch (status) {
        case 'Bestätigt':
            return 'blue'
        case 'In Zubereitung':
            return 'yellow'
        case 'Bereit zur Abholung':
            return 'success'
        case 'Abgeholt':
            return 'success'
        case 'Storniert':
            return 'error'
        default:
            return 'grey'
    }
}
