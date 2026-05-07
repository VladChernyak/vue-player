# Vue Player

Feature-rich Vue 3 video player with HLS adaptive streaming, chapters, subtitles, thumbnail previews and Picture-in-Picture — out of the box.

[![npm](https://img.shields.io/npm/v/@vue-player/vue?color=3dd68c&label=npm)](https://www.npmjs.com/package/@vue-player/vue)
[![license](https://img.shields.io/github/license/VladChernyak/vue-player?color=3dd68c)](./LICENSE)

**[Documentation](https://vue-player.vercel.app)** · [Quick Start](https://vue-player.vercel.app/guide/quick-start) · [API Reference](https://vue-player.vercel.app/api/video-player)

---

## Features

- **HLS adaptive streaming** — automatic quality switching via `hls.js`
- **Subtitles & captions** — WebVTT tracks with an in-player menu
- **Chapter markers** — named timeline segments with tooltip labels
- **Thumbnail previews** — sprite-sheet WebVTT scrubbing previews
- **Picture-in-Picture** — native browser PiP support
- **Keyboard shortcuts** — play/pause, seek, volume and more
- **Custom controls slot** — replace the entire controls UI while keeping all state and logic
- **`usePlayer` composable** — low-level access for fully custom player shells
- **Nuxt module** — auto-imports with zero config via `@vue-player/nuxt`
- **TypeScript** — fully typed props, events, and composable APIs

## Installation

```sh
npm install @vue-player/vue hls.js
```

Import styles once in your app entry:

```ts
import '@vue-player/vue/styles'
```

## Quick Start

```vue
<script setup>
import { VideoPlayer } from '@vue-player/vue'
</script>

<template>
  <VideoPlayer src="https://example.com/video.mp4" />
</template>
```

### HLS Streaming

Pass an `.m3u8` URL — source type is detected automatically:

```vue
<template>
  <VideoPlayer src="https://example.com/stream.m3u8" />
</template>
```

### Subtitles and Chapters

```vue
<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'
import type { Track, Chapter } from '@vue-player/core'

const tracks: Track[] = [
  { src: '/en.vtt', label: 'English', language: 'en', default: true },
]

const chapters: Chapter[] = [
  { time: 0,   label: 'Intro' },
  { time: 60,  label: 'Main' },
  { time: 300, label: 'Credits' },
]
</script>

<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    thumbnails="https://example.com/thumbs.vtt"
    :tracks="tracks"
    :chapters="chapters"
    :autoplay="true"
    :muted="true"
  />
</template>
```

### `usePlayer` Composable

For fully custom player UIs:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePlayer } from '@vue-player/vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const { state, controls, loadSource } = usePlayer(videoRef)

onMounted(() => loadSource('https://example.com/video.mp4'))
</script>

<template>
  <video ref="videoRef" />
  <button @click="state.isPlaying ? controls.pause() : controls.play()">
    {{ state.isPlaying ? 'Pause' : 'Play' }}
  </button>
  <span>{{ state.currentTime.toFixed(1) }} / {{ state.duration.toFixed(1) }}</span>
</template>
```

## Nuxt

```sh
npm install @vue-player/nuxt
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vue-player/nuxt'],
})
```

`VideoPlayer` and `usePlayer` are auto-imported everywhere — no manual imports needed.

## Packages

| Package | Description |
|---|---|
| [`@vue-player/vue`](./packages/vue) | Vue 3 component and `usePlayer` composable |
| [`@vue-player/core`](./packages/core) | Framework-agnostic player engine and types |
| [`@vue-player/nuxt`](./packages/nuxt) | Nuxt 3 module with auto-imports |

## Documentation

Full documentation including API reference, guides, and examples:

**[vue-player.vercel.app](https://vue-player.vercel.app)**

## License

[MIT](./LICENSE)
