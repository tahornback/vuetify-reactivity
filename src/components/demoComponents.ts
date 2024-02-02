import { defineComponent, reactive, ref } from 'vue'
import PrimitiveProps from '@/components/PrimitiveProps.vue'
import { shortenIndent } from '@/util'
import ShallowObjectPropViewWithUseModel from '@/views/shallowObject/ShallowObjectPropViewWithUseModel.vue'

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

type UpdateModelValueHandler = (x: any) => void

export const shallowObjectPropDemo = ({
  componentName = ShallowObjectPropViewWithUseModel,
  parentProp = ref({}),
  updateModelValueHandler = undefined as UpdateModelValueHandler | undefined
} = {}) => {
  const events: {name: string, value: string}[] = reactive([])

  updateModelValueHandler ??= function updateModelValueHandler (x: any) {
    console.log(`${componentName.name} received v-model update`, x)
    // want to display point-in-time value
    events.push({ name: 'modelValue', value: JSON.stringify(x) })
  }

  const demoComponent = defineComponent({
    components: { [componentName.name]: componentName },
    template: shortenIndent(
    `
      <${componentName.name}
        v-model="parentProp"
        @update:model-value="updateModelValueHandler"
      />
    `),
    data: () => ({
      parentProp,
      updateModelValueHandler
    })
  })

  return {
    demoComponent,
    parentProp,
    updateModelValueHandler,
    events
  }
}
