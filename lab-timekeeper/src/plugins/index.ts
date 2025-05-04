import type { App } from 'vue'

// plugins
import router from '@/app/router'
import vuetify from './vuetify'
import pinia from './pinia'

export function registerPlugins(app: App) {
  app.use(router).use(vuetify).use(pinia)
}
