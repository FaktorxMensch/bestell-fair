<template>
  <h1 class="text-3xl font-bold">Speisekarte</h1>
  <input type="file" @change="handleFileChange" accept="image/*"/>
</template>

<script setup>
definePageMeta({layout: 'partner-verwalten'})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const selectedFile = ref(null)

async function uploadFile(file) {
  console.log('Uploading file to Supabase Storage...', user.value.id, file)
  const {data, error} = await supabase.storage.from('restaurants').upload(`${user.value.id}/products/${file.name}`, file, {
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
      canvas.width = 200
      canvas.height = 200
      // draw image but cover
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width / 2) - (img.width / 2) * scale
      const y = (canvas.height / 2) - (img.height / 2) * scale
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
// convert to blob
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
</script>
