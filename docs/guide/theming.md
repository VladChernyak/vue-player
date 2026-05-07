---
title: Theming
description: Customize every visual detail of vue-player using CSS custom properties — no build step needed.
---

# Theming

vue-player exposes all visual properties as CSS custom properties. Override them on `.vp-player` or any parent element — no build step required.

## Quick Example

```css
.my-player {
  --vp-primary: #f97316;
  --vp-radius: 0px;
}
```

```vue
<template>
  <VideoPlayer class="my-player" src="..." />
</template>
```

## CSS Variables Reference

### Brand

| Variable | Default | Description |
|---|---|---|
| `--vp-primary` | `#3dd68c` | Accent color — progress bar, active states |
| `--vp-primary-hover` | `#2ec97a` | Accent on hover |
| `--vp-primary-active` | `#24b86e` | Accent on press |
| `--vp-primary-glow` | `rgba(61,214,140,.2)` | Glow around scrubber thumb |

### Layout

| Variable | Default | Description |
|---|---|---|
| `--vp-radius` | `12px` | Outer player corner radius |
| `--vp-radius-sm` | `8px` | Menus corner radius |
| `--vp-radius-xs` | `6px` | Menu items corner radius |

### Controls Bar

| Variable | Default | Description |
|---|---|---|
| `--vp-controls-bg` | gradient | Bottom gradient overlay behind controls |
| `--vp-controls-padding` | `12px 16px 14px` | Padding inside the controls area |
| `--vp-controls-gap` | `6px` | Gap between control rows |
| `--vp-controls-height` | `44px` | Min height of the controls row |

### Timeline

| Variable | Default | Description |
|---|---|---|
| `--vp-timeline-height` | `4px` | Track height at rest |
| `--vp-timeline-height-hover` | `6px` | Track height on hover |
| `--vp-timeline-bg` | `rgba(255,255,255,.18)` | Unfilled track color |
| `--vp-timeline-buffered` | `rgba(255,255,255,.32)` | Buffered range color |
| `--vp-timeline-progress` | `var(--vp-primary)` | Played range color |
| `--vp-timeline-gap` | `3px` | Gap between chapter segments |

### Scrubber Thumb

| Variable | Default | Description |
|---|---|---|
| `--vp-thumb-size` | `14px` | Diameter of the drag handle |
| `--vp-thumb-color` | `#fff` | Handle fill color |
| `--vp-thumb-shadow` | glow | Box shadow (uses `--vp-primary-glow`) |

### Buttons

| Variable | Default | Description |
|---|---|---|
| `--vp-button-size` | `36px` | Clickable area of each icon button |
| `--vp-button-hover-bg` | `rgba(255,255,255,.1)` | Button hover background |
| `--vp-icon-size` | `18px` | Icon size inside buttons |

### Typography

| Variable | Default | Description |
|---|---|---|
| `--vp-font-family` | `inherit` | Font family |
| `--vp-font-size` | `13px` | Base font size |
| `--vp-font-size-sm` | `11px` | Small labels (time, menu items) |

### Colors

| Variable | Default | Description |
|---|---|---|
| `--vp-bg` | `#000` | Player background |
| `--vp-text-1` | `#ffffff` | Primary text |
| `--vp-text-2` | `rgba(255,255,255,.7)` | Secondary text |
| `--vp-text-3` | `rgba(255,255,255,.4)` | Muted text |

## Prebuilt Themes

### Dark (default)

The default theme — dark background with green accent. No extra CSS needed.

### Flat / Borderless

```css
.my-player {
  --vp-radius: 0px;
  --vp-radius-sm: 4px;
  --vp-timeline-height: 3px;
  --vp-timeline-height-hover: 5px;
}
```

### Custom Accent Color

Replace the primary color and its hover/active shades:

```css
.my-player {
  --vp-primary:        #8b5cf6;
  --vp-primary-hover:  #7c3aed;
  --vp-primary-active: #6d28d9;
  --vp-primary-glow:   rgba(139, 92, 246, 0.22);
}
```

## Scoped Styles in Vue SFC

```vue
<style scoped>
:deep(.vp-player) {
  --vp-primary: #f97316;
  --vp-radius: 6px;
}
</style>
```
