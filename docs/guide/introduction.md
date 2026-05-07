# Introduction

**vue-player** is a headless-styled video player component for Vue 3. It wraps the native `<video>` element with a polished UI, adaptive streaming support, and a composable API — all without any mandatory peer dependencies beyond Vue itself.

## Features

- **HLS & DASH** — adaptive bitrate streaming via `hls.js` (loaded on demand). Falls back to native HLS in Safari automatically.
- **Chapters** — named timeline segments with hover tooltips and visual separators.
- **Subtitles & Captions** — WebVTT tracks with a custom overlay renderer and multi-language menu.
- **Thumbnail Previews** — WebVTT sprite sheets on the timeline scrubber. Compatible with standard `ffmpeg` workflows.
- **Picture-in-Picture** — one-click PiP with browser API detection.
- **Fully Themeable** — every visual detail is a CSS custom property. Override on `.vp-player` or any parent element.
- **Keyboard Shortcuts** — play/pause, seek, volume, fullscreen, mute and PiP via keyboard.
- **Nuxt module** — official `@vue-player/nuxt` module with auto-imports.
- **TypeScript** — fully typed props, events, state and composable API.

## Packages

| Package | Description |
|---|---|
| `@vue-player/vue` | Vue 3 component and `usePlayer` composable |
| `@vue-player/core` | Framework-agnostic core: adapters, types, utilities |
| `@vue-player/nuxt` | Nuxt 3 module with auto-imports |

## Browser Support

Requires any modern browser with `<video>` support. PiP requires `requestPictureInPicture` API (Chrome 70+, Safari 14+). DASH streaming requires `shaka-player` to be installed separately.

## Next Steps

- [Installation](/guide/installation) — add vue-player to your project
- [Quick Start](/guide/quick-start) — your first player in minutes
