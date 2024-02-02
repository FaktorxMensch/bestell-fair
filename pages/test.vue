<template>
  <h1 class="text-3xl font-bold mb-2 mt-3">data</h1>
  <pre>
    {{ quizzes }}
  </pre>
  {{ user }}
</template>
<script setup>
const supabase = useSupabaseClient()
// login with email and password with supabase
const {data, error} = await supabase.auth.signInWithPassword({
  email: 'roy-udo.kuehmichel@johanniter.de',
  password: 'zdXBhYmFzZSIsCiAgImlhdCI6IDE3MDY',
})
const user = useSupabaseUser()
// const { data, error } = await supabase.auth.signUp({
//   email: 'example@email.com',
//   password: 'example-password',
//   options: {
//     emailRedirectTo: 'https://example.com/welcome'
//   }
// })
const {data: quizzes, error: quizError} = await supabase.from('quizzes').select('*')
// listen to realteim
supabase
    .channel('room1')
    .on('postgres_changes', {event: '*', schema: 'public', table: 'quizzes'}, payload => {
      console.log('Change received!', payload)
    })
    .subscribe()
</script>
