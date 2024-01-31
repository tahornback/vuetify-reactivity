<script lang="ts">
import { defineComponent, useModel } from 'vue'
import LayoutTemplate from '@/components/LayoutTemplate.vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'

export default defineComponent({
  name: 'PrimitiveProp',
  components: { PropValueDataTable, LayoutTemplate },
  props: {
    stringProp: {
      type: String,
      default: () => 'default'
    },
    numberProp: {
      type: Number,
      default: () => 0
    },
    booleanProp: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const stringPropModel = useModel(props, 'stringProp')
    const numberPropModel = useModel(props, 'numberProp')
    const booleanPropModel = useModel(props, 'booleanProp')
    const models = [
      { name: 'stringPropModel', value: stringPropModel },
      { name: 'numberPropModel', value: numberPropModel },
      { name: 'booleanPropModel', value: booleanPropModel }
    ]
    return { stringPropModel, numberPropModel, booleanPropModel, models }
  }
})
</script>

<template>
  <layout-template>
    <template #left>
      <prop-value-data-table :models="models" table-name="Child data" />
    </template>
    <template #right>
      <v-text-field v-model="stringPropModel"></v-text-field>
      <v-text-field type="number" v-model.number="numberPropModel"></v-text-field>
      <v-checkbox v-model="booleanPropModel" label="Checked?"></v-checkbox>
    </template>
  </layout-template>
</template>
