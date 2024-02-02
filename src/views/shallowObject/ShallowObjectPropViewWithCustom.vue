<template>
  <RouteLayout>
    <template #info>
      This example creates a local copy of the object in the child (with JSON parse/stringify) and emits an event when modified.
    </template>
    <template #code>
      {{ demoComponent.template }}
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
    <template #child>
      <component :is="demoComponent" />
    </template>
  </RouteLayout>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithCustom from '@/components/shallowObject/ShallowObjectPropWithCustom.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'
import { shallowObjectPropDemo } from '@/components/demoComponents'
import { useRoute } from 'vue-router'
import RouteLayout from '@/components/helpers/RouteLayout.vue'

export default defineComponent({
  components: {
    RouteLayout,
    ShallowObjectPropWithCustom,
    PropValueDataTable
  },
  emits: ['show-snackbar'],
  setup () {
    const route = useRoute()
    // reactivity | parentProp | parentProp.value
    // isRef      | true       | false
    // isReactive | false      | true
    const parentProp = useSetTrapRef({
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

    function updateModelValueHandler (x: any) {
      console.log('ShallowObjectPropViewWithCustom received v-model update', x)
      // want to display point-in-time value
      events.push({ name: 'modelValue', value: JSON.stringify(x) })
    }

    const { demoComponent } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithCustom,
      parentProp,
      updateModelValueHandler
    })

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
