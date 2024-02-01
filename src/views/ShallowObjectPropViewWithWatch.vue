<template>
  <p>
    This example uses `useModel` plus `watch`. Although in this case `update:modelValue` emits on
    every model key update, the emitted event does not cause the parent to update model keys. In
    essence, it works identically to the "Shallow Object Prop with useModel" with decoy events to
    make you think it is working as expected.
  </p>
  <prop-value-data-table
    :models="models"
    table-name="Shallow Object with additional support"
  />
  <prop-value-data-table
    :models="events"
    table-name="modelValue update events"
  />
  <v-divider class="my-3" />
  <shallow-object-prop-with-watch
    v-model="parentProp"
    @update:model-value="logger"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'
import ShallowObjectPropWithWatch from '@/components/ShallowObjectPropWithWatch.vue'

export default defineComponent({
  components: {
    ShallowObjectPropWithWatch,
    PropValueDataTable
  },
  setup () {
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
    const events = reactive([])

    function logger (x: any) {
      console.log('ShallowObjectPropViewWithWatch received v-model update', x)
      // want to display point-in-time
      events.push({
        name: 'modelValue',
        value: JSON.stringify(x)
      })
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
