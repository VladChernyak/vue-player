# @vue-player/nuxt

Official Nuxt 3 module for [vue-player](https://vue-player.vercel.app) — auto-imports `VideoPlayer` and `usePlayer` across your entire app with zero config.

[![npm](https://img.shields.io/npm/v/@vue-player/nuxt?color=3dd68c&label=npm)](https://www.npmjs.com/package/@vue-player/nuxt)
[![license](https://img.shields.io/github/license/VladChernyak/vue-player?color=3dd68c)](https://github.com/VladChernyak/vue-player/blob/main/LICENSE)

**[Documentation](https://vue-player.vercel.app/guide/nuxt.html)**

## Installation

```sh
npm install @vue-player/nuxt
```

## Setup

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vue-player/nuxt'],
})
```

That's it. The module automatically:
- Injects styles globally
- Registers `VideoPlayer` as an auto-imported component
- Registers `usePlayer` as an auto-imported composable

## Usage

No imports needed anywhere in your app:

```vue
<!-- pages/index.vue -->
<template>
  <VideoPlayer src="https://example.com/video.mp4" />
</template>
```

## Options

```ts
export default defineNuxtConfig({
  modules: ['@vue-player/nuxt'],

  vuePlayer: {
    prefix: 'Vp', // component becomes <VpVideoPlayer>, composable becomes useVpPlayer()
  },
})
```

## License

[MIT](https://github.com/VladChernyak/vue-player/blob/main/LICENSE)
