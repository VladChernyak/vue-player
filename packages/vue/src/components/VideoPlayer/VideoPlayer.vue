<script setup lang="ts">
import { ref, watch } from 'vue'
import type { VideoSource, Track, Chapter } from '@vue-player/core'
import { usePlayer } from '../../composables/usePlayer'
import './VideoPlayer.css'

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
  seeking: [time: number]
  buffering: [value: boolean]
  qualityChange: [quality: number | 'auto']
  speedChange: [rate: number]
  trackChange: [track: Track | null]
  fullscreenChange: [value: boolean]
  error: [error: import('@vue-player/core').PlayerError]
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const controlsVisible = ref(true)
let hideTimer: ReturnType<typeof setTimeout> | null = null

const { state, controls, loadSource, formatTime } = usePlayer(videoRef)

watch(
  () => props.src,
  (src) => { if (src) loadSource(src) },
  { immediate: true }
)

watch(() => state.isPlaying, (v) => v ? emit('play') : emit('pause'))
watch(() => state.isEnded, (v) => { if (v) emit('ended') })
watch(() => state.currentTime, (v) => emit('timeUpdate', v))
watch(() => state.isBuffering, (v) => emit('buffering', v))
watch(() => state.isFullscreen, (v) => emit('fullscreenChange', v))
watch(() => state.error, (v) => { if (v) emit('error', v) })

function showControls() {
  controlsVisible.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (state.isPlaying) controlsVisible.value = false
  }, 3000)
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.keyboard) return
  switch (e.code) {
    case 'Space':
    case 'KeyK':
      e.preventDefault()
      state.isPlaying ? controls.pause() : controls.play()
      break
    case 'ArrowLeft':
      e.preventDefault()
      controls.seek(state.currentTime - 5)
      break
    case 'ArrowRight':
      e.preventDefault()
      controls.seek(state.currentTime + 5)
      break
    case 'ArrowUp':
      e.preventDefault()
      controls.setVolume(state.volume + 0.1)
      break
    case 'ArrowDown':
      e.preventDefault()
      controls.setVolume(state.volume - 0.1)
      break
    case 'KeyM':
      controls.toggleMute()
      break
    case 'KeyF':
      controls.toggleFullscreen()
      break
  }
}

function onTimelineClick(e: MouseEvent) {
  const track = (e.currentTarget as HTMLElement)
  const rect = track.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  controls.seek(ratio * state.duration)
}

const progressPct = () => state.duration ? (state.currentTime / state.duration) * 100 : 0
const bufferedPct = () => state.duration ? (state.buffered / state.duration) * 100 : 0
const thumbLeft = () => `${progressPct()}%`
</script>

<template>
  <div
    class="vp-player"
    :class="{ 'vp-controls-hidden': !controlsVisible }"
    @mousemove="showControls"
    @mouseleave="controlsVisible = false"
    @keydown="handleKeydown"
    tabindex="0"
  >
    <video
      ref="videoRef"
      :poster="poster"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay"
      :playbackRate="playbackRate"
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

    <!-- Loading overlay -->
    <div v-if="state.isLoading || state.isBuffering" class="vp-overlay">
      <slot name="loading">
        <div class="vp-loading-spinner" />
      </slot>
    </div>

    <!-- Error overlay -->
    <div v-if="state.error" class="vp-overlay">
      <slot name="error" :error="state.error">
        <div class="vp-error">
          <span>⚠</span>
          <span>{{ state.error.message }}</span>
        </div>
      </slot>
    </div>

    <!-- Controls -->
    <div class="vp-controls">
      <!-- Timeline -->
      <div class="vp-timeline" @click="onTimelineClick">
        <div class="vp-timeline-track">
          <div class="vp-timeline-buffered" :style="{ width: bufferedPct() + '%' }" />
          <div class="vp-timeline-progress" :style="{ width: progressPct() + '%' }" />
        </div>
        <div class="vp-timeline-thumb" :style="{ left: thumbLeft() }" />
      </div>

      <!-- Controls row -->
      <slot name="controls" :state="state" :player="controls">
        <div class="vp-controls-row">
          <!-- Play/Pause -->
          <button class="vp-button" @click="state.isPlaying ? controls.pause() : controls.play()">
            <slot v-if="state.isPlaying" name="pause-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
            </slot>
            <slot v-else name="play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </slot>
          </button>

          <!-- Volume -->
          <button class="vp-button" @click="controls.toggleMute()">
            <slot name="volume-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path v-if="state.isMuted || state.volume === 0" d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-9.5-9L7 7H3v4h4l2.5 2.5V3zM19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                <path v-else d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            </slot>
          </button>

          <!-- Time -->
          <span class="vp-time">
            {{ formatTime(state.currentTime) }}
            <span class="vp-time-separator">/</span>
            {{ formatTime(state.duration) }}
          </span>

          <div class="vp-spacer" />

          <!-- Live badge -->
          <span v-if="state.isLive || live" class="vp-live-badge">Live</span>

          <!-- Fullscreen -->
          <button class="vp-button" @click="controls.toggleFullscreen()">
            <slot name="fullscreen-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path v-if="state.isFullscreen" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                <path v-else d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            </slot>
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>
