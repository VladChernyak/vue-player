<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Quality } from '@vue-player/core'
import IcoSettings from '../icons/IcoSettings.vue'
import IcoSpeed from '../icons/IcoSpeed.vue'
import IcoChevronRight from '../icons/IcoChevronRight.vue'
import IcoChevronLeft from '../icons/IcoChevronLeft.vue'
import IcoCheck from '../icons/IcoCheck.vue'
import IcoTuning from '../icons/IcoTuning.vue'
import IcoMinus from '../icons/IcoMinus.vue'
import IcoPlus from '../icons/IcoPlus.vue'

const props = defineProps<{
  playbackRate: number
  playbackRates: number[]
  availableQualities: ReadonlyArray<Quality>
  currentQuality: number | 'auto'
}>()

const emit = defineEmits<{
  setSpeed: [rate: number]
  setQuality: [value: number | 'auto']
}>()

const SPEED_BADGES = [1, 1.25, 1.5, 1.75, 2]

const isOpen = ref(false)
const activePanel = ref<'main' | 'speed' | 'quality'>('main')
const slideDir = ref<'fwd' | 'bck'>('fwd')
const wrapRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

// Visual-only rate for smooth slider animation on badge click
const visualRate = ref(props.playbackRate)
let rafId: number | null = null

watch(
  () => props.playbackRate,
  (v) => {
    visualRate.value = v
  },
)

function labelRate(rate: number) {
  return `${rate}×`
}

function labelQuality(q: number | 'auto') {
  return q === 'auto' ? 'Auto' : `${q}p`
}

function close() {
  isOpen.value = false
  activePanel.value = 'main'
}

async function goToPanel(panel: 'main' | 'speed' | 'quality') {
  slideDir.value = panel === 'main' ? 'bck' : 'fwd'
  const body = bodyRef.value
  if (!body) {
    activePanel.value = panel
    return
  }

  const fromH = body.offsetHeight
  activePanel.value = panel
  await nextTick()

  body.style.height = 'auto'
  const toH = body.offsetHeight
  body.style.height = fromH + 'px'
  void body.offsetHeight
  body.style.height = toH + 'px'

  const onEnd = (e: TransitionEvent) => {
    if (e.propertyName !== 'height' || e.target !== body) return
    body.style.height = ''
    body.removeEventListener('transitionend', onEnd)
  }
  body.addEventListener('transitionend', onEnd)
}

function clampRate(r: number) {
  return Math.round(Math.max(0.25, Math.min(3, r)) * 100) / 100
}

function setSpeed(rate: number) {
  emit('setSpeed', clampRate(rate))
}

function onSliderInput(e: Event) {
  const val = clampRate(Number((e.target as HTMLInputElement).value))
  visualRate.value = val
  emit('setSpeed', val)
}

function animateTo(target: number) {
  if (rafId !== null) cancelAnimationFrame(rafId)
  const from = visualRate.value
  const start = performance.now()
  const duration = 220

  function step(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - t, 3)
    visualRate.value = from + (target - from) * ease
    if (t < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      visualRate.value = target
      rafId = null
    }
  }
  rafId = requestAnimationFrame(step)
}

function selectBadge(rate: number) {
  animateTo(rate)
  emit('setSpeed', rate)
}

function sliderThumbPct() {
  return ((visualRate.value - 0.25) / (3 - 0.25)) * 100
}

function selectQuality(value: number | 'auto') {
  emit('setQuality', value)
  close()
}

