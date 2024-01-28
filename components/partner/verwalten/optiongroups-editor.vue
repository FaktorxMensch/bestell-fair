<template>
  <v-tabs v-model="tab" show-arrows>
    <v-tab v-for="(optionGroup,index) in optionGroups" :value="index">
      {{ optionGroup.name }}
    </v-tab>
    <v-tab prepend-icon="mdi-plus-circle-outline"
           @click="optionGroups.push({name: 'Neue Optionsgruppe #'+(optionGroups.length+1), options: []})">
      Neue Optionsgruppe
    </v-tab>
  </v-tabs>
  <div v-if="optionGroup" class="p-4 bg-gray-100">

    <div class="grid gap-2 grid-cols-2 lg:flex lg:gap-4">
      <v-text-field class="flex-1" label="Name der Optionsgruppe (z.B. Soße, Größe, Toppings)"
                    v-model="optionGroup.name"/>
      <v-select label="Standardauswahl" v-model="optionGroup.default"
                :items="optionGroup.options.map((option, index) => ({title: option.name, value: index}))"
                :multiple="optionGroup.multiple"
                item-title="title" item-value="value"/>
      <v-select label="Mehrfachauswahl" v-model="optionGroup.multiple"
                :items="[{text: 'Ja', value: true}, {text: 'Nein', value: false}]" item-title="text"
                item-value="value"/>
      <v-select label="Pflichtauswahl" v-model="optionGroup.mandatory"
                :items="[{text: 'Ja', value: true}, {text: 'Nein', value: false}]" item-title="text"
                item-value="value"/>

    </div>

    <div class="grid gap-2 grid-cols-3 lg:grid-cols-5">
      <v-card v-for="option in optionGroup.options">
        <v-text-field label="Name der Option (z.B. Ketchup, Mayo, Scharf)" v-model="option.name"/>
        <v-text-field label="Preis der Option" v-model="option.price" type="number" suffix="€" step="0.01"/>
        <v-combobox label="Zutaten" v-model="option.ingredients" chips multiple/>
        <v-combobox label="Allergene" v-model="option.allergens" chips multiple/>
        <v-combobox label="Zusatzstoffe" v-model="option.additives" chips multiple/>
        <v-btn @click="optionGroup.options.splice(optionGroup.options.indexOf(option), 1)"
               class="w-full"
        >
          <v-icon>mdi-delete</v-icon>
          {{ option.name }} löschen
        </v-btn>
      </v-card>
      <div class="col-span-3 lg:col-span-5 gap-2 flex">
        <v-btn
            @click="optionGroup.options.push({name: 'Neue Option #'+(optionGroup.options.length+1), price: 0, ingredients: [], allergens: [], additives: []})"
            variant="outlined"
            prepend-icon="mdi-plus-circle-outline"> Neue ' {{ optionGroup.name }} ' hinzufügen
        </v-btn>
        <v-btn
            variant="tonal"
            color="error"
            @click="optionGroups.splice(tab, 1)" prepend-icon="mdi-delete"> Optionsgruppe '{{ optionGroup.name }}'
          löschen
        </v-btn>
      </div>
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
