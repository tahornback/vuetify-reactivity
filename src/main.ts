import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'dark' },
  icons: {
    defaultSet: 'fa',
    sets: { fa },
    aliases
  }
})

const app = createApp(App)

app.use(router).use(vuetify).mount('#app')
