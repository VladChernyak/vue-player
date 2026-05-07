import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  externals: ['vue', 'hls.js', 'shaka-player', '@vue-player/core'],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  hooks: {
    // Bundle CSS into dist/style.css so the "./styles" export works after publish
    'build:done'({ options }) {
      const read = (f: string) => readFileSync(resolve(options.rootDir, 'src/styles', f), 'utf-8')
      writeFileSync(
        resolve(options.rootDir, 'dist/style.css'),
        read('theme.css') + '\n' + read('player.css'),
      )
    },
  },
})
