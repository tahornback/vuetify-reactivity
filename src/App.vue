<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageNav from '@/PageNav.vue'
import { ref, watch, watchEffect } from 'vue'

const snackDisplayTime = ref(5000)
const snackText = ref('')
const showSnack = ref(false)
const timesCalled = ref(0)

const showSnackbar = (displayText: string) => {
  snackText.value = displayText
  timesCalled.value++
  snackDisplayTime.value++ // modifying this value refreshes the timeout
  showSnack.value = true
}

watchEffect(() => {
  console.log('watcheffect')
  if (showSnack.value === false) {
    snackText.value = ''
    timesCalled.value = 0
    snackDisplayTime.value = 5000
  }
})
</script>

<template>
  <v-app>
    <v-snackbar
      v-model="showSnack"
      :timeout="snackDisplayTime"
      timer
      vertical
    >
      <p>{{ snackText }}</p>
      <p>This snackbar has been triggered {{ timesCalled }} since it most recently appeared.</p>
    </v-snackbar>
    <page-nav>
      <v-container fluid>
        <RouterView @show-snackbar="showSnackbar" />
      </v-container>
    </page-nav>
  </v-app>
</template>

<style scoped></style>
