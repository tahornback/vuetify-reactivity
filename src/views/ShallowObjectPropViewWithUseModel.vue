<template>
  <prop-value-data-table :models="models" table-name="Parent Data" />
  <v-divider class="my-3" />
  <shallow-object-prop-with-use-model :model-value="parentProp" @update:modelValue="logger"></shallow-object-prop-with-use-model>
</template>
<script lang="ts">
import { defineComponent, isReactive, isRef, ref } from 'vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'
import ShallowObjectPropWithUseModel from '@/components/ShallowObjectPropWithUseModel.vue'

export default defineComponent({
  components: {
    ShallowObjectPropWithUseModel,
    PropValueDataTable
  },
  setup() {
    // reactivity | parentProp | parentProp.value
    // isRef      | true       | false
    // isReactive | false      | true
    const parentProp = ref({
      foo: 'parent bar',
      fizz: 'parent buzz'
    })
    const models = [
      {
        name: 'parentProp',
        value: parentProp
      }
    ]
    function logger(x: any) {
      console.log('ShallowObjectPropView received v-model update', x)
    }
    return {
      parentProp,
      models,
      logger
    }
  }
})
</script>
