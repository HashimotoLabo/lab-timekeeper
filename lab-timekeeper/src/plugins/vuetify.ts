import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// localeの設定
import { ja, en } from 'vuetify/locale'

// iconの設定
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    global: {
      style: {
        // デフォルトのフォントを指定
        fontFamily: '"Noto Serif JP", serif',
      },
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          // ここにテーマの色を指定する
          background: '#FFFFFF',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'ja',
    fallback: 'en',
    messages: { ja, en },
  },
})

export default vuetify
