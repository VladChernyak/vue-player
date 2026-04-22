import type { App } from 'vue'
import { VideoPlayer } from './components/VideoPlayer'

export { VideoPlayer }
export { usePlayer } from './composables/usePlayer'
export type { PlayerControls } from './composables/usePlayer'

export default {
  install(app: App) {
    app.component('VideoPlayer', VideoPlayer)
  },
}
