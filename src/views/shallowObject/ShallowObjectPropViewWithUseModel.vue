<template>
  <route-layout>
    <template #info>
      <p>
        This example uses `useModel` to handle v-model changes. This alone is not adequate for object
        models as `useModel` only tracks the root object, not any of the keys within it, and so
        `update:useModel` only emits when the root is replaced. Reactivity appears to work in this case,
        since you end up modifying the same object instance.
      </p>
    </template>
    <template #code>
      {{ demoComponent.template }}
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
    <template #child>
      <component :is="demoComponent" />
    </template>
  </route-layout>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithUseModel from '@/components/shallowObject/ShallowObjectPropWithUseModel.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'
import { shallowObjectPropDemo } from '@/components/demoComponents'
import { useRoute } from 'vue-router'
import RouteLayout from '@/components/helpers/RouteLayout.vue'

export default defineComponent({
  components: {
    RouteLayout,
    ShallowObjectPropWithUseModel,
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
      componentName: ShallowObjectPropWithUseModel,
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
