---
title: Keyboard Shortcuts
description: Complete keyboard shortcut reference for vue-player — play, seek, volume, fullscreen and PiP.
---

# Keyboard Shortcuts

vue-player supports keyboard control when the player element is focused. Click the player or press Tab to focus it.

## Shortcuts Reference

| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `K` | Play / Pause |
| `←` Arrow Left | Seek backward 5 seconds |
| `→` Arrow Right | Seek forward 5 seconds |
| `↑` Arrow Up | Increase volume by 10% |
| `↓` Arrow Down | Decrease volume by 10% |
| `M` | Toggle mute |
| `F` | Toggle fullscreen |
| `P` | Toggle Picture-in-Picture |

## Disabling Keyboard Shortcuts

Set `:keyboard="false"` to disable all keyboard handling:

```vue
<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    :keyboard="false"
  />
</template>
```

This is useful when embedding the player inside a form or modal where keyboard events should not be intercepted.

## Notes

- Keyboard events are scoped to the player element — they do not fire when the player is not focused, so they will not interfere with the rest of the page.
- `P` (PiP) only activates if the browser supports the Picture-in-Picture API and the `pip` prop is not set to `false`.
- `Space` and `K` call `preventDefault()` to avoid scrolling the page while the player is focused.
