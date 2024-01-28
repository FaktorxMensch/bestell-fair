export const useFilehandler = (width = 300, height = 300) => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const selectedFile = ref(null)


    function resizeImage(file, callback, dims) {
        const reader = new FileReader()
        reader.onload = e => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = dims.w
                canvas.height = dims.h
                // canvas background white
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)

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

    async function resizeImageSync(file, dims): Promise<Blob> {
        return new Promise((resolve, reject) => {
            resizeImage(file, resolve, dims)
        })
    }

    async function uploadImage(event, dims = null): Promise<string> {
        if (!dims) {
            dims = {
                w: 300,
                h: 300
            }
        }
        let file = event.target.files[0]
        if (file) {
            selectedFile.value = file
            const resizedBlob = await resizeImageSync(file, dims)
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
