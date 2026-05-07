# Installation

## Package Manager

::: code-group

```sh [npm]
npm install @vue-player/vue
```

```sh [pnpm]
pnpm add @vue-player/vue
```

```sh [yarn]
yarn add @vue-player/vue
```

:::

## Import Styles

The player styles must be imported once in your app entry point:

```js
import '@vue-player/vue/styles'
```

In a Vue app (`main.ts`):

```ts
import { createApp } from 'vue'
import App from './App.vue'
import '@vue-player/vue/styles'

createApp(App).mount('#app')
```

## HLS Streaming (Optional)

HLS support uses `hls.js` as an optional peer dependency. Install it if you need to play `.m3u8` streams:

```sh
npm install hls.js
```

`hls.js` is loaded dynamically — it is not bundled into vue-player and is only imported at runtime when an HLS source is detected. Safari uses its native HLS support and does not require `hls.js`.

## Nuxt

For Nuxt 3 projects, use the dedicated module instead:

```sh
npm install @vue-player/nuxt
```

See [Nuxt Integration](/guide/nuxt) for setup details.
