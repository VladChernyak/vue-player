import { computed, ref, watch } from 'vue'

export interface PlayerTheme {
  id: string
  label: string
  color: string
  logoStart: string
  logoEnd: string
  vars: Record<string, string>
}

export const PLAYER_THEMES: PlayerTheme[] = [
  {
    id: 'green',
    label: 'Green',
    color: '#3dd68c',
    logoStart: '#41B883',
    logoEnd: '#22FF9D',
    vars: {
      '--vp-primary': '#3dd68c',
      '--vp-primary-hover': '#2ec97a',
      '--vp-primary-active': '#24b86e',
      '--vp-primary-glow': 'rgba(61, 214, 140, 0.22)',
      '--vp-c-brand-1': '#3dd68c',
      '--vp-c-brand-2': '#2ec97a',
      '--vp-c-brand-3': '#24b86e',
      '--vp-c-brand-soft': 'rgba(61, 214, 140, 0.14)',
      '--docs-gradient-end': '#22d3ee',
      '--docs-glow-1': 'rgba(61, 214, 140, 0.35)',
      '--docs-glow-2': 'rgba(34, 211, 238, 0.15)',
      '--docs-icon-glow': 'rgba(61, 214, 140, 0.5)',
    },
  },
  {
    id: 'blue',
    label: 'Blue',
    color: '#3b82f6',
    logoStart: '#3b82f6',
    logoEnd: '#60a5fa',
    vars: {
      '--vp-primary': '#3b82f6',
      '--vp-primary-hover': '#2563eb',
      '--vp-primary-active': '#1d4ed8',
      '--vp-primary-glow': 'rgba(59, 130, 246, 0.22)',
      '--vp-c-brand-1': '#3b82f6',
      '--vp-c-brand-2': '#2563eb',
      '--vp-c-brand-3': '#1d4ed8',
      '--vp-c-brand-soft': 'rgba(59, 130, 246, 0.14)',
      '--docs-gradient-end': '#60a5fa',
      '--docs-glow-1': 'rgba(59, 130, 246, 0.35)',
      '--docs-glow-2': 'rgba(96, 165, 250, 0.15)',
      '--docs-icon-glow': 'rgba(59, 130, 246, 0.5)',
    },
  },
  {
    id: 'violet',
    label: 'Violet',
    color: '#8b5cf6',
    logoStart: '#8b5cf6',
    logoEnd: '#c084fc',
    vars: {
      '--vp-primary': '#8b5cf6',
      '--vp-primary-hover': '#7c3aed',
      '--vp-primary-active': '#6d28d9',
      '--vp-primary-glow': 'rgba(139, 92, 246, 0.22)',
      '--vp-c-brand-1': '#8b5cf6',
      '--vp-c-brand-2': '#7c3aed',
      '--vp-c-brand-3': '#6d28d9',
      '--vp-c-brand-soft': 'rgba(139, 92, 246, 0.14)',
      '--docs-gradient-end': '#c084fc',
      '--docs-glow-1': 'rgba(139, 92, 246, 0.35)',
      '--docs-glow-2': 'rgba(192, 132, 252, 0.15)',
      '--docs-icon-glow': 'rgba(139, 92, 246, 0.5)',
    },
  },
  {
    id: 'orange',
    label: 'Orange',
    color: '#f97316',
    logoStart: '#f97316',
    logoEnd: '#fbbf24',
    vars: {
      '--vp-primary': '#f97316',
      '--vp-primary-hover': '#ea6c0a',
      '--vp-primary-active': '#c2550a',
      '--vp-primary-glow': 'rgba(249, 115, 22, 0.22)',
      '--vp-c-brand-1': '#f97316',
      '--vp-c-brand-2': '#ea6c0a',
      '--vp-c-brand-3': '#c2550a',
      '--vp-c-brand-soft': 'rgba(249, 115, 22, 0.14)',
      '--docs-gradient-end': '#fbbf24',
      '--docs-glow-1': 'rgba(249, 115, 22, 0.35)',
      '--docs-glow-2': 'rgba(251, 191, 36, 0.15)',
      '--docs-icon-glow': 'rgba(249, 115, 22, 0.5)',
    },
  },
  {
    id: 'red',
    label: 'Red',
    color: '#ef4444',
    logoStart: '#ef4444',
    logoEnd: '#f87171',
    vars: {
      '--vp-primary': '#ef4444',
      '--vp-primary-hover': '#dc2626',
      '--vp-primary-active': '#b91c1c',
      '--vp-primary-glow': 'rgba(239, 68, 68, 0.22)',
      '--vp-c-brand-1': '#ef4444',
      '--vp-c-brand-2': '#dc2626',
      '--vp-c-brand-3': '#b91c1c',
      '--vp-c-brand-soft': 'rgba(239, 68, 68, 0.14)',
      '--docs-gradient-end': '#f87171',
      '--docs-glow-1': 'rgba(239, 68, 68, 0.35)',
      '--docs-glow-2': 'rgba(248, 113, 113, 0.15)',
      '--docs-icon-glow': 'rgba(239, 68, 68, 0.5)',
    },
  },
  {
    id: 'cyan',
    label: 'Cyan',
    color: '#06b6d4',
    logoStart: '#06b6d4',
    logoEnd: '#67e8f9',
    vars: {
      '--vp-primary': '#06b6d4',
      '--vp-primary-hover': '#0891b2',
      '--vp-primary-active': '#0e7490',
      '--vp-primary-glow': 'rgba(6, 182, 212, 0.22)',
      '--vp-c-brand-1': '#06b6d4',
      '--vp-c-brand-2': '#0891b2',
      '--vp-c-brand-3': '#0e7490',
      '--vp-c-brand-soft': 'rgba(6, 182, 212, 0.14)',
      '--docs-gradient-end': '#67e8f9',
      '--docs-glow-1': 'rgba(6, 182, 212, 0.35)',
      '--docs-glow-2': 'rgba(103, 232, 249, 0.15)',
      '--docs-icon-glow': 'rgba(6, 182, 212, 0.5)',
    },
  },
]

const STORAGE_KEY = 'vp-player-theme'

function applyTheme(theme: PlayerTheme) {
  for (const [key, value] of Object.entries(theme.vars)) {
    document.documentElement.style.setProperty(key, value)
  }
}

const activeId = ref<string>(
  (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) || 'green',
)

if (typeof document !== 'undefined') {
  const initial = PLAYER_THEMES.find((t) => t.id === activeId.value) ?? PLAYER_THEMES[0]
  applyTheme(initial)
}

watch(activeId, (id) => {
  const theme = PLAYER_THEMES.find((t) => t.id === id)
  if (!theme) return
  applyTheme(theme)
  localStorage.setItem(STORAGE_KEY, id)
})

export function usePlayerTheme() {
  const activeTheme = computed(
    () => PLAYER_THEMES.find((t) => t.id === activeId.value) ?? PLAYER_THEMES[0],
  )

  return {
    activeId,
    activeTheme,
    themes: PLAYER_THEMES,
    setTheme: (id: string) => {
      activeId.value = id
    },
  }
}
