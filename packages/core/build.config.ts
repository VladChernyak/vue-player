import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  externals: ['hls.js', 'shaka-player'],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
})
