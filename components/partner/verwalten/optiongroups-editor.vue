<template>
  <v-tabs v-model="tab" show-arrows>
    <v-tab v-for="(optionGroup,index) in optionGroups" :value="index">
      {{ optionGroup.name }}
    </v-tab>
    <v-tab v-if="optionGroups.length === 0" disabled>
      Keine Optionsgruppen vorhanden
    </v-tab>
    <v-tab prepend-icon="mdi-plus-circle-outline"
           @click="optionGroups.push({name: 'Neue Optionsgruppe #'+(optionGroups.length+1), options: []})">
      Neue Optionsgruppe
    </v-tab>
  </v-tabs>
  <div v-if="optionGroup" class="p-4 bg-gray-100">
    <v-text-field label="Name der Optionsgruppe (z.B. Soße, Größe, Toppings)" v-model="optionGroup.name"/>
    <div class="grid gap-2 grid-cols-3">
      <v-card v-for="option in optionGroup.options">
        <v-text-field label="Name der Option (z.B. Ketchup, Mayo, Scharf)" v-model="option.name"/>
        <v-text-field label="Preis der Option" v-model="option.price" type="number" suffix="€" step="0.01"/>
        <v-combobox label="Zutaten" v-model="option.ingredients" chips multiple/>
        <v-combobox label="Allergene" v-model="option.allergens" chips multiple/>
        <v-combobox label="Zusatzstoffe" v-model="option.additives" chips multiple/>
      </v-card>
      <v-card
          @click="optionGroup.options.push({name: 'Neue Option #'+(optionGroup.options.length+1), price: 0, ingredients: [], allergens: [], additives: []})">
        <v-card-text>
          <v-icon>mdi-plus-circle-outline</v-icon>
          Neue Option
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script setup>
const tab = ref(0)
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const optionGroups = ref(props.modelValue)
watch(() => props.modelValue, (value) => {
  optionGroups.value = value
})
const optionGroup = computed(() => optionGroups.value[tab.value])
</script>
