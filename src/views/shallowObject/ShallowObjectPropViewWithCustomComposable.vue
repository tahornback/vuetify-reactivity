<template>
  <p>
    This example uses a custom composable based on <a
      href="https://skirtles-code.github.io/vue-examples/patterns/computed-v-model"
      target="_blank"
      rel="noreferrer noopener"
    >skirtles computed v-model post</a>.
  </p>
  <prop-value-data-table
    :models="models"
    table-name="Shallow Object only with custom composable"
  />
  <prop-value-data-table
    :models="events"
    table-name="modelValue update events"
  />
  <v-btn
    variant="text"
    @click="onClick"
  />
  <v-divider class="my-3" />
  <shallow-object-prop-with-custom-composable
    v-model="parentProp"
    @update:model-value="updateModelValueHandler"
  />
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'
import ShallowObjectPropWithCustomComposable from '@/components/shallowObject/ShallowObjectPropWithCustomComposable.vue'
import useSetTrapRef from '@/composables/useSetTrapRef'

export default defineComponent({
  components: {
    ShallowObjectPropWithCustomComposable,
    PropValueDataTable
  },
  emits: ['show-snackbar'],
  setup () {
    // reactivity | parentProp | parentProp.value
    // isRef      | true       | false
    // isReactive | false      | true
    const parentProp = useSetTrapRef({
      foo: 'parent bar',
      fizz: 'parent buzz'
    })
    const models = [
      {
        name: 'parentProp',
        value: parentProp
      }
    ]

    // This list is expected to remain empty
    const events = reactive([])

    function updateModelValueHandler (x: any) {
      console.log('ShallowObjectPropViewWithCustomComposable received v-model update', x)
      // want to display point-in-time value
      events.push({ name: 'modelValue', value: JSON.stringify(x) })
    }

    function onClick () {
      parentProp.value = {
        foo: 'parent bar',
        fizz: 'parent buzz'
      }
    }
    return {
      parentProp,
      models,
      updateModelValueHandler,
      events,
      onClick
    }
  }
})
</script>
