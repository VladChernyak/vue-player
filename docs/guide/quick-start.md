---
title: Quick Start
description: Get started with vue-player — from a basic video to HLS streaming in minutes.
---

# Quick Start

## Basic Usage

Import `VideoPlayer` and pass a video URL via the `src` prop:

```vue
<script setup>
import { VideoPlayer } from '@vue-player/vue'
</script>

<template>
  <VideoPlayer src="https://example.com/video.mp4" />
</template>
```

The player fills its container width and maintains a 16:9 aspect ratio by default. Wrap it in a sized element to control dimensions:

```vue
<template>
  <div style="max-width: 800px">
    <VideoPlayer src="https://example.com/video.mp4" />
  </div>
</template>
```

## With Poster and Autoplay

```vue
<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    :muted="true"
    :autoplay="true"
  />
</template>
```

::: tip
Browsers block autoplay with audio. Use `:muted="true"` together with `:autoplay="true"` to ensure it works across all browsers.
:::

## HLS Streaming

Pass an `.m3u8` URL — the player detects the source type automatically and loads `hls.js`:

```vue
<template>
  <VideoPlayer src="https://example.com/stream.m3u8" />
</template>
```

Quality levels are parsed from the HLS manifest and made available in the settings menu automatically.

## Listening to Events

```vue
<script setup>
import { VideoPlayer } from '@vue-player/vue'

function onPlay() {
  console.log('playing')
}

function onTimeUpdate(time) {
  console.log('current time:', time)
}
</script>

<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    @play="onPlay"
    @time-update="onTimeUpdate"
    @ended="() => console.log('ended')"
  />
</template>
```

## TypeScript

All props and events are fully typed. Import types from `@vue-player/core`:

```vue
<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'
import type { Track, Chapter } from '@vue-player/core'

const tracks: Track[] = [
  { src: '/subtitles/en.vtt', label: 'English', language: 'en', default: true },
  { src: '/subtitles/fr.vtt', label: 'Français', language: 'fr' },
]

const chapters: Chapter[] = [
  { time: 0,   label: 'Intro' },
  { time: 30,  label: 'Chapter 1' },
  { time: 120, label: 'Chapter 2' },
]
</script>

<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    :tracks="tracks"
    :chapters="chapters"
  />
</template>
```

## Using the Composable

`usePlayer` gives you direct access to player state and controls outside the component:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VideoPlayer, usePlayer } from '@vue-player/vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const { state, controls } = usePlayer(videoRef)
</script>

<template>
  <VideoPlayer src="https://example.com/video.mp4" />
  <p>Current time: {{ state.currentTime.toFixed(1) }}s</p>
  <button @click="controls.play()">Play</button>
  <button @click="controls.pause()">Pause</button>
</template>
```

See [usePlayer API](/api/use-player) for the full reference.
