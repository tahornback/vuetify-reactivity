<template>
  <h1>{{ route.name }}</h1>
  <p>This example creates a local copy of the object in the child (with JSON parse/stringify) and emits an event when modified.</p>
  <pre><code>{{ demoComponent.template }}</code></pre>
  <prop-value-data-table
    :models="models"
    table-name="Shallow Object only with custom"
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
import ShallowObjectPropWithCustom from '@/components/shallowObject/ShallowObjectPropWithCustom.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'
import { shallowObjectPropDemo } from '@/components/demoComponents'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
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
