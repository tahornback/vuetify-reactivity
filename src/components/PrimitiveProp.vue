<script lang="ts">
import { defineComponent, useModel } from 'vue'
import LayoutTemplate from '@/components/LayoutTemplate.vue'

export default defineComponent({
  name: 'PrimitiveProp',
  components: { LayoutTemplate },
  props: {
    stringProp: {
      type: String,
      default: () => 'default'
    }
  },
  setup(props) {
    const stringPropModel = useModel(props, 'stringProp')
    return { stringPropModel }
  }
})
</script>

<template>
  <p class="text-h6">Primitive Prop</p>
  <layout-template>
    <template #left> stringPropModel: {{ stringPropModel }} </template>
    <template #right>
      <v-text-field v-model="stringPropModel"></v-text-field>
    </template>
  </layout-template>
</template>

<style scoped></style>
