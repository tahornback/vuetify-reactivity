<script setup lang="ts"></script>

<template>
  <v-row align="center">
    <v-col>
      <slot name="left"></slot>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col>
      <slot name="right"></slot>
    </v-col>
  </v-row>
</template>

<style scoped></style>
