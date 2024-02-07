<template>
  <v-row justify="space-around">
    <v-col cols="auto">

        <v-chip-group
            :multiple="props.multiple"
            :mandatory="props.mandatory"
            selected-class="text-teal-darken-4"
            v-model="selected"
        >
          <v-chip
              v-for="option in props.options"
              :key="option"
          >
            {{ option.name }} ({{ pricef(option.price) }})
          </v-chip>
        </v-chip-group>
    </v-col>
  </v-row>
</template>
<script setup>
const selected = defineModel()
const props = defineProps({
  options: {
    type: Array,
    default: []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  mandatory: {
    type: Boolean,
    default: false
  },
  default: {
    type : Number
  },
})
//const selected = ref(props.multiple ? [props.default] : props.default)
</script>
