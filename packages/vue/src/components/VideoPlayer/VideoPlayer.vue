<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Chapter, ThumbnailCue, Track, VideoSource } from '@vue-player/core'
import { isPiPSupported, parseThumbnailVtt } from '@vue-player/core'
import { usePlayer } from '../../composables/usePlayer'
import IcoPlay from '../icons/IcoPlay.vue'
import IcoPause from '../icons/IcoPause.vue'
import VpPlayButton from '../controls/VpPlayButton.vue'
import VpTimeline from '../controls/VpTimeline.vue'
import VpTimeDisplay from '../controls/VpTimeDisplay.vue'
import VpVolumeControl from '../controls/VpVolumeControl.vue'
import VpSubtitlesButton from '../controls/VpSubtitlesButton.vue'
import VpPiPButton from '../controls/VpPiPButton.vue'
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
  thumbnails?: string
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
  trackChange: [track: import('@vue-player/core').Track | null]
  fullscreenChange: [value: boolean]
  error: [error: import('@vue-player/core').PlayerError]
}>()

const playerEl = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const { state, controls, loadSource } = usePlayer(videoRef)

const pipSupported = ref(false)

// Poster is visible until playback starts for the first time
const showPoster = computed(() => !!props.poster && !state.isPlaying && state.currentTime === 0)

// ─── Custom subtitle rendering ───
const currentCues = ref<string[]>([])

function syncSubtitles() {
  const video = videoRef.value
  const track = state.currentTrack
  if (!video || !track) {
    currentCues.value = []
    return
  }

  for (const el of Array.from(video.querySelectorAll<HTMLTrackElement>('track'))) {
    const tt = el.track
    if (tt.language === track.language && tt.label === track.label) {
      currentCues.value = tt.activeCues
        ? Array.from(tt.activeCues)
            .map((c) => (c as VTTCue).text)
            .filter(Boolean)
        : []
      return
    }
  }
  currentCues.value = []
}

onMounted(() => {
  pipSupported.value = isPiPSupported()
  if (props.src) loadSource(props.src)
  videoRef.value?.addEventListener('timeupdate', syncSubtitles)
})

// Apply the active (or default) track once canplay fires — at that point all browser
// async track-mode resets from video.load() are guaranteed to have completed.
watch(
  () => state.isLoading,
  (loading) => {
    if (loading) return
    const track = state.currentTrack ?? props.tracks?.find((t) => t.default) ?? null
    if (track) controls.setTrack(track)
  },
)

onBeforeUnmount(() => videoRef.value?.removeEventListener('timeupdate', syncSubtitles))

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
  () => state.currentTrack,
  (v) => emit('trackChange', v),
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

// ─── Thumbnails ───
const thumbnailCues = ref<ThumbnailCue[]>([])

watch(
  () => props.thumbnails,
  async (url) => {
    thumbnailCues.value = url ? await parseThumbnailVtt(url) : []
  },
  { immediate: true },
)

// ─── Controls visibility ───
const controlsVisible = ref(true)
let hideTimer: ReturnType<typeof setTimeout> | null = null

function showControls() {
  controlsVisible.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (state.isPlaying && !showPoster.value) controlsVisible.value = false
  }, 3000)
}

function onMouseLeave() {
  if (state.isPlaying && !showPoster.value) controlsVisible.value = false
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
    KeyP: () => {
      if (props.pip && pipSupported.value) controls.togglePiP()
    },
  }
  map[e.code]?.()
}
</script>

<template>
  <div
    ref="playerEl"
    class="vp-player"
    :class="{ 'vp-controls-hidden': !controlsVisible }"
    tabindex="0"
    @mousedown.capture="playerEl?.focus()"
    @mousemove="showControls"
    @mouseleave="onMouseLeave"
    @keydown="onKeydown"
  >
    <video
      ref="videoRef"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay"
      preload="metadata"
      crossorigin="anonymous"
    >
      <track
        v-for="track in tracks"
        :key="track.src"
        :src="track.src"
        :label="track.label"
        :srclang="track.language"
        :kind="track.kind ?? 'subtitles'"
      />
    </video>

    <!-- Poster overlay: cover-fit, fades out once playback starts -->
    <Transition name="vp-poster">
      <div
        v-if="showPoster"
        class="vp-poster"
        :style="{ backgroundImage: `url(${props.poster})` }"
      />
    </Transition>

    <!-- Custom subtitle overlay — positioned above controls bar -->
    <div v-if="currentCues.length > 0" class="vp-subtitles" aria-live="polite">
      <span v-for="(cue, i) in currentCues" :key="i" class="vp-subtitle-cue">{{ cue }}</span>
    </div>

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
        :thumbnail-cues="thumbnailCues.length ? thumbnailCues : undefined"
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

          <VpSubtitlesButton
            v-if="tracks && tracks.length > 0"
            :tracks="tracks"
            :current-track="state.currentTrack"
            @set-track="controls.setTrack"
          />

          <VpPiPButton
            v-if="pip && pipSupported"
            :is-pi-p="state.isPiP"
            @click="controls.togglePiP"
          />

          <VpSettingsButton
            :playback-rate="state.playbackRate"
            :playback-rates="playbackRates"
            :available-qualities="state.availableQualities"
            :current-quality="state.currentQuality"
            @set-speed="controls.setSpeed"
            @set-quality="controls.setQuality"
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
