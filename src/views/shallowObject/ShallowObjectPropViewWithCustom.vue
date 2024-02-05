<template>
  <RouteLayout
    :component="demoComponent"
    :models
    :events
  >
    <template #info>
      This example creates a local copy of the object in the child (with JSON parse/stringify) and emits an event when modified.
    </template>
  </RouteLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ShallowObjectPropWithCustom from '@/components/shallowObject/ShallowObjectPropWithCustom.vue'
import RouteLayout from '@/components/helpers/RouteLayout.vue'
import { shallowObjectPropDemo } from '@/components/shallowObject/shallowObjectDemoComponent'

export default defineComponent({
  components: {
    RouteLayout
  },
  emits: ['show-snackbar'],
  setup () {
    const { demoComponent, updateModelValueHandler, events, parentProp, models } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithCustom
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
