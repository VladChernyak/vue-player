export type SourceType = 'hls' | 'dash' | 'native'

export function detectSourceType(src: string): SourceType {
  if (src.includes('.m3u8')) return 'hls'
  if (src.includes('.mpd')) return 'dash'
  return 'native'
}
