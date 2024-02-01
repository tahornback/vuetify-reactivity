<script lang="ts">
import {
  computed,
  defineComponent,
  isReactive,
  isRef,
  type PropType,
  reactive,
  type Ref,
  useModel,
  watch
} from 'vue'
import LayoutTemplate from '@/components/LayoutTemplate.vue'

interface ModelValue {
  foo: string
  fizz: string
}

interface WatchTriggers {
  variable: string
  deep: boolean
}

export default defineComponent({
  name: 'ShallowObjectPropWithUseModel',
  components: { LayoutTemplate },
  props: {
    modelValue: {
      type: Object as PropType<ModelValue>,
      default: () => ({
        foo: 'bar',
        fizz: 'buzz'
      })
    }
  },
  setup (props) {
    const modelValueModel: Ref<ModelValue> = useModel(props, 'modelValue')
    const trackedValues = computed(() => [
      {
        name: 'props',
        isRef: isRef(props),
        isReactive: isReactive(props),
        value: props
      },
      // This is only reactive because the parent provided a reactive.  There is no magic that makes props.X reactive by default
      {
        name: 'props.modelValue',
        isRef: isRef(props.modelValue),
        isReactive: isReactive(props.modelValue),
        value: props.modelValue
      },
      {
        name: 'modelValueModel',
        isRef: isRef(modelValueModel),
        isReactive: isReactive(modelValueModel),
        value: modelValueModel
      },
      {
        name: 'modelValueModel.value',
        isRef: isRef(modelValueModel.value),
        isReactive: isReactive(modelValueModel.value),
        value: modelValueModel.value
      }
    ])

    const watchTriggers: WatchTriggers[] = reactive([])

    watch(
      modelValueModel,
      () => {
        watchTriggers.push({ variable: 'modelValueModel', deep: true })
      },
      { deep: true }
    )
    watch(
      modelValueModel,
      () => {
        watchTriggers.push({ variable: 'modelValueModel', deep: false })
      },
      { deep: false }
    )
    watch(
      modelValueModel.value,
      () => {
        watchTriggers.push({ variable: 'modelValueModel.value', deep: false })
      },
      { deep: false }
    )
    watch(
      props.modelValue,
      () => {
        watchTriggers.push({ variable: 'props.modelValue', deep: false })
      },
      { deep: false }
    )

    function onClick () {
      modelValueModel.value = {
        foo: 'child bar',
        fizz: 'child buzz'
      }
    }

    return {
      modelValueModel,
      trackedValues,
      watchTriggers,
      onClick
    }
  }
})
</script>

<template>
  <layout-template>
    <template #left>
      <!-- modelValueModel gets automatically unwrapped in the template -->
      props.modelValue === modelValueModel.value - {{ modelValue === modelValueModel }}
      <v-data-table
        :items="trackedValues"
        class="mb-2"
        items-per-page="-1"
      >
        <template #bottom />
      </v-data-table>

      <v-data-table
        :items="watchTriggers"
        items-per-page="-1"
      >
        <template #bottom />
      </v-data-table>
    </template>
    <template #right>
      <v-text-field
        label="foo"
        v-model="modelValueModel.foo"
      />
      <v-text-field
        label="fizz"
        v-model="modelValueModel.fizz"
      />
      <v-btn @click="onClick">
        Reassign modelValueModel.value
      </v-btn>
    </template>
  </layout-template>
</template>
