# @vue-player/vue

Feature-rich Vue 3 video player with HLS adaptive streaming, chapters, subtitles, thumbnail previews and Picture-in-Picture — out of the box.

[![npm](https://img.shields.io/npm/v/@vue-player/vue?color=3dd68c&label=npm)](https://www.npmjs.com/package/@vue-player/vue)
[![license](https://img.shields.io/github/license/VladChernyak/vue-player?color=3dd68c)](https://github.com/VladChernyak/vue-player/blob/main/LICENSE)

**[Documentation](https://vue-player.vercel.app)** · [Quick Start](https://vue-player.vercel.app/guide/quick-start.html) · [API Reference](https://vue-player.vercel.app/api/video-player.html)

## Features

- HLS adaptive streaming via `hls.js` (optional)
- Subtitles and captions (WebVTT)
- Chapter markers on the timeline
- Thumbnail preview scrubbing
- Picture-in-Picture
- Keyboard shortcuts
- Custom controls slot
- `usePlayer` composable for fully custom UIs
- Full TypeScript support

## Installation

```sh
npm install @vue-player/vue
```

For HLS adaptive streaming, also install `hls.js`:

```sh
npm install hls.js
```

Import styles once in your app entry:

```ts
import '@vue-player/vue/styles'
```

## Basic Usage

```vue
<script setup>
import { VideoPlayer } from '@vue-player/vue'
</script>

<template>
  <VideoPlayer src="https://example.com/video.mp4" />
</template>
```

## HLS Streaming

Pass an `.m3u8` URL — source type is detected automatically:

```vue
<template>
  <VideoPlayer src="https://example.com/stream.m3u8" />
</template>
```

## Subtitles and Chapters

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
  />
</template>
```

## usePlayer Composable

Build a fully custom player UI:

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

Use the official [`@vue-player/nuxt`](https://www.npmjs.com/package/@vue-player/nuxt) module for zero-config auto-imports.

## License

[MIT](https://github.com/VladChernyak/vue-player/blob/main/LICENSE)
