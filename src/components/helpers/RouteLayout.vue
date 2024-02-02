<template>
  <h1><slot name="header" /></h1>
  <slot name="info" />
  <pre><code><slot name="code" /></code></pre>
  <h2 class="pt-2">
    Parent Data
  </h2>
  <slot name="parentData" />
  <v-divider class="my-3" />
  <slot name="child" />
</template>

<script setup lang="ts">

</script>
