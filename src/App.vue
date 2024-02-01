<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageNav from '@/PageNav.vue'
</script>

<template>
  <v-app>
    <page-nav>
      <v-container fluid>
        <RouterView />
      </v-container>
    </page-nav>
  </v-app>
</template>

<style scoped></style>
