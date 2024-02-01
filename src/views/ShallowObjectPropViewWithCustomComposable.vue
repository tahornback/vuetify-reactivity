<template>
  <p />
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
    @update:model-value="logger"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import PropValueDataTable from '@/components/PropValueDataTable.vue'
import ShallowObjectPropWithCustomComposable from '@/components/ShallowObjectPropWithCustomComposable.vue'

export default defineComponent({
  components: {
    ShallowObjectPropWithCustomComposable,
    PropValueDataTable
  },
  setup () {
    // reactivity | parentProp | parentProp.value
    // isRef      | true       | false
    // isReactive | false      | true
    const parentProp = ref({
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

    function logger (x: any) {
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
      logger,
      events,
      onClick
    }
  }
})
</script>
