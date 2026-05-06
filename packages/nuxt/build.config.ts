import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/module'],
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt',
    'vue',
    '@vue-player/vue',
    '@vue-player/core',
  ],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
})
