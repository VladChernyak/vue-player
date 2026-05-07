import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-player',
  description: 'Feature-rich Vue 3 video player with HLS, chapters, subtitles and more.',

  vite: {
    resolve: {
      alias: [
        {
          find: '@vue-player/vue/styles',
          replacement: fileURLToPath(new URL('../../packages/vue/src/styles/index.css', import.meta.url)),
        },
        {
          find: '@vue-player/vue',
          replacement: fileURLToPath(new URL('../../packages/vue/src/index.ts', import.meta.url)),
        },
        {
          find: '@vue-player/core',
          replacement: fileURLToPath(new URL('../../packages/core/src/index.ts', import.meta.url)),
        },
      ],
    },
  },

  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Vue Player',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API', link: '/api/video-player' },
      {
        text: '0.0.1',
        items: [
          { text: 'Changelog', link: 'https://github.com/VladChernyak/vue-player/releases' },
          {
            text: 'Contributing',
            link: 'https://github.com/VladChernyak/vue-player/blob/main/CONTRIBUTING.md',
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Theming', link: '/guide/theming' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'Chapters', link: '/guide/chapters' },
            { text: 'Subtitles', link: '/guide/subtitles' },
            { text: 'Thumbnail Previews', link: '/guide/thumbnails' },
            { text: 'Keyboard Shortcuts', link: '/guide/keyboard' },
            { text: 'Custom Controls', link: '/guide/custom-controls' },
          ],
        },
        {
          text: 'Integrations',
          items: [{ text: 'Nuxt', link: '/guide/nuxt' }],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'VideoPlayer', link: '/api/video-player' },
            { text: 'usePlayer', link: '/api/use-player' },
            { text: 'Types', link: '/api/types' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/VladChernyak/vue-player' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Vladyslav Chernyak',
    },

    search: {
      provider: 'local',
    },
  },
})
