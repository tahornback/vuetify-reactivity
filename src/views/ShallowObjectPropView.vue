<template>
  <prop-value-data-table :models="models" table-name="Parent Data" />
  <v-divider class="my-3" />
  <shallow-object-prop :model-value="parentProp" @update:modelValue="logger"></shallow-object-prop>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'
import ShallowObjectProp from '@/components/ShallowObjectProp.vue'

export default defineComponent({
  components: {
    ShallowObjectProp,
    PropValueDataTable
  },
  setup() {
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
