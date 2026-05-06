import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HomeDemo from './components/HomeDemo.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('HomeDemo', HomeDemo)
  },
}
