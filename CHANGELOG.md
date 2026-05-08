# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-05-08

### Added

- `VideoPlayer` component with HLS adaptive streaming via `hls.js`
- `usePlayer` composable for building fully custom player UIs
- Subtitle and caption support via WebVTT tracks
- Chapter markers with timeline tooltip labels
- Thumbnail preview scrubbing from WebVTT sprite sheets
- Picture-in-Picture support
- Keyboard shortcuts (play/pause, seek, volume, fullscreen)
- `controls` slot for replacing the entire controls UI
- `loading` and `error` slots for custom overlays
- Quality level selection from HLS manifest
- Playback speed control
- Fullscreen support
- Poster overlay with fade-out transition
- `@vue-player/nuxt` module with auto-imports
- TypeScript support with full type exports from `@vue-player/core`
