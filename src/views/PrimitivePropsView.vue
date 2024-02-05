<template>
  <route-layout
    :component="demoComponent"
    :models
  >
    <template #info>
      <p>
        This example creates refs with primitive values in the parent and provides each one individually through multiple
        v-models.
      </p>
    </template>
  </route-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import RouteLayout from '@/components/helpers/RouteLayout.vue'
import { primitivePropsDemo } from '@/components/primitivePropsDemoComponent'

export default defineComponent({
  components: { RouteLayout },
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
