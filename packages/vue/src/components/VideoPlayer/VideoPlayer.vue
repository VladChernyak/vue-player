<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Chapter, Track, VideoSource } from '@vue-player/core'
import { usePlayer } from '../../composables/usePlayer'
import IcoPlay from '../icons/IcoPlay.vue'
import IcoPause from '../icons/IcoPause.vue'
import VpPlayButton from '../controls/VpPlayButton.vue'
import VpTimeline from '../controls/VpTimeline.vue'
import VpTimeDisplay from '../controls/VpTimeDisplay.vue'
import VpVolumeControl from '../controls/VpVolumeControl.vue'
import VpFullscreenButton from '../controls/VpFullscreenButton.vue'
import VpSettingsButton from '../controls/VpSettingsButton.vue'
import VpLoadingOverlay from '../overlays/VpLoadingOverlay.vue'
import VpErrorOverlay from '../overlays/VpErrorOverlay.vue'

interface Props {
  src?: string
  sources?: VideoSource[]
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  volume?: number
  playbackRate?: number
  playbackRates?: number[]
  live?: boolean
  keyboard?: boolean
  pip?: boolean
  tracks?: Track[]
  chapters?: Chapter[]
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  loop: false,
  muted: false,
  volume: 1,
  playbackRate: 1,
  playbackRates: () => [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
  live: false,
  keyboard: true,
  pip: true,
})

const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  timeUpdate: [time: number]
  buffering: [value: boolean]
  speedChange: [rate: number]
  fullscreenChange: [value: boolean]
  error: [error: import('@vue-player/core').PlayerError]
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const { state, controls, loadSource } = usePlayer(videoRef)

onMounted(() => {
  if (props.src) loadSource(props.src)
})

watch(
  () => props.src,
  (src) => {
    if (src) loadSource(src)
  },
)

watch(
  () => state.isPlaying,
  (v) => (v ? emit('play') : emit('pause')),
)
watch(
  () => state.isEnded,
  (v) => {
    if (v) emit('ended')
  },
)
watch(
  () => state.currentTime,
  (v) => emit('timeUpdate', v),
)
watch(
  () => state.isBuffering,
  (v) => emit('buffering', v),
)
watch(
  () => state.playbackRate,
  (v) => emit('speedChange', v),
)
watch(
  () => state.isFullscreen,
  (v) => emit('fullscreenChange', v),
)
watch(
  () => state.error,
  (v) => {
    if (v) emit('error', v)
  },
)

// ─── Controls visibility ───
const controlsVisible = ref(true)
let hideTimer: ReturnType<typeof setTimeout> | null = null

function showControls() {
  controlsVisible.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (state.isPlaying) controlsVisible.value = false
  }, 3000)
}

function onMouseLeave() {
  if (state.isPlaying) controlsVisible.value = false
}

// ─── Play/pause flash indicator ───
const flashIcon = ref<'play' | 'pause' | null>(null)
const flashKey = ref(0)
let flashTimer: ReturnType<typeof setTimeout> | null = null

function triggerFlash(icon: 'play' | 'pause') {
  if (flashTimer) clearTimeout(flashTimer)
  flashIcon.value = icon
  flashKey.value++ // remount → restart CSS animation
  flashTimer = setTimeout(() => {
    flashIcon.value = null
  }, 700)
}

function togglePlay() {
  if (state.isPlaying) {
    controls.pause()
    triggerFlash('pause')
  } else {
    controls.play()
    triggerFlash('play')
  }
}

// ─── Keyboard shortcuts ───
function onKeydown(e: KeyboardEvent) {
  if (!props.keyboard) return
  showControls()
  const map: Record<string, () => void> = {
    Space: () => {
      e.preventDefault()
      togglePlay()
    },
    KeyK: () => {
      e.preventDefault()
      togglePlay()
    },
    ArrowLeft: () => {
      e.preventDefault()
      controls.seek(state.currentTime - 5)
    },
    ArrowRight: () => {
      e.preventDefault()
      controls.seek(state.currentTime + 5)
    },
    ArrowUp: () => {
      e.preventDefault()
      controls.setVolume(state.volume + 0.1)
    },
    ArrowDown: () => {
      e.preventDefault()
      controls.setVolume(state.volume - 0.1)
    },
    KeyM: () => controls.toggleMute(),
    KeyF: () => controls.toggleFullscreen(),
  }
  map[e.code]?.()
}
</script>

<template>
  <div
    class="vp-player"
    :class="{ 'vp-controls-hidden': !controlsVisible }"
    tabindex="0"
    @mousemove="showControls"
    @mouseleave="onMouseLeave"
    @keydown="onKeydown"
  >
    <video
      ref="videoRef"
      :poster="poster"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay"
      preload="metadata"
    >
      <track
        v-for="track in tracks"
        :key="track.src"
        :src="track.src"
        :label="track.label"
        :srclang="track.language"
        :kind="track.kind ?? 'subtitles'"
        :default="track.default"
      />
    </video>

    <!-- Transparent click area for play/pause — sits above video, below overlays/controls -->
    <div class="vp-video-click-area" @click="togglePlay" />

    <!-- Play/pause flash animation — key remount restarts CSS animation without Vue Transition flicker -->
    <div v-if="flashIcon" :key="flashKey" class="vp-play-flash">
      <div class="vp-play-flash-circle">
        <IcoPause v-if="flashIcon === 'pause'" />
        <IcoPlay v-else />
      </div>
    </div>

    <!-- Loading overlay -->
    <VpLoadingOverlay v-if="state.isLoading || state.isBuffering">
      <slot name="loading" />
    </VpLoadingOverlay>

    <!-- Error overlay -->
    <VpErrorOverlay v-else-if="state.error" :error="state.error" @retry="controls.retry">
      <template #default="slotProps">
        <slot name="error" v-bind="slotProps" />
      </template>
    </VpErrorOverlay>

    <!-- Controls -->
    <div class="vp-controls">
      <VpTimeline
        :current-time="state.currentTime"
        :duration="state.duration"
        :buffered="state.buffered"
        :chapters="chapters"
        @seek="controls.seek"
      />

      <slot name="controls" :state="state" :player="controls">
        <div class="vp-controls-row">
          <VpPlayButton :is-playing="state.isPlaying" @click="togglePlay" />

          <VpVolumeControl
            :volume="state.volume"
            :is-muted="state.isMuted"
            @toggle-mute="controls.toggleMute"
            @set-volume="controls.setVolume"
          />

          <VpTimeDisplay :current-time="state.currentTime" :duration="state.duration" />

          <div class="vp-spacer" />

          <span v-if="state.isLive || live" class="vp-live-badge">
            <span class="vp-live-dot" />
            Live
          </span>

          <VpSettingsButton
            :playback-rate="state.playbackRate"
            :playback-rates="playbackRates"
            @set-speed="controls.setSpeed"
          />

          <VpFullscreenButton
            :is-fullscreen="state.isFullscreen"
            @click="controls.toggleFullscreen"
          />
        </div>
      </slot>
    </div>
  </div>
</template>
