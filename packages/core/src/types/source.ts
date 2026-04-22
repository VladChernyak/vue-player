export interface VideoSource {
  src: string
  type?: 'hls' | 'dash' | 'mp4' | 'webm' | 'auto'
  quality?: number
  label?: string
}

export interface Quality {
  value: number
  label: string
  bitrate?: number
}

export interface Track {
  src: string
  label: string
  language: string
  kind?: 'subtitles' | 'captions'
  default?: boolean
}
