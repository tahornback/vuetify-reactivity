<template>
  <h1>{{ route.name }}</h1>
  <p>
    This example uses `useModel` plus `watch`. Although in this case `update:modelValue` emits on
    every model key update, the emitted event does not cause the parent to update model keys. In
    essence, it works identically to the "Shallow Object Prop with useModel" with decoy events to
    make you think it is working as expected.
  </p>
  <pre><code>{{ demoComponent.template }}</code></pre>
  <prop-value-data-table
    :models="models"
    table-name="Shallow Object with additional support"
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
import ShallowObjectPropWithWatch from '@/components/shallowObject/ShallowObjectPropWithWatch.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'
import { shallowObjectPropDemo } from '@/components/demoComponents'
import ShallowObjectPropWithUseModel from '@/components/shallowObject/ShallowObjectPropWithUseModel.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
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
    const events = reactive([])

    function updateModelValueHandler (x: any) {
      console.log('ShallowObjectPropViewWithWatch received v-model update', x)
      // want to display point-in-time
      events.push({
        name: 'modelValue',
        value: JSON.stringify(x)
      })
    }

    const { demoComponent } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithWatch,
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
