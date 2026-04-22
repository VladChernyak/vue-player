import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue-player/core': resolve(__dirname, '../../packages/core/src/index.ts'),
      '@vue-player/vue': resolve(__dirname, '../../packages/vue/src/index.ts'),
    },
  },
})
