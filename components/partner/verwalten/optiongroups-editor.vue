<template>
  <v-tabs v-model="tab">
    <v-tab v-for="(index,optionGroup) in optionGroups" :value="index">
      {{ optionGroup.name }}
    </v-tab>
  </v-tabs>
   {{optionGroups}}
  <div class="grid gap-2 grid-cols-2">
    <v-card v-for="optionGroup in optionGroups" :key="optionGroup.id">
      <v-card-title>
        <v-text-field label="Name der Optionsgruppe (z.B. Soße, Größe, Toppings)" v-model="optionGroup.name"/>
      </v-card-title>
      <v-card-text>
        Optionen:
        <div class="border-b border-gray-800" v-for="option in optionGroup.options" :key="option.id">
          <v-text-field label="Name der Option (z.B. Ketchup, Mayo, Scharf)" v-model="option.name"/>
          <v-text-field label="Preis der Option" v-model="option.price" type="number" suffix="€" step="0.01"/>
          <v-combobox label="Zutaten" v-model="option.ingredients" chips multiple/>
          <v-combobox label="Allergene" v-model="option.allergens" chips multiple/>
          <v-combobox label="Zusatzstoffe" v-model="option.additives" chips multiple/>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
const tab = ref(0)
const optionGroups = defineModel()
</script>
