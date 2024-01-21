<template>

<v-dialog
    v-model="dialog"
    persistent
    width="1024"
>
<template v-slot:activator="{ props }">
  <v-btn
      v-bind="props"
      :icon="'mdi-cart-plus'"
      />
  </template>
<v-card>
  <v-card-title>
    <span class="text-h5">{{product.name}}</span>
  </v-card-title>
  <v-card-text>
    <v-container>
      <v-row v-for="og in product.optionGroups">
         {{ og.name }}
        <ui-options :options="og.options" :mandatory="og.mandatory" :multiple="og.multiple" :default="og.default"/>
      </v-row>
    </v-container>
    <small>*indicates required field</small>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
        color="blue-darken-1"
        variant="text"
        @click="dialog = false"
    >
      Close
    </v-btn>
    <v-btn
        color="blue-darken-1"
        variant="text"
        @click="dialog = false"
    >
      Save
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</template>
<script setup lang="ts">
const props = defineProps(['product'])
const dialog = ref(false)
</script>