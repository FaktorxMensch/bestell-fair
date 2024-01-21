export const useFilehandler = (width = 300, height = 300) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const selectedFile = ref(null)

  async function uploadFile(file) {
    console.log('Uploading file to Supabase Storage...', user.value.id, file)
    const { data, error } = await supabase.storage.from('restaurants').upload(`${user.value.id}/products/${file.name}`, file, {
      upsert: true,
    })
    if (error) {
      console.error('Upload error:', error)
    } else {
      console.log('File uploaded:', data)
    }
  }

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

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      selectedFile.value = file
      resizeImage(file, resizedBlob => {
        uploadFile(new File([resizedBlob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now()
        }))
      })
    }
  }

  return {
    handleFileChange,
    selectedFile
  }
}
