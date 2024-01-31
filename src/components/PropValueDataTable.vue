<template>
  <div class="text-h5 py-2">{{ tableName }}</div>
  <v-data-table
    :headers="[
      { title: 'Name', value: 'name', width: '50%', fixed: true },
      { title: 'Value', value: 'value', width: '50%', fixed: true }
    ]"
    :items="models"
  >
    <template #header.name="{ column }">
      <div class="text-h6">{{ column.title }}</div>
    </template>
    <template #header.value="{ column }">
      <div class="text-h6">{{ column.title }}</div>
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
  tableName: string
}

withDefaults(defineProps<Props>(), {
  models: () => [],
  tableName: () => 'default table name'
})
</script>
