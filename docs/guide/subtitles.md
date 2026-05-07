# Subtitles & Captions

vue-player renders subtitles with a custom overlay — no native browser controls required. Tracks are switched via the subtitles menu in the controls bar.

## Basic Usage

Pass an array of `Track` objects to the `tracks` prop:

```vue
<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'
import type { Track } from '@vue-player/core'

const tracks: Track[] = [
  { src: '/subtitles/en.vtt', label: 'English', language: 'en', default: true },
  { src: '/subtitles/fr.vtt', label: 'Français', language: 'fr' },
  { src: '/subtitles/de.vtt', label: 'Deutsch',  language: 'de' },
]
</script>

<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    :tracks="tracks"
  />
</template>
```

The subtitles button appears in the controls bar only when at least one track is provided.

## Track Type

```ts
interface Track {
  src: string                              // URL to the WebVTT file
  label: string                            // shown in the subtitle menu
  language: string                         // BCP 47 language code, e.g. 'en', 'fr'
  kind?: 'subtitles' | 'captions'         // default: 'subtitles'
  default?: boolean                        // auto-activate this track on load
}
```

## Default Track

Set `default: true` on one track to activate it automatically when the video loads:

```ts
const tracks: Track[] = [
  { src: '/en.vtt', label: 'English', language: 'en', default: true },
  { src: '/fr.vtt', label: 'Français', language: 'fr' },
]
```

Only one track should have `default: true`. If multiple tracks have it, the first one wins.

## Subtitles vs Captions

Use `kind: 'captions'` for tracks that include non-speech audio descriptions (sound effects, speaker identification). The distinction is informational — rendering is identical:

```ts
{ src: '/cc.vtt', label: 'Closed Captions', language: 'en', kind: 'captions' }
```

## WebVTT Format

vue-player uses standard [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) files:

```
WEBVTT

00:00:01.000 --> 00:00:04.000
Hello, welcome to the video.

00:00:05.500 --> 00:00:09.000
This is the second line of subtitles.
```

## Tracking Active Track Changes

Listen to the `track-change` event to react when the user switches tracks:

```vue
<template>
  <VideoPlayer
    :tracks="tracks"
    @track-change="(track) => console.log('active track:', track?.label)"
  />
</template>
```

The event payload is the active `Track` object, or `null` when subtitles are turned off.
