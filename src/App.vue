<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Reactivity</v-app-bar-title>
      <template #append>
        <header>
          <div class="wrapper">
            <nav>
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
            </nav>
          </div>
        </header>
      </template>
    </v-app-bar>
    <v-main>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<style scoped>
header {
  //position: fixed;
}
</style>
