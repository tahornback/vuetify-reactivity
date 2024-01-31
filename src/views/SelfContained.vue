<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {
    const value = ref('default')
    return {
      value
    }
  }
})
</script>

<template>
  <v-row align="center">
    <v-col>
      value: {{ value }}
    </v-col>
    <v-divider vertical></v-divider>
    <v-col>
      <v-text-field v-model="value"></v-text-field>
    </v-col>
  </v-row>
</template>

<style>

</style>
