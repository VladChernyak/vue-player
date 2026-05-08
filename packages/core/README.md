# @vue-player/core

Framework-agnostic player engine and TypeScript types for [vue-player](https://vue-player.vercel.app).

[![npm](https://img.shields.io/npm/v/@vue-player/core?color=3dd68c&label=npm)](https://www.npmjs.com/package/@vue-player/core)
[![license](https://img.shields.io/github/license/VladChernyak/vue-player?color=3dd68c)](https://github.com/VladChernyak/vue-player/blob/main/LICENSE)

This package is the internal engine used by `@vue-player/vue`. You do not need to install it directly — it is a dependency and is installed automatically.

If you are building a Vue 3 player, install [`@vue-player/vue`](https://www.npmjs.com/package/@vue-player/vue) instead.

## Types

Import types directly from this package:

```ts
import type {
  PlayerState,
  PlayerControls,
  Track,
  Chapter,
  ThumbnailCue,
  VideoSource,
  Quality,
  PlayerError,
} from '@vue-player/core'
```

## License

[MIT](https://github.com/VladChernyak/vue-player/blob/main/LICENSE)
