<template>

  <v-tabs v-model="tab" show-arrows>
    <v-tab v-for="(optionGroup,index) in optionGroups" :value="index">
      {{ optionGroup.name }}
    </v-tab>
    <v-tab prepend-icon="mdi-plus-circle-outline"
           @click="appendOptiongroup">
      Konfiguration
    </v-tab>
  </v-tabs>
  <div v-if="optionGroup" class="py-4">

    <div class="lg:flex lg:gap-4">
      <v-text-field label="Anzeigename (z.B. Soße, Größe, Toppings)"
                    v-model="optionGroup.name"/>
      <v-select
          :label="'Standardauswahl' + (optionGroup.multiple ? 'en' : '') + ' ' + optionGroup.name + (optionGroup.mandatory ? ' (Pflichtauswahl)' : '')"
          v-model="optionGroup.default"
          :items="optionGroup.options.map((option, index) => ({title: option.name, value: index}))"
          :multiple="optionGroup.multiple"
          item-title="title" item-value="value"/>


      <v-switch label="Mehrfachauswahl" v-model="optionGroup.multiple"/>
      <v-switch label="Pflichtauswahl" v-model="optionGroup.mandatory"/>

    </div>

    <div class="md:grid gap-x-2 grid-cols-3 xl:grid-cols-3">
      <v-card variant="outlined" v-for="(option, index) in optionGroup.options" :key="index">
        <div class="flex gap-2">
          <v-text-field :label="optionGroup.name + ' #'+(index+1)"
                        v-model="option.name"/>
          <v-text-field label="Zusatzkosten" v-model="option.price" type="number" suffix="€" step="0.01"/>
        </div>
        <v-combobox label="Zutaten" v-model="option.ingredients" chips multiple/>
        <v-combobox label="Allergene" v-model="option.allergens" chips multiple/>
        <v-combobox label="Zusatzstoffe" v-model="option.additives" chips multiple/>
        <v-btn @click="optionGroup.options.splice(optionGroup.options.indexOf(option), 1)" prepend-icon="mdi-delete"
               variant="text"
        >
          {{ option.name }} löschen
        </v-btn>
      </v-card>
      <div class="col-span-3 xl:col-span-3 gap-2 flex">
        <v-btn
            @click="optionGroup.options.push({name: 'Neue '+optionGroup.name+' #'+(optionGroup.options.length+1), price: 0, ingredients: [], allergens: [], additives: []})"
            variant="outlined"
            prepend-icon="mdi-plus-circle-outline"> Neue {{ optionGroup.name }} hinzufügen
        </v-btn>
        <v-spacer/>
        <v-btn
            variant="tonal"
            color="error"
            @click="deleteOptiongroup(optionGroup)" prepend-icon="mdi-delete"> Konfiguration
          {{ optionGroup.name }} löschen
        </v-btn>
      </div>
    </div>
  </div>
  <p v-else class="py-4 text-gray-500">
    Klicke auf das Plus-Symbol um eine neue Konfiguration für Gäste hinzuzufügen.
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

const optionGroupPresets = [
  {
    name: 'Größe',
    options: []
  },
  {
    name: 'Soße',
    options: []
  },
  {
    name: 'Toppings',
    options: []
  },
  {
    name: 'Extras',
    options: []
  }
]
const appendOptiongroup = () => {
  // schaue, ob aus den presets bestimmte namen noch nicht vorkommen
  const newOptionGroup = optionGroupPresets.find(preset => !props.optionGroups.find(group => group.name === preset.name))
  if (newOptionGroup) {
    props.optionGroups.push(newOptionGroup)
  } else {
    props.optionGroups.push({name: 'Konfiguration #' + (props.optionGroups.length + 1), options: []})
  }
}

const deleteOptiongroup = async (optionGroup) => {
  const {value} = await Swal.fire({
    title: 'Konfiguration löschen',
    text: `Möchtest du die Konfiguration '${optionGroup.name}' wirklich löschen?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ja, löschen',
    cancelButtonText: 'Abbrechen'
  })
  if (!value) return
  const index = props.optionGroups.indexOf(optionGroup)
  if (index > -1) {
    props.optionGroups.splice(index, 1)
  }
}
</script>
