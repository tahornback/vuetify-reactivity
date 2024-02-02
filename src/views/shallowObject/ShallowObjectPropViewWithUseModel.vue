<template>
  <route-layout :component="demoComponent">
    <template #info>
      <p>
        This example uses `useModel` to handle v-model changes. This alone is not adequate for object
        models as `useModel` only tracks the root object, not any of the keys within it, and so
        `update:useModel` only emits when the root is replaced. Reactivity appears to work in this case,
        since you end up modifying the same object instance.
      </p>
    </template>
    <template #parentData>
      <prop-value-data-table
        :models="models"
        table-name="Shallow Object only with useModel"
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
import ShallowObjectPropWithUseModel from '@/components/shallowObject/ShallowObjectPropWithUseModel.vue'
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
      componentName: ShallowObjectPropWithUseModel
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
