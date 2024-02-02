<template>
  <h1>{{ route.name }}</h1>
  <p>
    This example uses `useModel` to handle v-model changes. This alone is not adequate for object
    models as `useModel` only tracks the root object, not any of the keys within it, and so
    `update:useModel` only emits when the root is replaced. Reactivity appears to work in this case,
    since you end up modifying the same object instance.
  </p>
  <pre><code>{{ demoComponent.template }}</code></pre>
  <prop-value-data-table
    :models="models"
    table-name="Shallow Object only with useModel"
  />
  <prop-value-data-table
    :models="events"
    table-name="modelValue update events"
  />
  <v-divider class="my-3" />
  <component :is="demoComponent" />
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithUseModel from '@/components/shallowObject/ShallowObjectPropWithUseModel.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'
import { shallowObjectPropDemo } from '@/components/demoComponents'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
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

    // This list is expected to remain empty
    const events = reactive([])

    function updateModelValueHandler (x: any) {
      console.log('ShallowObjectPropViewWithUseModel received v-model update', x)
      // want to display point-in-time value
      events.push({ name: 'modelValue', value: JSON.stringify(x) })
    }

    const { demoComponent } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithUseModel,
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
