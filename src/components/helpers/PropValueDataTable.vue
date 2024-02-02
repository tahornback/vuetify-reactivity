<template>
  <div
    v-if="tableName"
    class="text-h5 py-2"
  >
    {{ tableName }}
  </div>
  <v-data-table
    :headers="[
      { title: 'Name', value: 'name', width: '1%', fixed: true },
      { title: 'Value', value: 'value' }
    ]"
    :items="models"
    items-per-page="-1"
  >
    <template #header.name="{ column }">
      <div class="text-h6">
        {{ column.title }}
      </div>
    </template>
    <template #header.value="{ column }">
      <div class="text-h6">
        {{ column.title }}
      </div>
    </template>
    <template #bottom />
  </v-data-table>
</template>
<script setup lang="ts">
interface Props {
  models: {
    name: string
    value: any
  }[]
  tableName?: string
}

withDefaults(defineProps<Props>(), {
  models: () => [],
  tableName: undefined
})
</script>
