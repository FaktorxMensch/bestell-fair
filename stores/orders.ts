export const useOrdersStore = defineStore('orders', {
    state: () => ({
        bestellung: null,
        bestellungen: [],
        request_time: null,
    }),
    actions: {
        playClick() {
            const audio = new Audio('/click.mp3')
            audio.volume = 0.5
            audio.play()
        },
        clean() {
            // alle bestellungen entfernen, die Abgeholt oder Storniert sind
            this.bestellungen = this.bestellungen.filter((bestellung: any) => {
                return !['Abgeholt', 'Storniert'].includes(bestellung.status)
            })
        },
        openBestellung(bestellung: any) {
            this.bestellung = bestellung
        },
        closeBestellung() {
            this.bestellung = null
        }
    }
})
