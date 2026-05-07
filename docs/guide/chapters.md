---
title: Chapters
description: Add named timeline segments to your player with the chapters prop.
---

# Chapters

Chapters split the timeline into named segments. Hovering a segment highlights it and shows a tooltip with the chapter name and timestamp.

## Basic Usage

Pass an array of `Chapter` objects to the `chapters` prop. Each chapter starts at the given `time` (in seconds) and ends where the next one begins:

```vue
<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'
import type { Chapter } from '@vue-player/core'

const chapters: Chapter[] = [
  { time: 0,   label: 'Introduction' },
  { time: 45,  label: 'Getting Started' },
  { time: 180, label: 'Advanced Usage' },
  { time: 360, label: 'Conclusion' },
]
</script>

<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    :chapters="chapters"
  />
</template>
```

## Chapter Type

```ts
interface Chapter {
  time: number    // start time in seconds
  label: string   // displayed in the tooltip
}
```

## How It Works

- The timeline track is divided into segments proportional to each chapter's duration.
- A small gap (`--vp-timeline-gap`) separates each segment visually.
- On hover, the active segment brightens and the tooltip shows `label • HH:MM:SS`.
- Chapters are sorted by `time` automatically — order in the array doesn't matter.
