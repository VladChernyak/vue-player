import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const bundleCss = () => ({
  name: 'bundle-css',
  writeBundle() {
    const dir = resolve(__dirname, 'src/styles')
    writeFileSync(
      resolve(__dirname, 'dist/style.css'),
      readFileSync(resolve(dir, 'theme.css'), 'utf-8') + '\n' +
      readFileSync(resolve(dir, 'player.css'), 'utf-8'),
    )
  },
})

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      outDir: 'dist',
      tsconfigPath: '../../tsconfig.json',
    }),
    bundleCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue', 'hls.js', '@vue-player/core'],
      output: {
        exports: 'named',
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@vue-player/core': resolve(__dirname, '../core/src/index.ts'),
    },
  },
})
