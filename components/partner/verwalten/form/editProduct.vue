<template>
  <div>
    <v-card flat>
      <v-card-title>
        <h1>{{ props.product.name }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="">
          <v-container>
            <v-text-field variant="outlined" v-model="props.product.name" label="Name"></v-text-field>
            <v-textarea variant="outlined" v-model="props.product.description" label="Description"></v-textarea>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-container>
        </v-form>
      </v-card-text>

    </v-card>
    <v-card v-for="optionGroup in optionGroups">
      <v-card-title>
        <h1>Optionsgruppe "{{optionGroup.name}}"</h1>
      </v-card-title>
      <common-form-options :multiple="optionGroup.multiple" :mandatory="optionGroup.mandatory" selected="0" :options="optionGroup.options" />
      <v-card-text>
        <v-form>
          <v-container>
             <v-text-field variant="outlined" v-model="optionGroup.name" label="Name"></v-text-field>
              <v-checkbox v-model="optionGroup.mandatory" label="Mandatory"></v-checkbox>
              <v-checkbox v-model="optionGroup.multiple" label="Multiple"></v-checkbox>
            <v-select
                :multiple="optionGroup.multiple"
                clearable
                label="Standardwert"
                :items="optionGroup.options.forEach((obj, index) => obj.index = index)"
                item-title="name"
                variant="outlined"
                chips
                item-value="index"
                v-model="optionGroup.default"
            ></v-select>
            {{optionGroup.default}}
          </v-container>
        </v-form>
      </v-card-text>
    <v-card flat v-for="option in optionGroup.options">
      <v-card-title>
        <h1>Optionen</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-text-field variant="outlined" v-model="option.name" label="Name"></v-text-field>
            <v-text-field variant="outlined" v-model="option.price" label="Price"></v-text-field>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn @click="addOption">Add Option</v-btn>
    </v-card>
    <v-btn @click="addOptionGroup">Add Option Group</v-btn>
  </div>
</template>
<script setup>
const props = defineProps(['product'])
const optionGroups = ref([{
  name: 'test',
  mandatory: false,
  multiple: false,
  default: undefined,
  options: [{
    name: 'test',
    price: 1
  },
  {
    name: 'test2',
    price: 2
  }]
}])
const addOption = (options) => {
  options.value.push({
    name: '',
    price: 0
  })
}
const addOptionGroup = () => {
  optionGroups.value.push({
    name: '',
    mandatory: false,
    multiple: false,
    default: undefined,
    options: [{
      name: '',
      price: 0
    }]
  })
}
</script>