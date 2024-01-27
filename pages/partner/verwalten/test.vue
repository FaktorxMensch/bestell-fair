<template>
  <h1 class="text-3xl">Test</h1>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <li v-for="order in orders" :key="order.id">
      {{ order.id }}
    </li>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
let {data: orders, error} = await supabase
    .from('orders')
    .select('*')

supabase
    .channel('room1')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
      console.log('Change received!', payload)
    })
    .subscribe()



const channels = supabase.getChannels()
console.log(channels)

const channel = supabase.channel('room2')

supabase
    .channel('room2')
    .on('broadcast', { event: 'cursor-pos' }, payload => {
      console.log('Cursor position received!', payload)
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        channel.send({
          type: 'broadcast',
          event: 'cursor-pos',
          payload: { x: Math.random(), y: Math.random() },
        })
      }
    })


supabase
    .channel('room2')
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        channel.send({
          type: 'broadcast',
          event: 'cursor-pos',
          payload: { x: Math.random(), y: Math.random()
          },
        })
      }
    })
</script>
