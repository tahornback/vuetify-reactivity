<template>
  <h1>
    <slot name="header">
      {{ route.name }}
    </slot>
  </h1>
  <slot name="info" />
  <pre v-if="$slots.code"><code><slot name="code" /></code></pre>
  <template v-if="$slots.parentData">
    <h2 class="pt-2">
      Parent Data
    </h2>
    <slot name="parentData" />
  </template>
  <v-divider class="my-3" />
  <slot name="child" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
