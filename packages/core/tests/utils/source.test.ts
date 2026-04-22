import { describe, expect, it } from 'vitest'
import { detectSourceType } from '../../src/utils/source'

describe('detectSourceType', () => {
  it('detects HLS', () => {
    expect(detectSourceType('https://example.com/video.m3u8')).toBe('hls')
    expect(detectSourceType('https://example.com/stream/index.m3u8?token=abc')).toBe('hls')
  })

  it('detects DASH', () => {
    expect(detectSourceType('https://example.com/video.mpd')).toBe('dash')
    expect(detectSourceType('https://example.com/manifest.mpd?quality=hd')).toBe('dash')
  })

  it('falls back to native for mp4/webm', () => {
    expect(detectSourceType('https://example.com/video.mp4')).toBe('native')
    expect(detectSourceType('https://example.com/video.webm')).toBe('native')
    expect(detectSourceType('https://example.com/video')).toBe('native')
  })
})
