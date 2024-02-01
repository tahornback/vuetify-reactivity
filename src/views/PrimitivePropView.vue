<template>
  <p>
    This example creates refs with primitive values in the parent and provides each one individually through multiple
    v-models.
  </p>
  <pre><code>{{ demoComponent.template }}</code></pre>
  <prop-value-data-table
    :models="models"
    table-name="Parent Data"
  />
  <v-divider class="my-3" />
  <component :is="demoComponent" />
</template>
<script lang="ts">
import PrimitiveProp from '@/components/PrimitiveProp.vue'
import { defineComponent, ref } from 'vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'
import { primitivePropsDemo } from '@/components/demoComponents'

export default defineComponent({
  components: { PropValueDataTable, PrimitiveProp },
  setup () {
    const stringProp = ref('parent value')
    const numProp = ref(1)
    const boolProp = ref(true)
    const models = [
      { name: 'stringProp', value: stringProp },
      { name: 'numProp', value: numProp },
      { name: 'boolProp', value: boolProp }
    ]

    const demoComponent = primitivePropsDemo()

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
