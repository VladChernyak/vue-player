import type { App } from 'vue'
import { VideoPlayer } from './components/VideoPlayer'

export { VideoPlayer }
export { default as VpSettingsButton } from './components/controls/VpSettingsButton.vue'
export { usePlayer } from './composables/usePlayer'
export type { PlayerControls } from './composables/usePlayer'

export default {
  install(app: App) {
    app.component('VideoPlayer', VideoPlayer)
  },
}
