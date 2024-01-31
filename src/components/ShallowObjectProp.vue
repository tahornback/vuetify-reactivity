<script lang="ts">
import {defineComponent, isReactive, isRef, type PropType, reactive, type Ref, useModel, watch} from 'vue'
import LayoutTemplate from '@/components/LayoutTemplate.vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'

interface ModelValue {
  foo: string
  fizz: string
}

export default defineComponent({
  name: 'ShallowObjectProp',
  components: { PropValueDataTable, LayoutTemplate },
  props: {
    modelValue: {
      type: Object as PropType<ModelValue>,
      default: () => ({
        foo: 'bar',
        fizz: 'buzz'
      })
    }
  },
  setup(props) {
    const fns = [isRef, isReactive];
    const modelValueModel: Ref<ModelValue> = useModel(props, 'modelValue')

    const vs = [modelValueModel, modelValueModel.value]
    vs.forEach(v => fns.forEach(fn => console.log(fn(v))))
    console.log('~~~')
    const reactiveGuy: ModelValue = reactive(props.modelValue)
    vs.push(reactiveGuy)
    vs.forEach(v => fns.forEach(fn => console.log(fn(v))))

    const models = [{ name: 'modelValue', value: modelValueModel }]
    const models2 = [{ name: 'reactiveGuy', value: reactiveGuy }]
    watch(
      modelValueModel,
      (value, oldValue) => {
        console.log(
          'ShallowObjectProp detected a deep change in modelValueModel from',
          oldValue,
          'to',
          value
        )
      },
      { deep: true }
    )
    watch(
      modelValueModel,
      (value, oldValue) => {
        console.log(
          'ShallowObjectProp detected a shallow change in modelValueModel from',
          oldValue,
          'to',
          value
        )
      },
      { deep: false }
    )
    watch(
        modelValueModel.value,
        (value, oldValue) => {
          console.log(
              'ShallowObjectProp detected a shallow change in modelValueModel.value from',
              oldValue,
              'to',
              value
          )
        },
        { deep: false }
    )
    watch(
      reactiveGuy,
      (value, oldValue) => {
        console.log(
          'ShallowObjectProp detected a shallow change in reactiveGuy from',
          oldValue,
          'to',
          value
        )
      },
      { deep: false }
    )
    return { modelValueModel, models, reactiveGuy, models2 }
  }
})
</script>

<template>
  <layout-template>
    <template #left>
      <prop-value-data-table :models="models" table-name="Child data" />
      <prop-value-data-table :models="models2" table-name="Reactive guy" />
    </template>
    <template #right>
      <v-text-field label="foo" v-model="modelValueModel.foo" />
      <v-text-field label="fizz" v-model="modelValueModel.fizz" />
      <v-text-field label="rfoo" v-model="reactiveGuy.foo" />
      <v-text-field label="rfizz" v-model="reactiveGuy.fizz" />
    </template>
  </layout-template>
</template>
