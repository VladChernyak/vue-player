<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { Chapter } from '@vue-player/core'
import { formatTime } from '@vue-player/core'

const props = defineProps<{
  currentTime: number
  duration: number
  buffered: number
  chapters?: Chapter[]
}>()

const emit = defineEmits<{
  seek: [time: number]
}>()

const trackRef = ref<HTMLElement | null>(null)
const isSeeking = ref(false)
const seekRatio = ref(0)
const hoverRatio = ref<number | null>(null)

const pendingSeekTime = ref<number | null>(null)

watch(
  () => props.currentTime,
  (t) => {
    if (pendingSeekTime.value !== null && Math.abs(t - pendingSeekTime.value) < 1) {
      pendingSeekTime.value = null
    }
  },
)

const displayTime = computed(() => {
  if (isSeeking.value) return seekRatio.value * props.duration
  if (pendingSeekTime.value !== null) return pendingSeekTime.value
  return props.currentTime
})

const progressRatio = computed(() => (props.duration > 0 ? displayTime.value / props.duration : 0))
const bufferedRatio = computed(() => (props.duration > 0 ? props.buffered / props.duration : 0))

interface Segment {
  start: number
  end: number
  label?: string
}

const segments = computed<Segment[]>(() => {
  const dur = props.duration
  if (!dur || !props.chapters?.length) return [{ start: 0, end: 1 }]
  const sorted = [...props.chapters].sort((a, b) => a.time - b.time)
  return sorted.map((ch, i) => ({
    start: ch.time / dur,
    end: (sorted[i + 1]?.time ?? dur) / dur,
    label: ch.label,
  }))
})

function ratioFromEvent(e: { clientX: number }): number {
  const el = trackRef.value
  if (!el) return 0
  const rect = el.getBoundingClientRect()
  return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
}

function stopSeeking() {
  isSeeking.value = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', stopSeeking)
}

function onPointerDown(e: PointerEvent) {
  if (!props.duration) return
  isSeeking.value = true
  seekRatio.value = ratioFromEvent(e)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', stopSeeking)
}

function onPointerMove(e: PointerEvent) {
  seekRatio.value = ratioFromEvent(e)
}

function onPointerUp(e: PointerEvent) {
  const ratio = ratioFromEvent(e)
  const time = ratio * props.duration
  pendingSeekTime.value = time
  emit('seek', time)
  stopSeeking()
}

function onMouseMove(e: MouseEvent) {
  if (!isSeeking.value) hoverRatio.value = ratioFromEvent(e)
}

function onMouseLeave() {
  hoverRatio.value = null
}

onBeforeUnmount(stopSeeking)

function segmentFill(seg: Segment): number {
  const p = progressRatio.value
  if (p <= seg.start) return 0
  if (p >= seg.end) return 100
  return ((p - seg.start) / (seg.end - seg.start)) * 100
}

function segmentBuffered(seg: Segment): number {
  const b = bufferedRatio.value
  if (b <= seg.start) return 0
  if (b >= seg.end) return 100
  return ((b - seg.start) / (seg.end - seg.start)) * 100
}

// ─── Hovered segment ───
const hoverSegmentIndex = computed(() => {
  const r = hoverRatio.value
  if (r === null) return -1
  return segments.value.findIndex((s) => r >= s.start && r < s.end)
})

// ─── Tooltip ───
const tooltipRatio = computed(() => {
  if (isSeeking.value) return seekRatio.value
  return hoverRatio.value
})

const tooltipTime = computed(() =>
  tooltipRatio.value !== null ? tooltipRatio.value * props.duration : 0,
)

const tooltipChapter = computed(() => {
  const r = tooltipRatio.value
  if (!props.chapters?.length || r === null) return null
  return segments.value.find((s) => r >= s.start && r < s.end)?.label ?? null
})

const showTooltip = computed(() => tooltipRatio.value !== null && props.duration > 0)

// Clamp the % so the tooltip doesn't bleed off the track edges.
// 46px ≈ half the max tooltip width; keeps it fully visible.
const tooltipStyle = computed(() => {
  const pct = (tooltipRatio.value ?? 0) * 100
  return { left: `clamp(46px, ${pct}%, calc(100% - 46px))` }
})
</script>

<template>
  <div
    ref="trackRef"
    class="vp-timeline"
    :class="{ 'vp-timeline--seeking': isSeeking }"
    @pointerdown="onPointerDown"
  >
    <div
      class="vp-timeline-track"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <div
        v-for="(seg, i) in segments"
        :key="i"
        class="vp-timeline-segment"
        :class="{ 'vp-timeline-segment--active': i === hoverSegmentIndex }"
        :style="{ flex: seg.end - seg.start }"
      >
        <div class="vp-timeline-buffered" :style="{ width: segmentBuffered(seg) + '%' }" />
        <div class="vp-timeline-fill" :style="{ width: segmentFill(seg) + '%' }" />
      </div>
    </div>

    <div v-if="duration > 0" class="vp-timeline-thumb" :style="{ '--progress': progressRatio }" />

    <div v-if="showTooltip" class="vp-timeline-tooltip" :style="tooltipStyle">
      <span v-if="tooltipChapter" class="vp-tooltip-chapter">{{ tooltipChapter }}</span>
      {{ formatTime(tooltipTime) }}
    </div>
  </div>
</template>
