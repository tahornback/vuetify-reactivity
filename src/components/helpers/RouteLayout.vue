<template>
  <h1>
    <slot name="header">
      {{ route.name }}
    </slot>
  </h1>
  <slot name="info" />
  <pre v-if="component"><code><slot name="code">{{ component.template }}</slot></code></pre>
  <!--  My initial concept for this parentData slot is a bit more complex than I want to tackle atm -->
  <template v-if="$slots.parentData || models || events">
    <h2 class="pt-2">
      Parent Data
    </h2>
    <slot name="parentData">
      <prop-value-data-table
        v-if="models"
        :models="models"
        table-name="Parent models"
      />
      <prop-value-data-table
        v-if="events"
        :models="events"
        table-name="Parent caught events"
      />
    </slot>
  </template>
  <v-divider class="my-3" />
  <slot name="child">
    <component :is="component" />
  </slot>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { PropValue } from '@/types'
import PropValueDataTable from '@/components/helpers/PropValueDataTable.vue'

defineProps<{
  component?: any,
  models?: PropValue[]
  events?: any[]
}>()

const route = useRoute()
</script>
