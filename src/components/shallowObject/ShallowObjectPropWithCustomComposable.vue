<script lang="ts">
import { computed, defineComponent, isReactive, isRef, type PropType } from 'vue'
import ChildLayout from '@/components/helpers/ChildLayout.vue'
import useObjectModel from '@/composables/useObjectModel'
import type { ShallowObjectExampleModelValue } from '@/types'

export default defineComponent({
  name: 'ShallowObjectPropWithCustomComposable',
  components: {
    ChildLayout
  },
  props: {
    modelValue: {
      type: Object as PropType<ShallowObjectExampleModelValue>,
      default: () => ({
        foo: 'bar',
        fizz: 'buzz'
      })
    }
  },
  setup (props) {
    const modelValueModel = useObjectModel(props, 'modelValue')

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

    function onClick () {
      modelValueModel.value = {
        foo: 'child bar',
        fizz: 'child buzz'
      }
    }

    return {
      modelValueModel,
      trackedValues,
      onClick
    }
  }
})
</script>

<template>
  <child-layout>
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
  </child-layout>
</template>
