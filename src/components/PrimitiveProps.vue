<script lang="ts">
import { defineComponent, type Ref, useModel } from 'vue'
import ChildLayout from '@/components/helpers/ChildLayout.vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import type { PropValue } from '@/types'

export default defineComponent({
  name: 'PrimitiveProps',
  components: { PropValueDataTable, ChildLayout },
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
  setup (props) {
    const stringPropModel: Ref<string> = useModel(props, 'stringProp')
    const numberPropModel: Ref<number> = useModel(props, 'numberProp')
    const booleanPropModel: Ref<boolean> = useModel(props, 'booleanProp')
    const models: PropValue[] = [
      { name: 'stringPropModel', value: stringPropModel },
      { name: 'numberPropModel', value: numberPropModel },
      { name: 'booleanPropModel', value: booleanPropModel }
    ]
    return { stringPropModel, numberPropModel, booleanPropModel, models }
  }
})
</script>

<template>
  <child-layout>
    <template #left>
      <prop-value-data-table
        :models="models"
        table-name="Child data"
      />
    </template>
    <template #right>
      <v-text-field v-model="stringPropModel" />
      <v-text-field
        type="number"
        v-model.number="numberPropModel"
      />
      <v-checkbox
        v-model="booleanPropModel"
        label="Checked?"
      />
    </template>
  </child-layout>
</template>
