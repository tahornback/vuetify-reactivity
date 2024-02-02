<template>
  <route-layout>
    <template #info>
      <p>
        This example uses `useModel` plus `watch`. Although in this case `update:modelValue` emits on
        every model key update, the emitted event does not cause the parent to update model keys. In
        essence, it works identically to the "Shallow Object Prop with useModel" with decoy events to
        make you think it is working as expected.
      </p>
    </template>
    <template #code>
      {{ demoComponent.template }}
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
    <template #child>
      <component :is="demoComponent" />
    </template>
  </route-layout>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithWatch from '@/components/shallowObject/ShallowObjectPropWithWatch.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'
import { shallowObjectPropDemo } from '@/components/demoComponents'
import ShallowObjectPropWithUseModel from '@/components/shallowObject/ShallowObjectPropWithUseModel.vue'
import { useRoute } from 'vue-router'
import RouteLayout from '@/components/helpers/RouteLayout.vue'

export default defineComponent({
  components: {
    RouteLayout,
    ShallowObjectPropWithWatch,
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

    const { demoComponent, updateModelValueHandler, events } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithWatch,
      parentProp
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
