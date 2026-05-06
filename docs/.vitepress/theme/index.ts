import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HomeDemo from './components/HomeDemo.vue'
import LogoIcon from './components/LogoIcon.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(LogoIcon, { size: 280 }),
      'nav-bar-title-before': () => h(LogoIcon, { size: 24 }),
      'nav-bar-content-after': () => h(ThemeSwitcher),
    })
  },
  enhanceApp({ app }) {
    app.component('HomeDemo', HomeDemo)
  },
}
