import ShallowObjectPropViewWithUseModel from '@/views/shallowObject/ShallowObjectPropViewWithUseModel.vue'
import { defineComponent, reactive } from 'vue'
import type { Ref } from 'vue'
import { shortenIndent } from '@/util'
import type { UpdateModelValueHandler } from '@/types'
import useSetTrapRef from '@/composables/useSetTrapRef'

export const shallowObjectPropDemo = ({
  componentName = ShallowObjectPropViewWithUseModel,
  parentProp = undefined as Ref<Object> | undefined,
  updateModelValueHandler = undefined as UpdateModelValueHandler | undefined
} = {}) => {
  parentProp ??= useSetTrapRef({
    foo: 'parent bar',
    fizz: 'parent buzz'
  })

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
