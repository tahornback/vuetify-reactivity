import { defineComponent, ref } from 'vue'
import PrimitiveProps from '@/components/PrimitiveProps.vue'
import { shortenIndent } from '@/util'

export const primitivePropsDemo = ({
  stringProp = ref(''),
  numProp = ref(0),
  boolProp = ref(false)
} = {}) => {
  const demoComponent = defineComponent({
    components: { PrimitiveProps },
    template: shortenIndent(
        `
      <PrimitiveProps
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

  return {
    demoComponent,
    stringProp,
    numProp,
    boolProp
  }
}
