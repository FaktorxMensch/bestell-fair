<template>
  <v-row justify="space-around">
    <v-col cols="auto">

        <v-chip-group
            :multiple="props.multiple"
            :mandatory="props.mandatory"
            selected-class="text-primary"
        >
          <v-chip
              v-for="option in props.options"
              :key="option"
          >
            {{ option.name }} ({{ option.price }} €)
          </v-chip>
        </v-chip-group>
    </v-col>
  </v-row>
</template>
<script setup>
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
})
</script>