<template>
  <h1><slot name="header" /></h1>
  <slot name="info" />
  <pre><code><slot name="code" /></code></pre>
  <slot name="parentData" />
  <v-divider class="my-3" />
  <slot name="child" />
</template>

<script setup lang="ts">

</script>
