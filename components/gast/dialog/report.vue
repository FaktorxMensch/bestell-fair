<template>
  <v-btn color="warning"
         variant="text"
         class="w-full"
         prepend-icon="mdi-alert-circle"
         @click="report">
    App-Fehler und Feedback
  </v-btn>
</template>
<script setup>
const supabase = useSupabaseClient()
const props = defineProps(['order'])
// have a swal form with textarea for App Fehler, Feedback usw. Und darunter optional Felder für E-Mail und Telefonnummer, falls wir nachfragen dürfen, wird dann in die tabelle reports geschrieben
const report = () => {
  Swal.fire({
    title: 'Feedback',
    html: `
      <p>Wir freuen uns über dein Feedback und deine Verbesserungsvorschläge.</p>
      <textarea id="swal-input1" class="p-2 border w-full my-2" placeholder="Bitte beschreibe uns dein Anliegen möglichst genau."></textarea>
      <p>Falls wir nachfragen dürfen, gib uns bitte deine E-Mail Adresse oder Telefonnummer an.</p>
      <input id="swal-input2" class="p-2 border w-full my-2" placeholder="(Optional) E-Mail Adresse">
      <input id="swal-input3" class="p-2 border w-full my-2" placeholder="(Optional) Telefonnummer">
    `,
    confirmButtonText: 'Absenden',
    focusConfirm: false,
    preConfirm: () => {
      const text = Swal.getPopup().querySelector('#swal-input1').value
      const email = Swal.getPopup().querySelector('#swal-input2').value
      const phone = Swal.getPopup().querySelector('#swal-input3').value
      return {text, email, phone}
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      const {text, email, phone} = result.value
      if (text.length < 3) {
        return
      }
      await supabase.from('reports').insert({
        order: props.order,
        text, email, phone
      })
      await Swal.fire({
        title: 'Danke für dein Feedback!',
        text: 'Wir werden uns schnellstmöglich darum kümmern.',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    }
  })
}
</script>

