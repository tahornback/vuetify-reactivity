import ShallowObjectPropViewWithUseModel from '@/views/shallowObject/ShallowObjectPropViewWithUseModel.vue'
import { defineComponent, reactive, ref } from 'vue'
import { shortenIndent } from '@/util'
import type { UpdateModelValueHandler } from '@/types'

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
