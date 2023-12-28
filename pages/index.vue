<template>
  <div>
    <ul>
      <li v-for="restaurant in restaurants">
        {{ restaurant.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient()
let { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('*')
</script>