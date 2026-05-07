import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const SITE_URL = 'https://vue-player.vercel.app'
const DESCRIPTION = 'Feature-rich Vue 3 video player with HLS, chapters, subtitles and more.'

export default defineConfig({
  title: 'Vue Player',
  description: DESCRIPTION,
  titleTemplate: ':title | Vue Player',

  sitemap: {
    hostname: SITE_URL,
  },

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

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'vue-player' }],
    ['meta', { property: 'og:title', content: 'vue-player' }],
    ['meta', { property: 'og:description', content: DESCRIPTION }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/og-image.png` }],
    ['meta', { property: 'og:url', content: SITE_URL }],

    // Twitter / X
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'vue-player' }],
    ['meta', { name: 'twitter:description', content: DESCRIPTION }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Vue Player',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API', link: '/api/video-player' },
      {
        text: '0.1.0',
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
