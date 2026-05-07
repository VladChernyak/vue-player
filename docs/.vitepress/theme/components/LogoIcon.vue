<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerTheme } from '../composables/usePlayerTheme'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 32 })

const { activeTheme } = usePlayerTheme()
const c1 = computed(() => activeTheme.value.logoStart)
const c2 = computed(() => activeTheme.value.logoEnd)

const gradId = `logo-g-${Math.random().toString(36).slice(2, 7)}`
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 612 599"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="`${gradId}-arrow`" x1="12.6" y1="299.5" x2="611.6" y2="299.5" gradientUnits="userSpaceOnUse">
        <stop :stop-color="c1" />
        <stop offset="1" :stop-color="c2" />
      </linearGradient>
      <linearGradient :id="`${gradId}-arrow-stroke`" x1="380.9" y1="176.2" x2="174.6" y2="528.7" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0.8" />
        <stop offset="1" stop-color="white" stop-opacity="0.2" />
      </linearGradient>
      <linearGradient :id="`${gradId}-tri`" x1="22" y1="223" x2="307" y2="223" gradientUnits="userSpaceOnUse">
        <stop :stop-color="c1" stop-opacity="0" />
        <stop offset="0.4" :stop-color="c1" stop-opacity="0" />
        <stop offset="0.5" :stop-color="c1" />
        <stop offset="1" :stop-color="c2" />
      </linearGradient>
      <linearGradient :id="`${gradId}-tri-overlay`" x1="22.1" y1="203.1" x2="285.3" y2="370.6" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6B91B7" />
        <stop offset="1" stop-color="white" />
      </linearGradient>
      <linearGradient :id="`${gradId}-tri-stroke`" x1="235.4" y1="368.4" x2="53.8" y2="246.6" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0.8" />
        <stop offset="1" stop-color="white" stop-opacity="0.2" />
      </linearGradient>
    </defs>

    <!-- Arrow -->
    <path
      d="M551.143 265.725C577.143 280.736 577.143 318.264 551.143 333.275L221.893 523.367C195.893 538.378 163.393 519.615 163.393 489.593L163.393 109.407C163.393 79.3851 195.893 60.6217 221.893 75.6328L551.143 265.725Z"
      :fill="`url(#${gradId}-arrow)`"
      :stroke="`url(#${gradId}-arrow-stroke)`"
      stroke-width="2"
    />

    <!-- Triangle fill -->
    <path
      d="M197.103 427.508C183.655 450.963 149.825 450.963 136.377 427.508L30.0499 242.066C16.6713 218.733 33.5164 189.656 60.4129 189.656L273.067 189.656C299.964 189.656 316.809 218.733 303.43 242.066L197.103 427.508Z"
      :fill="`url(#${gradId}-tri)`"
    />

    <!-- Triangle overlay -->
    <path
      d="M196.669 427.26C183.413 450.379 150.066 450.379 136.811 427.26L30.4834 241.817C17.296 218.818 33.9008 190.156 60.4131 190.156L273.067 190.156C299.58 190.156 316.183 218.818 302.996 241.817L196.669 427.26Z"
      fill="white"
      fill-opacity="0.3"
    />
    <path
      d="M196.669 427.26C183.413 450.379 150.066 450.379 136.811 427.26L30.4834 241.817C17.296 218.818 33.9008 190.156 60.4131 190.156L273.067 190.156C299.58 190.156 316.183 218.818 302.996 241.817L196.669 427.26Z"
      :fill="`url(#${gradId}-tri-overlay)`"
      fill-opacity="0.2"
    />
    <path
      d="M196.669 427.26C183.413 450.379 150.066 450.379 136.811 427.26L30.4834 241.817C17.296 218.818 33.9008 190.156 60.4131 190.156L273.067 190.156C299.58 190.156 316.183 218.818 302.996 241.817L196.669 427.26Z"
      :stroke="`url(#${gradId}-tri-stroke)`"
    />
  </svg>
</template>
