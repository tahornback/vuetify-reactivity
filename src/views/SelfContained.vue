<script>
import { defineComponent, ref } from 'vue'
import LayoutTemplate from '@/components/LayoutTemplate.vue'

export default defineComponent({
  components: { LayoutTemplate },
  setup() {
    const value = ref('default')
    return {
      value
    }
  }
})
</script>

<template>
  <p class="text-h6">Self-Contained</p>
  <layout-template>
    <template #left> value: {{ value }} </template>
    <template #right>
      <v-text-field v-model="value"></v-text-field>
    </template>
  </layout-template>
</template>

<style></style>
