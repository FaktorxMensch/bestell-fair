<template>

  <v-tabs v-model="tab" show-arrows>
    <v-tab v-for="(optionGroup,index) in optionGroups" :value="index">
      {{ optionGroup.name }}
    </v-tab>
    <v-tab prepend-icon="mdi-plus-circle-outline"
           @click="appendOptiongroup">
      Neue Optionsgruppe
    </v-tab>
  </v-tabs>
  <div v-if="optionGroup" class="p-4 bg-gray-100">

    <div class="lg:flex lg:gap-4">
      <v-text-field label="Name der Optionsgruppe (z.B. Soße, Größe, Toppings)"
                    v-model="optionGroup.name"/>
      <v-select label="Standardauswahl" v-model="optionGroup.default"
                :items="optionGroup.options.map((option, index) => ({title: option.name, value: index}))"
                :multiple="optionGroup.multiple"
                item-title="title" item-value="value"/>


      <v-switch label="Mehrfachauswahl" v-model="optionGroup.multiple"/>
      <v-switch label="Pflichtauswahl" v-model="optionGroup.mandatory"/>

    </div>

    <div class="md:grid gap-2 grid-cols-3 xl:grid-cols-3">
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
      <div class="col-span-3 xl:col-span-3 gap-2 flex">
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
  <p v-else class="p-2 text-gray-500">
    Keine Optionsgruppe ausgewählt.
  </p>

</template>
<script setup>
const tab = ref(0)
const props = defineProps(['optionGroups'])
const optionGroup = computed(() => {
  console.log(', props.optionGroups', props.optionGroups)
  if (!props.optionGroups || !props.optionGroups.length > 0) return null
  return props.optionGroups?.[tab.value]
})

const checkMandatory = () => {
  if (optionGroup.value.mandatory) {
    console.log('checking mandatory')
    // make sure there is at least one option selected (either array or single value)
    if (optionGroup.value.default === undefined || optionGroup.value.default.length === 0) {
      console.log('multirple', optionGroup.value.multiple)
      optionGroup.value.default = optionGroup.value.multiple ? [optionGroup.value.options.map((option, index) => ({
        title: option.name,
        value: index
      }))[0]] : optionGroup.value.options.map((option, index) => ({title: option.name, value: index}))[0]
    }
  }
}

const checkMultiple = () => {
  // return if default is not set
  if (typeof optionGroup.value.default === undefined) return

  // wir müssen schauen dass default auch ein array ist oder single, je nachdem
  if (optionGroup.value.multiple) {
    // jetzt muss default ein array sein
    if (!Array.isArray(optionGroup.value.default)) {
      optionGroup.value.default = [optionGroup.value.default]
    }
  } else {
    // jetzt muss default ein single value sein
    if (Array.isArray(optionGroup.value.default)) {
      optionGroup.value.default = optionGroup.value.default[0]
    }
  }
}

watch(() => optionGroup.value?.mandatory, checkMandatory)
watch(() => optionGroup.value?.multiple, checkMultiple)

const appendOptiongroup = () => {
  props.optionGroups.push({name: 'Neue Optionsgruppe #' + (props.optionGroups.length + 1), options: []})
}
</script>
