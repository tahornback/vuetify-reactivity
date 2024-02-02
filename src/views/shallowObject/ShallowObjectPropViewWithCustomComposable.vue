<template>
  <route-layout>
    <template #info>
      <p>
        This example uses a custom composable based on <a
          href="https://skirtles-code.github.io/vue-examples/patterns/computed-v-model"
          target="_blank"
          rel="noreferrer noopener"
        >skirtles computed v-model post</a>.
      </p>
    </template>
    <template #code>
      {{ demoComponent.template }}
    </template>
    <template #parentData>
      <prop-value-data-table
        :models="models"
        table-name="Shallow Object only with custom composable"
      />
      <prop-value-data-table
        :models="events"
        table-name="modelValue update events"
      />
      <v-btn
        variant="text"
        @click="onClick"
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
import ShallowObjectPropWithCustomComposable from '@/components/shallowObject/ShallowObjectPropWithCustomComposable.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'
import { shallowObjectPropDemo } from '@/components/demoComponents'
import ShallowObjectPropWithUseModel from '@/components/shallowObject/ShallowObjectPropWithUseModel.vue'
import { useRoute } from 'vue-router'
import RouteLayout from '@/components/helpers/RouteLayout.vue'

export default defineComponent({
  components: {
    RouteLayout,
    ShallowObjectPropWithCustomComposable,
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
      console.log('ShallowObjectPropViewWithCustomComposable received v-model update', x)
      // want to display point-in-time value
      events.push({ name: 'modelValue', value: JSON.stringify(x) })
    }

    const { demoComponent } = shallowObjectPropDemo({
      componentName: ShallowObjectPropWithCustomComposable,
      parentProp,
      updateModelValueHandler
    })

    function onClick () {
      parentProp.value = {
        foo: 'parent bar',
        fizz: 'parent buzz'
      }
    }
    return {
      demoComponent,
      parentProp,
      models,
      updateModelValueHandler,
      events,
      onClick,
      route
    }
  }
})
</script>
