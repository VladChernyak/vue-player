import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  externals: ['vue', 'hls.js', 'shaka-player', '@vue-player/core'],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
})
