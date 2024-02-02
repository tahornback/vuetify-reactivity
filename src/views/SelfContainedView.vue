<script>
import { defineComponent, ref } from 'vue'
import ChildLayout from '@/components/helpers/ChildLayout.vue'
import RouteLayout from '@/components/helpers/RouteLayout.vue'

export default defineComponent({
  components: { RouteLayout, ChildLayout },
  setup () {
    const value = ref('default')
    return {
      value
    }
  }
})
</script>

<template>
  <route-layout>
    <template #child>
      <layout-template>
        <template #left>
          value: {{ value }}
        </template>
        <template #right>
          <v-text-field v-model="value" />
        </template>
      </layout-template>
    </template>
  </route-layout>
</template>

<style></style>
