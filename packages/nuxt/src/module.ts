import { addComponent, addImports, defineNuxtModule } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'

export interface ModuleOptions {
  /**
   * Prefix for auto-imported components.
   * @default ''
   * @example 'Vp' → <VpVideoPlayer>
   */
  prefix?: string
}

// Explicit cast so unbuild can emit a portable .d.ts without inlining @nuxt/schema internals
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vue-player/nuxt',
    configKey: 'vuePlayer',
    compatibility: { nuxt: '>=3.0.0' },
  },

  defaults: {
    prefix: '',
  },

  setup(options, nuxt) {
    const prefix = options.prefix ?? ''

    // Inject player styles globally
    nuxt.options.css.push('@vue-player/vue/styles')

    // Auto-import VideoPlayer component
    addComponent({
      name: `${prefix}VideoPlayer`,
      export: 'VideoPlayer',
      filePath: '@vue-player/vue',
    })

    // Auto-import usePlayer composable
    addImports({
      name: 'usePlayer',
      as: prefix ? `use${prefix}Player` : 'usePlayer',
      from: '@vue-player/vue',
    })
  },
}) as NuxtModule<ModuleOptions>
