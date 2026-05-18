import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('vue-player nuxt module integration', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('serves the page without error', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>')
  })

  it('auto-imports VideoPlayer and renders video element', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<video')
  })
})
