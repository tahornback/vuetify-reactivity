<template>
  <RouteLayout :models>
    <template #info>
      parent contains a list and makes multiple children based on list
    </template>
    <template #child>
      <ShallowObjectPropWithCustom
        v-for="(p, idx) in parentProps"
        :key="idx"
        v-model="parentProps[idx]"
      />
    </template>
  </RouteLayout>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import ShallowObjectPropWithCustom from '@/components/shallowObject/ShallowObjectPropWithCustom.vue'
import RouteLayout from '@/components/helpers/RouteLayout.vue'
import useSetTrapReactive from '@/composables/useSetTrapReactive'

export default defineComponent({
  components: {
    ShallowObjectPropWithCustom,
    RouteLayout
  },
  emits: ['show-snackbar'],
  setup () {
    const parentProps = useSetTrapReactive([
      useSetTrapReactive({
        foo: 'parent bar 1',
        fizz: 'parent buzz 1'
      }), useSetTrapReactive({
        foo: 'parent bar 2',
        fizz: 'parent buzz 2'
      }), useSetTrapReactive({
        foo: 'parent bar 3',
        fizz: 'parent buzz 3'
      })
    ])

    const models = computed(() => {
      return parentProps.map(p => ({ name: 'modelValue', value: p }))
    })

    return {
      parentProps,
      models
    }
  }
})
</script>
