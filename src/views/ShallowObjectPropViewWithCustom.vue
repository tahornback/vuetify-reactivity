<template>
  <p></p>
  <prop-value-data-table :models="models" table-name="Shallow Object only with useModel" />
  <prop-value-data-table :models="events" table-name="modelValue update events" />
  <v-divider class="my-3" />
  <shallow-object-prop-with-custom
    v-model="parentProp"
    @update:modelValue="logger"
  ></shallow-object-prop-with-custom>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'
import ShallowObjectPropWithCustom from '@/components/ShallowObjectPropWithCustom.vue'

export default defineComponent({
  components: {
    ShallowObjectPropWithCustom,
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
      console.log('ShallowObjectPropViewWithCustom received v-model update', x)
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
