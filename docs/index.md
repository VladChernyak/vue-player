---
layout: home

hero:
  name: 'Vue Player'
  text: 'Video player for Vue 3'
  tagline: HLS & DASH streaming, chapters, subtitles, thumbnail previews and Picture-in-Picture — out of the box.
  image:
    src: /logo.svg
    alt: Vue Player logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/VladChernyak/vue-player

features:
  - icon: 📼
    title: HLS & DASH
    details: Adaptive bitrate streaming via hls.js and shaka-player. Quality switching built in.
  - icon: 📖
    title: Chapters
    details: Split the timeline into named segments. Hover highlights and tooltips included.
  - icon: 💬
    title: Subtitles
    details: WebVTT tracks with custom overlay rendering. Multi-language switching out of the box.
  - icon: 🖼️
    title: Thumbnail Previews
    details: WebVTT sprite-based timeline previews. Standard ffmpeg workflow supported.
  - icon: 🎨
    title: Fully Themeable
    details: Every visual detail is a CSS variable. Override on any element — no build step needed.
  - icon: 🧩
    title: Nuxt Ready
    details: Official Nuxt module with auto-imports for VideoPlayer component and usePlayer composable.
---

<HomeDemo />
