import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'

const SITE_URL = 'https://vue-player.vercel.app'
const DESCRIPTION =
  'Feature-rich Vue 3 video player with HLS adaptive streaming, chapters, subtitles, thumbnail previews and Picture-in-Picture — out of the box.'

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vue Player',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description: DESCRIPTION,
  url: SITE_URL,
  downloadUrl: 'https://www.npmjs.com/package/@vue-player/vue',
  softwareVersion: '0.1.3',
  license: 'https://github.com/VladChernyak/vue-player/blob/main/LICENSE',
  author: { '@type': 'Person', name: 'Vladyslav Chernyak' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default defineConfig({
  title: 'Vue Player',
  description: DESCRIPTION,
  titleTemplate: ':title | Vue Player',
  lang: 'en',

  sitemap: {
    hostname: SITE_URL,
  },

  transformHead({ pageData }) {
    const head: HeadConfig[] = []

    const isHome = pageData.relativePath === 'index.md'
    const title = isHome
      ? 'Vue Player — Vue 3 Video Player'
      : pageData.title
        ? `${pageData.title} | Vue Player`
        : 'Vue Player'
    const description = pageData.frontmatter.description || pageData.description || DESCRIPTION

    const path = pageData.relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '/')
      .replace(/^index$/, '')
    const url = path ? `${SITE_URL}/${path}` : SITE_URL

    head.push(['link', { rel: 'canonical', href: url }])
    head.push(['meta', { property: 'og:url', content: url }])
    head.push(['meta', { property: 'og:title', content: title }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { name: 'twitter:title', content: title }])
    head.push(['meta', { name: 'twitter:description', content: description }])

    return head
  },

  vite: {
    resolve: {
      alias: [
        {
          find: '@vue-player/vue/styles',
          replacement: fileURLToPath(
            new URL('../../packages/vue/src/styles/index.css', import.meta.url),
          ),
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
    ['meta', { name: 'google-site-verification', content: 'dQBIUFfNk6Z9GDf9QHyquUv2daOJ_pZgBRZ9d57-8VE' }],

    // Open Graph (static — per-page values set in transformHead)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Vue Player' }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/og-image.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    // Twitter / X (static)
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }],

    // Structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify(STRUCTURED_DATA)],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Vue Player',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API', link: '/api/video-player' },
      {
        text: '0.1.3',
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
      copyright: 'Copyright © 2026-present Vladyslav Chernyak',
    },

    search: {
      provider: 'local',
    },
  },
})
