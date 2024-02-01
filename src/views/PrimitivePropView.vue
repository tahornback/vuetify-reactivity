<template>
  <prop-value-data-table
    :models="models"
    table-name="Parent Data"
  />
  <v-divider class="my-3" />
  <primitive-prop
    v-model:string-prop="stringProp"
    v-model:number-prop="numProp"
    v-model:boolean-prop="boolProp"
  />
</template>
<script lang="ts">
import PrimitiveProp from '@/components/PrimitiveProp.vue'
import { defineComponent, ref } from 'vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'
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
    return {
      stringProp,
      numProp,
      boolProp,
      models
    }
  }
})
</script>
