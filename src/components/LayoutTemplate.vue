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

<style scoped></style>
