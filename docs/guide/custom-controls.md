---
title: Custom Controls
description: Replace the default controls with your own UI using the controls slot and full access to state and player API.
---

# Custom Controls

The `controls` slot lets you replace the entire controls row with your own UI while keeping the player's state and logic intact.

## Basic Example

```vue
<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'
</script>

<template>
  <VideoPlayer src="https://example.com/video.mp4">
    <template #controls="{ state, player }">
      <div class="my-controls">
        <button @click="state.isPlaying ? player.pause() : player.play()">
          {{ state.isPlaying ? 'Pause' : 'Play' }}
        </button>
        <span>{{ Math.floor(state.currentTime) }}s / {{ Math.floor(state.duration) }}s</span>
        <button @click="player.toggleFullscreen()">Fullscreen</button>
      </div>
    </template>
  </VideoPlayer>
</template>
```

## Slot Props

The `controls` slot receives two objects:

```ts
{
  state: PlayerState   // readonly reactive player state
  player: PlayerControls  // methods to control playback
}
```

### `state` — PlayerState

| Property | Type | Description |
|---|---|---|
| `isPlaying` | `boolean` | Video is currently playing |
| `isPaused` | `boolean` | Video is paused |
| `isEnded` | `boolean` | Playback has reached the end |
| `isLoading` | `boolean` | Source is loading |
| `isBuffering` | `boolean` | Waiting for data mid-playback |
| `currentTime` | `number` | Current playback position (seconds) |
| `duration` | `number` | Total video duration (seconds) |
| `buffered` | `number` | Buffered time (seconds) |
| `volume` | `number` | Volume level `0–1` |
| `isMuted` | `boolean` | Audio is muted |
| `isFullscreen` | `boolean` | Fullscreen is active |
| `isPiP` | `boolean` | Picture-in-Picture is active |
| `isLive` | `boolean` | Source is a live stream |
| `playbackRate` | `number` | Current playback speed |
| `currentTrack` | `Track \| null` | Active subtitle track |
| `currentQuality` | `number \| 'auto'` | Active quality level |
| `availableQualities` | `Quality[]` | Quality levels from HLS manifest |
| `error` | `PlayerError \| null` | Current error, if any |

### `player` — PlayerControls

| Method | Description |
|---|---|
| `play()` | Start playback |
| `pause()` | Pause playback |
| `seek(seconds)` | Jump to a specific time |
| `setVolume(value)` | Set volume `0–1` |
| `toggleMute()` | Toggle mute on/off |
| `setSpeed(rate)` | Set playback speed |
| `setQuality(value)` | Set quality level or `'auto'` |
| `setTrack(track)` | Set active subtitle track (`null` to disable) |
| `toggleFullscreen()` | Toggle fullscreen |
| `togglePiP()` | Toggle Picture-in-Picture |
| `retry()` | Retry after a playback error |

## Mixing Default and Custom Controls

You can use the built-in control components alongside custom elements. They are exported from `@vue-player/vue`:

```vue
<script setup>
import { VideoPlayer, VpPlayButton, VpTimeDisplay, VpFullscreenButton } from '@vue-player/vue'
</script>

<template>
  <VideoPlayer src="https://example.com/video.mp4">
    <template #controls="{ state, player }">
      <VpPlayButton :is-playing="state.isPlaying" @click="state.isPlaying ? player.pause() : player.play()" />
      <VpTimeDisplay :current-time="state.currentTime" :duration="state.duration" />
      <div style="flex: 1" />
      <VpFullscreenButton :is-fullscreen="state.isFullscreen" @click="player.toggleFullscreen()" />
    </template>
  </VideoPlayer>
</template>
```

## Other Slots

| Slot | Description |
|---|---|
| `loading` | Custom content inside the loading overlay |
| `error` | Custom content inside the error overlay. Receives `{ error: PlayerError }` |
