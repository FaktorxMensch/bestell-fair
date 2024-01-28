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

export const orderstatusToIcon = (status: string) => {
    switch (status) {
        case 'Bestätigt':
            return 'mdi-check'
        case 'In Zubereitung':
            return 'mdi-clock'
        case 'Bereit zur Abholung':
            return 'mdi-check'
        case 'Abgeholt':
            return 'mdi-check'
        case 'Storniert':
            return 'mdi-close'
        default:
            return 'mdi-alert'
    }
}

export const orderstatusToClass = (status: string) => {
    switch (status) {
        case 'Bestätigt':
            return 'text-sky-600'
        case 'In Zubereitung':
            return 'text-yellow-600'
        case 'Bereit zur Abholung':
            return 'text-green-600'
        case 'Abgeholt':
            return 'text-green-600'
        case 'Storniert':
            return 'text-red-600'
        default:
            return 'text-gray-600'
    }
}
