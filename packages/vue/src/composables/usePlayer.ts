import { onMounted, onUnmounted, reactive, readonly, ref, watch } from 'vue'
import type { Ref } from 'vue'
import {
  createNativeAdapter,
  detectSourceType,
  createHlsAdapter,
  formatTime,
} from '@vue-player/core'
import type { PlayerState, PlayerError, VideoSource, Track, Quality } from '@vue-player/core'

export interface PlayerControls {
  play: () => Promise<void>
  pause: () => void
  seek: (seconds: number) => void
  setVolume: (value: number) => void
  toggleMute: () => void
  setQuality: (value: number | 'auto') => void
  setSpeed: (rate: number) => void
  setTrack: (track: Track | null) => void
  toggleFullscreen: () => Promise<void>
}

const defaultState = (): PlayerState => ({
  isPlaying: false,
  isPaused: true,
  isEnded: false,
  isLoading: true,
  isBuffering: false,
  currentTime: 0,
  duration: 0,
  buffered: 0,
  volume: 1,
  isMuted: false,
  isFullscreen: false,
  isPiP: false,
  isLive: false,
  currentQuality: 'auto',
  availableQualities: [],
  playbackRate: 1,
  currentTrack: null,
  availableTracks: [],
  error: null,
})

export function usePlayer(videoRef: Ref<HTMLVideoElement | null>) {
  const state = reactive<PlayerState>(defaultState())
  let adapter: ReturnType<typeof createNativeAdapter> | null = null
  let hlsInstance: Awaited<ReturnType<typeof createHlsAdapter>> | null = null

  function syncFromVideo(video: HTMLVideoElement) {
    state.isPlaying = !video.paused && !video.ended
    state.isPaused = video.paused
    state.isEnded = video.ended
    state.currentTime = video.currentTime
    state.duration = isFinite(video.duration) ? video.duration : 0
    state.volume = video.volume
    state.isMuted = video.muted
    state.playbackRate = video.playbackRate
    state.isLive = !isFinite(video.duration)

    if (video.buffered.length > 0) {
      state.buffered = video.buffered.end(video.buffered.length - 1)
    }
  }

  async function loadSource(src: string) {
    const video = videoRef.value
    if (!video) return

    const type = detectSourceType(src)

    if (type === 'hls') {
      hlsInstance = await createHlsAdapter(video, src)
    }
    else {
      adapter = createNativeAdapter(video)
      adapter.load(src)
    }
  }

  function attachListeners(video: HTMLVideoElement) {
    const on = video.addEventListener.bind(video)

    on('loadstart', () => { state.isLoading = true })
    on('canplay', () => { state.isLoading = false })
    on('waiting', () => { state.isBuffering = true })
    on('playing', () => { state.isBuffering = false; syncFromVideo(video) })
    on('play', () => syncFromVideo(video))
    on('pause', () => syncFromVideo(video))
    on('ended', () => syncFromVideo(video))
    on('timeupdate', () => syncFromVideo(video))
    on('volumechange', () => syncFromVideo(video))
    on('durationchange', () => syncFromVideo(video))
    on('progress', () => syncFromVideo(video))
    on('ratechange', () => { state.playbackRate = video.playbackRate })
    on('fullscreenchange', () => { state.isFullscreen = !!document.fullscreenElement })
    on('error', () => {
      const err = video.error
      state.error = {
        code: err?.code ?? 0,
        message: err?.message ?? 'Unknown error',
        type: 'unknown',
      } satisfies PlayerError
      state.isLoading = false
    })
  }

  const controls: PlayerControls = {
    async play() {
      await videoRef.value?.play()
    },
    pause() {
      videoRef.value?.pause()
    },
    seek(seconds) {
      if (videoRef.value) videoRef.value.currentTime = seconds
    },
    setVolume(value) {
      if (!videoRef.value) return
      videoRef.value.volume = Math.max(0, Math.min(1, value))
      videoRef.value.muted = false
    },
    toggleMute() {
      if (videoRef.value) videoRef.value.muted = !videoRef.value.muted
    },
    setQuality(value) {
      state.currentQuality = value
    },
    setSpeed(rate) {
      if (videoRef.value) videoRef.value.playbackRate = rate
    },
    setTrack(track) {
      state.currentTrack = track
    },
    async toggleFullscreen() {
      const el = videoRef.value?.closest('.vp-player') as HTMLElement | null
      if (!el) return
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
      else {
        await el.requestFullscreen()
      }
    },
  }

  onMounted(() => {
    const video = videoRef.value
    if (!video) return
    attachListeners(video)
    syncFromVideo(video)
  })

  onUnmounted(() => {
    adapter?.destroy()
    if (hlsInstance && typeof hlsInstance === 'object' && 'destroy' in hlsInstance) {
      (hlsInstance as { destroy: () => void }).destroy()
    }
  })

  return {
    state: readonly(state),
    controls,
    loadSource,
    formatTime,
  }
}
