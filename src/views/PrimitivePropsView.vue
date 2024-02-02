<template>
  <route-layout>
    <template #info>
      <p>
        This example creates refs with primitive values in the parent and provides each one individually through multiple
        v-models.
      </p>
    </template>
    <template #code>
      {{ demoComponent.template }}
    </template>
    <template #parentData>
      <prop-value-data-table
        :models="models"
        table-name="Parent Data"
      />
    </template>
    <template #child>
      <component :is="demoComponent" />
    </template>
  </route-layout>
</template>
<script lang="ts">
import PrimitiveProps from '@/components/PrimitiveProps.vue'
import { defineComponent, ref } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import RouteLayout from '@/components/helpers/RouteLayout.vue'
import { primitivePropsDemo } from '@/components/primitivePropsDemoComponent'

export default defineComponent({
  components: { RouteLayout, PropValueDataTable, PrimitiveProps },
  setup () {
    const stringProp = ref('parent value')
    const numProp = ref(1)
    const boolProp = ref(true)
    const models = [
      { name: 'stringProp', value: stringProp },
      { name: 'numProp', value: numProp },
      { name: 'boolProp', value: boolProp }
    ]

    const { demoComponent } = primitivePropsDemo({
      stringProp,
      numProp,
      boolProp
    })

    return {
      demoComponent,
      stringProp,
      numProp,
      boolProp,
      models
    }
  }
})
</script>
