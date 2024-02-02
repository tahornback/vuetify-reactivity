<script setup lang="ts"></script>

<template>
  <v-row>
    <v-col>
      <slot name="left" />
    </v-col>
    <v-divider vertical />
    <v-col>
      <slot name="right" />
    </v-col>
  </v-row>
</template>

<style scoped>
.v-row {
  margin: 4px;
  border-radius: 4px;
  border: 2px solid dimgrey;
}
</style>