function onDocClick(e: MouseEvent) {
  if (wrapRef.value && !wrapRef.value.contains(e.target as Node)) close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div ref="wrapRef" class="vp-menu-wrap" @keydown.escape="close">
    <button
      class="vp-button"
      aria-label="Settings"
      :class="{ 'vp-menu-open': isOpen }"
      @click.stop="isOpen ? close() : (isOpen = true)"
    >
      <IcoSettings class="vp-settings-icon" :class="{ 'vp-settings-icon--open': isOpen }" />
    </button>

    <Transition name="vp-popup">
      <div v-if="isOpen" class="vp-menu vp-settings-menu" @click.stop>
        <div ref="bodyRef" class="vp-settings-body">
          <Transition :name="`vp-slide-${slideDir}`">
            <!-- Main panel -->
            <div v-if="activePanel === 'main'" key="main" class="vp-settings-panel">
              <button
                v-if="availableQualities.length > 0"
                class="vp-settings-row"
                @click="goToPanel('quality')"
              >
                <IcoTuning class="vp-settings-row-icon" />
                <span class="vp-settings-row-label">Quality</span>
                <span class="vp-settings-row-value">{{ labelQuality(currentQuality) }}</span>
                <IcoChevronRight class="vp-settings-row-arrow" />
              </button>
              <button class="vp-settings-row" @click="goToPanel('speed')">
                <IcoSpeed class="vp-settings-row-icon" />
                <span class="vp-settings-row-label">Playback speed</span>
                <span class="vp-settings-row-value">{{ labelRate(playbackRate) }}</span>
                <IcoChevronRight class="vp-settings-row-arrow" />
              </button>
            </div>

            <!-- Quality panel -->
            <div v-else-if="activePanel === 'quality'" key="quality" class="vp-settings-panel">
              <button class="vp-settings-back" @click="goToPanel('main')">
                <IcoChevronLeft class="vp-settings-back-icon" />
                Quality
              </button>
              <button
                class="vp-quality-option"
                :class="{ 'vp-active': currentQuality === 'auto' }"
                @click="selectQuality('auto')"
              >
                <IcoCheck v-if="currentQuality === 'auto'" class="vp-quality-check" />
                <span v-else class="vp-quality-check" />
                <span class="vp-quality-label">Auto</span>
              </button>
              <button
                v-for="q in availableQualities"
                :key="q.value"
                class="vp-quality-option"
                :class="{ 'vp-active': currentQuality === q.value }"
                @click="selectQuality(q.value)"
              >
                <IcoCheck v-if="currentQuality === q.value" class="vp-quality-check" />
                <span v-else class="vp-quality-check" />
                <span class="vp-quality-label">{{ q.label }}</span>
              </button>
            </div>

            <!-- Speed panel -->
            <div v-else key="speed" class="vp-settings-panel">
              <button class="vp-settings-back" @click="goToPanel('main')">
                <IcoChevronLeft class="vp-settings-back-icon" />
                Playback speed
              </button>

              <div class="vp-speed-current-value">{{ labelRate(playbackRate) }}</div>

              <div class="vp-speed-track">
                <button
                  class="vp-button vp-step-button"
                  :disabled="playbackRate <= 0.25"
                  @click="setSpeed(playbackRate - 0.25)"
                >
                  <IcoMinus />
                </button>
                <div class="vp-cslider">
                  <div class="vp-cslider-rail" />
                  <div class="vp-cslider-fill" :style="{ width: sliderThumbPct() + '%' }" />
                  <div class="vp-cslider-thumb" :style="{ left: sliderThumbPct() + '%' }" />
                  <input
                    class="vp-cslider-input"
                    type="range"
                    min="0.25"
                    max="3"
                    step="0.05"
                    :value="visualRate"
                    @input="onSliderInput"
                  />
                </div>
                <button
                  class="vp-button vp-step-button"
                  :disabled="playbackRate >= 3"
                  @click="setSpeed(playbackRate + 0.25)"
                >
                  <IcoPlus />
                </button>
              </div>

              <div class="vp-speed-badges">
                <button
                  v-for="rate in SPEED_BADGES"
                  :key="rate"
                  class="vp-speed-badge"
                  :class="{ 'vp-active': playbackRate === rate }"
                  @click="selectBadge(rate)"
                >
                  {{ labelRate(rate) }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>
