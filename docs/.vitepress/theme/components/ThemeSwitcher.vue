<script setup lang="ts">
import { ref } from 'vue'
import { usePlayerTheme } from '../composables/usePlayerTheme'

const { activeId, themes, setTheme } = usePlayerTheme()

const isOpen = ref(false)
const wrapRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function pick(id: string) {
  setTheme(id)
  isOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (wrapRef.value && !wrapRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}
</script>

<template>
  <div ref="wrapRef" class="ts-wrap">
    <button
      class="ts-trigger"
      :class="{ 'ts-trigger--open': isOpen }"
      :aria-expanded="isOpen"
      aria-label="Player theme"
      title="Player theme"
      @click="toggle"
      @blur.capture="onClickOutside"
    >
      <!-- Palette icon -->
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="13.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
        <path d="M12 2C6.477 2 2 6.477 2 12a9.976 9.976 0 0 0 2.898 7.013C6.016 20.13 7.5 21 9 21c1.5 0 2.5-1 3.5-1s2 1 3.5 1c1.657 0 3-1.343 3-3a3 3 0 0 0-.532-1.695A10 10 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    </button>

    <Transition name="ts-pop">
      <div
        v-if="isOpen"
        class="ts-popover"
        role="dialog"
        aria-label="Choose player theme"
        @mousedown.prevent
      >
        <p class="ts-popover-label">Player theme</p>
        <div class="ts-swatches">
          <button
            v-for="theme in themes"
            :key="theme.id"
            class="ts-swatch"
            :class="{ 'ts-swatch--active': activeId === theme.id }"
            :style="{ '--c': theme.color }"
            :title="theme.label"
            :aria-label="theme.label"
            :aria-pressed="activeId === theme.id"
            @click="pick(theme.id)"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ts-wrap {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

/* Trigger button */
.ts-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.ts-trigger:hover,
.ts-trigger--open {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

/* Popover */
.ts-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 200;
  white-space: nowrap;
}

.ts-popover-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin: 0 0 10px;
}

.ts-swatches {
  display: flex;
  gap: 8px;
}

/* Swatches */
.ts-swatch {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--c);
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.ts-swatch:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 30%, transparent);
}

.ts-swatch--active {
  border-color: var(--vp-c-bg-elv);
  box-shadow:
    0 0 0 2px var(--c),
    0 0 10px color-mix(in srgb, var(--c) 55%, transparent);
  transform: scale(1.15);
}

/* Transition */
.ts-pop-enter-active,
.ts-pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}
.ts-pop-enter-from,
.ts-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
