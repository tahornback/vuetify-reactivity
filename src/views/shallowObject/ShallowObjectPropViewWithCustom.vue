<template>
  <RouteLayout :component="demoComponent">
    <template #info>
      This example creates a local copy of the object in the child (with JSON parse/stringify) and emits an event when modified.
    </template>
    <template #parentData>
      <prop-value-data-table
        :models="models"
        table-name="Parent details"
      />
      <prop-value-data-table
        :models="events"
        table-name="update:modelValue events"
      />
    </template>
  </RouteLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithCustom from '@/components/shallowObject/ShallowObjectPropWithCustom.vue'
import { useRoute } from 'vue-router'
import RouteLayout from '@/components/helpers/RouteLayout.vue'
import { shallowObjectPropDemo } from '@/components/shallowObject/shallowObjectDemoComponent'

export default defineComponent({
  components: {
    RouteLayout,
    PropValueDataTable
  },
  emits: ['show-snackbar'],
  setup () {
    const route = useRoute()

    const { demoComponent, updateModelValueHandler, events, parentProp } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithCustom
    })

    const models = [
      {
        name: 'parentProp',
        value: parentProp
      }
    ]

    return {
      demoComponent,
      parentProp,
      models,
      updateModelValueHandler,
      events,
      route
    }
  }
})
</script>
