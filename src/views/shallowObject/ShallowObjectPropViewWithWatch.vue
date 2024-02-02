<template>
  <route-layout :component="demoComponent">
    <template #info>
      <p>
        This example uses `useModel` plus `watch`. Although in this case `update:modelValue` emits on
        every model key update, the emitted event does not cause the parent to update model keys. In
        essence, it works identically to the "Shallow Object Prop with useModel" with decoy events to
        make you think it is working as expected.
      </p>
    </template>
    <template #parentData>
      <prop-value-data-table
        :models="models"
        table-name="Shallow Object with additional support"
      />
      <prop-value-data-table
        :models="events"
        table-name="modelValue update events"
      />
    </template>
  </route-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithWatch from '@/components/shallowObject/ShallowObjectPropWithWatch.vue'
import RouteLayout from '@/components/helpers/RouteLayout.vue'
import { shallowObjectPropDemo } from '@/components/shallowObject/shallowObjectDemoComponent'

export default defineComponent({
  components: {
    RouteLayout,
    PropValueDataTable
  },
  emits: ['show-snackbar'],
  setup () {
    const { demoComponent, updateModelValueHandler, events, parentProp, models } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithWatch
    })

    return {
      demoComponent,
      parentProp,
      models,
      updateModelValueHandler,
      events
    }
  }
})
</script>
