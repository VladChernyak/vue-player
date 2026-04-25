import { onMounted, onUnmounted, reactive, readonly } from 'vue'
import type { Ref } from 'vue'
import { createNativeAdapter, detectSourceType } from '@vue-player/core'
import type { PlayerState, PlayerError, Track } from '@vue-player/core'

export interface PlayerControls {
  play: () => Promise<void>
  pause: () => void
  seek: (seconds: number) => void
  setVolume: (value: number) => void
  toggleMute: () => void
  setSpeed: (rate: number) => void
  setTrack: (track: Track | null) => void
  toggleFullscreen: () => Promise<void>
  retry: () => void
}

const ERROR_MESSAGES: Record<number, string> = {
  1: 'Playback was aborted.',
  2: 'Network error — could not load the video.',
  3: 'The video format is not supported by your browser.',
  4: 'Video not found or format not supported.',
}

function makeDefaultState(): PlayerState {
  return {
    isPlaying: false,
    isPaused: true,
    isEnded: false,
    isLoading: false,
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
  }
}

export function usePlayer(videoRef: Ref<HTMLVideoElement | null>) {
  const state = reactive<PlayerState>(makeDefaultState())

  let nativeAdapter: ReturnType<typeof createNativeAdapter> | null = null
  let hlsInstance: { destroy: () => void } | null = null
  let lastSrc = ''

  function clearVideo() {
    const video = videoRef.value
    if (!video) return
    video.pause()
    video.removeAttribute('src')
    video.load()
  }

  function destroyAdapters() {
    nativeAdapter?.destroy()
    nativeAdapter = null
    hlsInstance?.destroy()
    hlsInstance = null
    // Always clear video element between source switches
    clearVideo()
  }

  function syncFromVideo(video: HTMLVideoElement) {
    state.isPlaying = !video.paused && !video.ended
    state.isPaused = video.paused
    state.isEnded = video.ended
    state.currentTime = video.currentTime
    state.duration = Number.isFinite(video.duration) ? video.duration : 0
    state.volume = video.volume
    state.isMuted = video.muted
    state.playbackRate = video.playbackRate
    state.isLive = video.duration === Infinity
    if (video.buffered.length > 0) {
      state.buffered = video.buffered.end(video.buffered.length - 1)
    }
  }

  async function loadSource(src: string) {
    const video = videoRef.value
    if (!video) return

    lastSrc = src
    destroyAdapters()

    state.error = null
    state.isLoading = true
    state.currentTime = 0
    state.duration = 0
    state.buffered = 0
    state.isLive = false

    const type = detectSourceType(src)

    if (type === 'hls') {
      try {
        const { default: Hls } = await import('hls.js')

        if (!Hls.isSupported()) {
          // Safari — native HLS support
          video.src = src
          return
        }

        const hls = new Hls({ enableWorker: true })

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (!data.fatal) return
          const code = (data as any).response?.code ?? 0
          const isNotFound = code === 404
          state.error = {
            code,
            message: isNotFound
              ? 'Stream not found (404).'
              : 'Failed to load the stream. Check the URL or try again.',
            type: 'network',
          }
          state.isLoading = false
          state.isBuffering = false
          hls.destroy()
        })

        hls.loadSource(src)
        hls.attachMedia(video)
        hlsInstance = hls
      } catch {
        state.error = { code: 0, message: 'Failed to initialize HLS player.', type: 'source' }
        state.isLoading = false
      }
    } else {
      nativeAdapter = createNativeAdapter(video)
      nativeAdapter.load(src)
    }
  }

  function onFullscreenChange() {
    state.isFullscreen = !!document.fullscreenElement
  }

  function attachListeners(video: HTMLVideoElement) {
    video.addEventListener('loadstart', () => {
      state.isLoading = true
      state.error = null
    })
    video.addEventListener('loadedmetadata', () => syncFromVideo(video))
    video.addEventListener('canplay', () => {
      state.isLoading = false
    })
    video.addEventListener('waiting', () => {
      state.isBuffering = true
    })
    video.addEventListener('playing', () => {
      state.isBuffering = false
      syncFromVideo(video)
    })
    video.addEventListener('play', () => syncFromVideo(video))
    video.addEventListener('pause', () => syncFromVideo(video))
    video.addEventListener('ended', () => syncFromVideo(video))
    video.addEventListener('timeupdate', () => syncFromVideo(video))
    video.addEventListener('volumechange', () => syncFromVideo(video))
    video.addEventListener('durationchange', () => syncFromVideo(video))
    video.addEventListener('progress', () => syncFromVideo(video))
    video.addEventListener('ratechange', () => {
      state.playbackRate = video.playbackRate
    })
    video.addEventListener('error', () => {
      const err = video.error
      if (!err) return
      const typeMap: Record<number, PlayerError['type']> = {
        [MediaError.MEDIA_ERR_NETWORK]: 'network',
        [MediaError.MEDIA_ERR_DECODE]: 'decode',
        [MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED]: 'source',
      }
      state.error = {
        code: err.code,
        message: ERROR_MESSAGES[err.code] ?? err.message ?? 'Unknown playback error.',
        type: typeMap[err.code] ?? 'unknown',
      }
      state.isLoading = false
      state.isBuffering = false
    })

    // Fullscreen must be observed on document — the player element is not <video>
    document.addEventListener('fullscreenchange', onFullscreenChange)
  }

  const controls: PlayerControls = {
    async play() {
      await videoRef.value?.play()
    },
    pause() {
      videoRef.value?.pause()
    },
    seek(seconds) {
      const video = videoRef.value
      if (!video || !state.duration) return
      video.currentTime = Math.max(0, Math.min(state.duration, seconds))
    },
    setVolume(value) {
      const video = videoRef.value
      if (!video) return
      video.volume = Math.max(0, Math.min(1, value))
      if (video.muted && value > 0) video.muted = false
    },
    toggleMute() {
      if (videoRef.value) videoRef.value.muted = !videoRef.value.muted
    },
    setSpeed(rate) {
      if (videoRef.value) videoRef.value.playbackRate = rate
    },
    setTrack(track) {
      state.currentTrack = track
    },
    async toggleFullscreen() {
      const el = videoRef.value?.closest<HTMLElement>('.vp-player')
      if (!el) return
      if (document.fullscreenElement) await document.exitFullscreen()
      else await el.requestFullscreen()
    },
    retry() {
      if (lastSrc) loadSource(lastSrc)
    },
  }

  onMounted(() => {
    const video = videoRef.value
    if (!video) return
    attachListeners(video)
    syncFromVideo(video)
  })

  onUnmounted(() => {
    destroyAdapters()
    document.removeEventListener('fullscreenchange', onFullscreenChange)
  })

  return { state: readonly(state), controls, loadSource }
}
