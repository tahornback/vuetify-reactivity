<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { routes } from '@/router'
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Reactivity</v-app-bar-title>
      <template #append>
        <header>
          <nav>
            <RouterLink v-for="route in routes" :to="route.path" :key="route.path">{{
              route.name
            }}</RouterLink>
          </nav>
        </header>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
