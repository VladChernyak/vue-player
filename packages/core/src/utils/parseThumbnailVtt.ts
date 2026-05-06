import { parseTimecode } from './time'
import type { ThumbnailCue } from '../types/thumbnail'

function resolveUrl(base: string, url: string): string {
  try {
    return new URL(url, base).href
  } catch {
    return url
  }
}

export async function parseThumbnailVtt(url: string): Promise<ThumbnailCue[]> {
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const text = await res.text()
    return parseVttText(text, url)
  } catch {
    return []
  }
}

export function parseVttText(text: string, baseUrl = ''): ThumbnailCue[] {
  const cues: ThumbnailCue[] = []
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  let i = 0

  // Skip WEBVTT header and any metadata blocks
  while (i < lines.length && !lines[i].includes('-->')) i++

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line.includes('-->')) {
      i++
      continue
    }

    // Parse "HH:MM:SS.mmm --> HH:MM:SS.mmm" — ignore position settings after the second timestamp
    const arrowIdx = line.indexOf('-->')
    const start = parseTimecode(line.slice(0, arrowIdx).trim())
    const endPart = line.slice(arrowIdx + 3).trim().split(/\s/)[0]
    const end = parseTimecode(endPart)

    i++
    const imgLine = lines[i]?.trim()
    if (!imgLine) {
      i++
      continue
    }

    const hashIdx = imgLine.lastIndexOf('#')
    const rawUrl = hashIdx !== -1 ? imgLine.slice(0, hashIdx) : imgLine
    const fragment = hashIdx !== -1 ? imgLine.slice(hashIdx + 1) : ''
    const resolvedUrl = resolveUrl(baseUrl, rawUrl)

    const cue: ThumbnailCue = { start, end, url: resolvedUrl }

    if (fragment.startsWith('xywh=')) {
      const nums = fragment.slice(5).split(',').map(Number)
      if (nums.length === 4 && nums.every(isFinite)) {
        ;[cue.x, cue.y, cue.w, cue.h] = nums
      }
    }

    cues.push(cue)
    i++
  }

  return cues
}
