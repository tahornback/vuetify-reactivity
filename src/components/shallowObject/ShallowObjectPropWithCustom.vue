<script lang="ts">
import { computed, defineComponent, isReactive, isRef, type PropType, reactive, ref, watch } from 'vue'
import ChildLayout from '@/components/helpers/ChildLayout.vue'
import type { ShallowObjectExampleModelValue, WatchTriggers } from '@/types'

export default defineComponent({
  name: 'ShallowObjectPropWithUseCustom',
  components: { ChildLayout },
  props: {
    modelValue: {
      type: Object as PropType<ShallowObjectExampleModelValue>,
      default: () => ({
        foo: 'bar',
        fizz: 'buzz'
      })
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const modelValueModel = ref(JSON.parse(JSON.stringify(props.modelValue)))
    watch(props.modelValue, () => {
      console.log('props.modelValue watch triggered')
      modelValueModel.value = props.modelValue
    })
    watch(
      modelValueModel,
      (v) => {
        emit('update:modelValue', JSON.parse(JSON.stringify(v)))
      },
      { deep: true }
    )

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
  <child-layout>
    <template #left>
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
  </child-layout>
</template>
