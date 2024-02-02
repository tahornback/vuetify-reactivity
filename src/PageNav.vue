<script setup lang="ts">
import { routes } from '@/router'
import { ref } from 'vue'

const navOpen = ref(false)
// routes.

const onNavIconClicked = () => {
  navOpen.value = !navOpen.value
}
</script>

<template>
  <v-navigation-drawer
    v-model="navOpen"
    temporary
  >
    <v-list>
      <template
        v-for="route in routes"
        :key="route.path"
      >
        <v-list-group
          v-if="route.children"
          :value="route.name"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="route.name"
            />
          </template>
          <v-list-item
            v-for="childRoute in route.children"
            :key="childRoute.path"
            :to="childRoute.path"
            :title="childRoute.name.replace(route.name, '').trim()"
          />
        </v-list-group>
        <v-list-item
          v-else
          :to="route.path"
          :title="route.name"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar>
    <template #prepend>
      <v-app-bar-nav-icon @click="onNavIconClicked" />
    </template>
    <v-app-bar-title>Reactivity</v-app-bar-title>
    <template #append>
      <v-btn icon>
        <v-icon icon="fas fa-circle-info" />
        <v-tooltip activator="parent">
          Page Layout:<br>
          Blurb on purpose of example<br>
          Usage of child component at bottom of page<br>
          Data that the parent currently owns/has access to and caught event info<br>
          Child component with current state and fields to modify
        </v-tooltip>
      </v-btn>
    </template>
  </v-app-bar>
  <v-main>
    <slot />
  </v-main>
</template>

<style scoped></style>
