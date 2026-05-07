# VideoPlayer

The main component. Wraps `<video>` with controls, overlays, and adaptive streaming support.

## Import

```ts
import { VideoPlayer } from '@vue-player/vue'
```

## Props

### Source

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Single video URL. Accepts `.mp4`, `.webm`, `.m3u8` |
| `poster` | `string` | — | Poster image URL shown before playback |

### Playback

| Prop | Type | Default | Description |
|---|---|---|---|
| `autoplay` | `boolean` | `false` | Start playing on mount. Use with `muted` to satisfy browser autoplay policies |
| `loop` | `boolean` | `false` | Loop playback |
| `muted` | `boolean` | `false` | Start muted |
| `volume` | `number` | `1` | Initial volume `0–1` |
| `playbackRate` | `number` | `1` | Initial playback speed |
| `playbackRates` | `number[]` | `[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]` | Speed options shown in settings menu |
| `live` | `boolean` | `false` | Force-show the LIVE badge (auto-detected from stream duration) |

### Features

| Prop | Type | Default | Description |
|---|---|---|---|
| `keyboard` | `boolean` | `true` | Enable keyboard shortcuts |
| `pip` | `boolean` | `true` | Show PiP button when browser supports it |
| `tracks` | `Track[]` | — | Subtitle / caption tracks |
| `chapters` | `Chapter[]` | — | Timeline chapter markers |
| `thumbnails` | `string` | — | URL of a WebVTT thumbnail file |

## Events

| Event | Payload | Description |
|---|---|---|
| `play` | — | Playback started |
| `pause` | — | Playback paused |
| `ended` | — | Reached end of video |
| `time-update` | `time: number` | Current time changed (fires frequently) |
| `buffering` | `value: boolean` | Buffering started / stopped |
| `speed-change` | `rate: number` | Playback speed changed |
| `track-change` | `track: Track \| null` | Active subtitle track changed |
| `fullscreen-change` | `value: boolean` | Entered / exited fullscreen |
| `error` | `error: PlayerError` | Playback error occurred |

## Slots

### `controls`

Replaces the default controls row. Receives `state` and `player` as slot props:

```vue
<template #controls="{ state, player }">
  <button @click="state.isPlaying ? player.pause() : player.play()">
    {{ state.isPlaying ? 'Pause' : 'Play' }}
  </button>
</template>
```

See [Custom Controls](/guide/custom-controls) for the full slot props reference.

### `loading`

Custom content inside the loading overlay:

```vue
<template #loading>
  <span>Loading…</span>
</template>
```

### `error`

Custom content inside the error overlay. Receives `{ error: PlayerError }`:

```vue
<template #error="{ error }">
  <p>{{ error.message }}</p>
</template>
```

## Full Example

```vue
<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'
import type { Track, Chapter } from '@vue-player/core'

const tracks: Track[] = [
  { src: '/en.vtt', label: 'English', language: 'en', default: true },
]

const chapters: Chapter[] = [
  { time: 0,  label: 'Intro' },
  { time: 60, label: 'Main' },
]
</script>

<template>
  <VideoPlayer
    src="https://example.com/stream.m3u8"
    poster="https://example.com/poster.jpg"
    thumbnails="https://example.com/thumbs.vtt"
    :tracks="tracks"
    :chapters="chapters"
    :muted="true"
    :autoplay="true"
    @play="() => console.log('playing')"
    @error="(e) => console.error(e.message)"
  />
</template>
```
