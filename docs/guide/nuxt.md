---
title: Nuxt Integration
description: Set up the official @vue-player/nuxt module for automatic component and composable imports.
---

# Nuxt Integration

`@vue-player/nuxt` is an official Nuxt 3 module that auto-imports `VideoPlayer` and `usePlayer` across your entire app — no manual imports needed.

## Installation

```sh
npm install @vue-player/nuxt
```

## Setup

Add the module to `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vue-player/nuxt'],
})
```

That's it. The module automatically:
- Injects `@vue-player/vue/styles` globally
- Registers `VideoPlayer` as an auto-imported component
- Registers `usePlayer` as an auto-imported composable

## Usage

Use `VideoPlayer` and `usePlayer` anywhere without importing them:

```vue
<!-- pages/index.vue -->
<template>
  <VideoPlayer src="https://example.com/video.mp4" />
</template>
```

```vue
<script setup lang="ts">
// usePlayer is auto-imported — no import statement needed
const videoRef = ref<HTMLVideoElement | null>(null)
const { state, controls } = usePlayer(videoRef)
</script>
```

## Module Options

Configure the module under the `vuePlayer` key in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@vue-player/nuxt'],

  vuePlayer: {
    prefix: 'Vp',
  },
})
```

### `prefix`

| Type | Default | Description |
|---|---|---|
| `string` | `''` | Prefix added to auto-imported names |

With `prefix: 'Vp'`:
- Component becomes `<VpVideoPlayer>`
- Composable becomes `useVpPlayer()`

This is useful when you have naming conflicts with other libraries:

```vue
<template>
  <VpVideoPlayer src="https://example.com/video.mp4" />
</template>
```

## TypeScript

Types are resolved automatically from `@vue-player/core`. Import them explicitly when needed:

```ts
import type { Track, Chapter, ThumbnailCue } from '@vue-player/core'
```
