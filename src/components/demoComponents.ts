import { defineComponent, ref } from 'vue'
import PrimitiveProp from '@/components/PrimitiveProp.vue'
import { shortenIndent } from '@/util'

export const primitivePropsDemo = ({
  stringProp = ref(''),
  numProp = ref(0),
  boolProp = ref(false)
} = {}) => defineComponent({
  components: { PrimitiveProp },
  template: shortenIndent(
    `
      <PrimitiveProp
        v-model:string-prop="stringProp"
        v-model:number-prop="numProp"
        v-model:boolean-prop="boolProp"
      />
    `),
  data: () => ({
    stringProp,
    numProp,
    boolProp
  })
})
