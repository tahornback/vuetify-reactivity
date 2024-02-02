<script>
import { defineComponent, ref } from 'vue'
import LayoutTemplate from '@/components/helpers/LayoutTemplate.vue'

export default defineComponent({
  components: { LayoutTemplate },
  setup () {
    const value = ref('default')
    return {
      value
    }
  }
})
</script>

<template>
  <p class="text-h6">
    Self-Contained
  </p>
  <layout-template>
    <template #left>
      value: {{ value }}
    </template>
    <template #right>
      <v-text-field v-model="value" />
    </template>
  </layout-template>
</template>

<style></style>
