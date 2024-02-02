<script>
import { defineComponent, ref } from 'vue'
import LayoutTemplate from '@/components/helpers/LayoutTemplate.vue'
import RouteLayout from '@/components/helpers/RouteLayout.vue'

export default defineComponent({
  components: { RouteLayout, LayoutTemplate },
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
