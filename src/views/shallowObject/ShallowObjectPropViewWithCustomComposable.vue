<template>
  <route-layout :component="demoComponent">
    <template #info>
      <p>
        ✅
        This example uses a custom composable based on <a
          href="https://skirtles-code.github.io/vue-examples/patterns/computed-v-model"
          target="_blank"
          rel="noreferrer noopener"
        >skirtles computed v-model post</a>.
      </p>
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
  </route-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithCustomComposable from '@/components/shallowObject/ShallowObjectPropWithCustomComposable.vue'
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
      componentName: ShallowObjectPropWithCustomComposable
    })

    const models = [
      {
        name: 'parentProp',
        value: parentProp
      }
    ]

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
