export const useFilehandler = (width = 300, height = 300) => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const selectedFile = ref(null)


    function resizeImage(file, callback) {
        const reader = new FileReader()
        reader.onload = e => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = width
                canvas.height = height
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
                const x = (canvas.width / 2) - (img.width / 2) * scale
                const y = (canvas.height / 2) - (img.height / 2) * scale
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
                canvas.toBlob(callback, 'image/jpeg', 0.9)
            }
            img.src = e.target.result
        }
        reader.readAsDataURL(file)
    }

    async function resizeImageSync(file): Promise<Blob> {
        return new Promise((resolve, reject) => {
            resizeImage(file, resolve)
        })
    }

    async function uploadImage(event): Promise<string> {
        let file = event.target.files[0]
        if (file) {
            selectedFile.value = file
            const resizedBlob = await resizeImageSync(file)
            file = new File([resizedBlob], file.name, {type: 'image/jpeg', lastModified: Date.now()})
            const {
                data,
                error
            } = await supabase.storage.from('restaurants').upload(`${user.value.id}/products/${file.name}`, file, {
                upsert: true,
            })
            return error ? null : data.path
        }
        return null
    }

    return {
        uploadImage
    }
}
