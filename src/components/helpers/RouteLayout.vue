<template>
  <h1>
    <slot name="header">
      {{ route.name }}
    </slot>
  </h1>
  <slot name="info" />
  <pre><code><slot name="code">{{ component.template }}</slot></code></pre>
  <template v-if="$slots.parentData">
    <h2 class="pt-2">
      Parent Data
    </h2>
    <slot name="parentData" />
  </template>
  <v-divider class="my-3" />
  <slot name="child">
    <component :is="component" />
  </slot>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{
  component: any
}>()

const route = useRoute()
</script>
