# Types

All types are exported from `@vue-player/core`.

```ts
import type { PlayerState, PlayerControls, Track, Chapter, ThumbnailCue, VideoSource, Quality, PlayerError } from '@vue-player/core'
```

---

## PlayerState

Readonly reactive state returned by `usePlayer`.

```ts
interface PlayerState {
  isPlaying:  boolean
  isPaused:   boolean
  isEnded:    boolean
  isLoading:  boolean
  isBuffering: boolean

  currentTime: number
  duration:    number
  buffered:    number

  volume:  number
  isMuted: boolean

  isFullscreen: boolean
  isPiP:        boolean
  isLive:       boolean

  playbackRate:       number
  currentQuality:     number | 'auto'
  availableQualities: Quality[]

  currentTrack:   Track | null
  availableTracks: Track[]

  error: PlayerError | null
}
```

| Property | Type | Description |
|---|---|---|
| `isPlaying` | `boolean` | Video is actively playing |
| `isPaused` | `boolean` | Video is paused |
| `isEnded` | `boolean` | Reached end of video |
| `isLoading` | `boolean` | Source is loading |
| `isBuffering` | `boolean` | Waiting for data mid-playback |
| `currentTime` | `number` | Current position in seconds |
| `duration` | `number` | Total duration in seconds (`0` until metadata loads) |
| `buffered` | `number` | Furthest buffered position in seconds |
| `volume` | `number` | Volume level `0–1` |
| `isMuted` | `boolean` | Audio is muted |
| `isFullscreen` | `boolean` | Fullscreen is active |
| `isPiP` | `boolean` | Picture-in-Picture is active |
| `isLive` | `boolean` | Source is a live stream (duration is `Infinity`) |
| `playbackRate` | `number` | Current playback speed |
| `currentQuality` | `number \| 'auto'` | Active quality value in pixels (e.g. `1080`), or `'auto'` |
| `availableQualities` | `Quality[]` | Quality levels parsed from HLS manifest |
| `currentTrack` | `Track \| null` | Active subtitle track, or `null` |
| `availableTracks` | `Track[]` | All available subtitle tracks |
| `error` | `PlayerError \| null` | Current playback error, or `null` |

---

## PlayerControls

Methods returned by `usePlayer` to control playback.

```ts
interface PlayerControls {
  play:            () => Promise<void>
  pause:           () => void
  seek:            (seconds: number) => void
  setVolume:       (value: number) => void
  toggleMute:      () => void
  setSpeed:        (rate: number) => void
  setQuality:      (value: number | 'auto') => void
  setTrack:        (track: Track | null) => void
  toggleFullscreen: () => Promise<void>
  togglePiP:       () => Promise<void>
  retry:           () => void
}
```

| Method | Description |
|---|---|
| `play()` | Start playback |
| `pause()` | Pause playback |
| `seek(seconds)` | Jump to position, clamped to `0–duration` |
| `setVolume(value)` | Set volume `0–1`, unmutes if previously muted |
| `toggleMute()` | Toggle mute on/off |
| `setSpeed(rate)` | Set playback speed (e.g. `0.5`, `1`, `2`) |
| `setQuality(value)` | Set HLS quality in px height, or `'auto'` for ABR |
| `setTrack(track)` | Activate a subtitle track, or `null` to disable |
| `toggleFullscreen()` | Enter/exit fullscreen on the player element |
| `togglePiP()` | Enter/exit Picture-in-Picture |
| `retry()` | Reload the last source after an error |

---

## Track

A subtitle or caption track.

```ts
interface Track {
  src:      string
  label:    string
  language: string
  kind?:    'subtitles' | 'captions'
  default?: boolean
}
```

| Property | Type | Description |
|---|---|---|
| `src` | `string` | URL of the WebVTT file |
| `label` | `string` | Display name in the subtitle menu |
| `language` | `string` | BCP 47 language code (e.g. `'en'`, `'fr'`) |
| `kind` | `'subtitles' \| 'captions'` | Track kind, default `'subtitles'` |
| `default` | `boolean` | Auto-activate on load |

---

## Chapter

A named timeline segment.

```ts
interface Chapter {
  time:  number
  label: string
}
```

| Property | Type | Description |
|---|---|---|
| `time` | `number` | Chapter start time in seconds |
| `label` | `string` | Shown in the timeline tooltip |

---

## ThumbnailCue

A single cue from a WebVTT thumbnail file.

```ts
interface ThumbnailCue {
  start: number
  end:   number
  url:   string
  x?:    number
  y?:    number
  w?:    number
  h?:    number
}
```

| Property | Type | Description |
|---|---|---|
| `start` | `number` | Cue start time in seconds |
| `end` | `number` | Cue end time in seconds |
| `url` | `string` | Absolute image URL |
| `x` | `number` | Sprite x offset in pixels |
| `y` | `number` | Sprite y offset in pixels |
| `w` | `number` | Sprite frame width in pixels |
| `h` | `number` | Sprite frame height in pixels |

---

## VideoSource

A video source with optional type hint and quality metadata.

```ts
interface VideoSource {
  src:     string
  type?:   'hls' | 'dash' | 'mp4' | 'webm' | 'auto'
  quality?: number
  label?:  string
}
```

---

## Quality

A quality level parsed from an HLS manifest.

```ts
interface Quality {
  value:    number
  label:    string
  bitrate?: number
}
```

---

## PlayerError

A playback error.

```ts
interface PlayerError {
  code:    number
  message: string
  type:    'network' | 'decode' | 'source' | 'unknown'
}
```

| Property | Type | Description |
|---|---|---|
| `code` | `number` | `MediaError.code` value (`1–4`), or `0` for HLS errors |
| `message` | `string` | Human-readable error description |
| `type` | `string` | Error category |
