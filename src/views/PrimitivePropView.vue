<template>
  <primitive-prop v-model:stringProp="string"></primitive-prop>
</template>
<script lang="ts">
import PrimitiveProp from '@/components/PrimitiveProp.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { PrimitiveProp },
  setup() {
    const string = ref('parent value')

    return {
      string
    }
  }
})
</script>
