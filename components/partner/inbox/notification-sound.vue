<script lang="ts" setup>
const orders = useOrdersStore()
const {bestellungen} = storeToRefs(orders)
const audio = ref<HTMLAudioElement>()

// wenn bestellungen sich ändern, dann soll ein sound abgespielt werden
watch(() => orders.bestellungen.length, () => {
  audio.value!.currentTime = 0
  audio.value?.play()
})

onMounted(() => {
  audio.value?.load()
})
</script>

<template>
  <audio src="/notification.mp3" ref="audio" preload="auto"/>
</template>

