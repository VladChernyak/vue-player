import type { Quality, Track } from './source'

export interface PlayerState {
  isPlaying: boolean
  isPaused: boolean
  isEnded: boolean
  isLoading: boolean
  isBuffering: boolean

  currentTime: number
  duration: number
  buffered: number

  volume: number
  isMuted: boolean

  isFullscreen: boolean
  isPiP: boolean
  isLive: boolean

  currentQuality: number | 'auto'
  availableQualities: Quality[]
  playbackRate: number

  currentTrack: Track | null
  availableTracks: Track[]

  error: PlayerError | null
}

export interface PlayerError {
  code: number
  message: string
  type: 'network' | 'decode' | 'source' | 'unknown'
}

export interface PlayerOptions {
  src?: string
  sources?: import('./source').VideoSource[]
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
}
