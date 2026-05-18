import { describe, expect, it } from 'vitest'
import VuePlayerModule from '../src/module'

describe('@vue-player/nuxt', () => {
  it('is a callable module function', () => {
    expect(typeof VuePlayerModule).toBe('function')
  })

  it('exposes getMeta()', () => {
    expect(typeof VuePlayerModule.getMeta).toBe('function')
  })

  describe('meta', () => {
    it('has correct module name', async () => {
      const meta = await VuePlayerModule.getMeta!()
      expect(meta.name).toBe('@vue-player/nuxt')
    })

    it('has correct configKey', async () => {
      const meta = await VuePlayerModule.getMeta!()
      expect(meta.configKey).toBe('vuePlayer')
    })

    it('requires nuxt >= 3.0.0', async () => {
      const meta = await VuePlayerModule.getMeta!()
      expect(meta.compatibility?.nuxt).toBe('>=3.0.0')
    })
  })
})
