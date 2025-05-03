import type { App } from 'vue'

// plugins
import vuetify from './vuetify'

export function registerPlugins(app: App) {
  app.use(vuetify)
}
