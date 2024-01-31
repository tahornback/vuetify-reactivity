<template>
  <prop-value-data-table :models="models" table-name="Shallow Object only with useModel" />
  <prop-value-data-table :models="events" table-name="modelValue update events" />
  <v-divider class="my-3" />
  <shallow-object-prop-with-use-model
    v-model="parentProp"
    @update:modelValue="logger"
  ></shallow-object-prop-with-use-model>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
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

    // This list is expected to remain empty
    const events = reactive([])

    function logger(x: any) {
      console.log('ShallowObjectPropViewWithUseModel received v-model update', x)
      // want to display point-in-time value
      events.push({ name: 'modelValue', value: JSON.stringify(x) })
    }
    return {
      parentProp,
      models,
      logger,
      events
    }
  }
})
</script>
