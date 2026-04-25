<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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

// After releasing the scrubber, hold the target time visually
// until currentTime catches up (video may be buffering)
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
}

const segments = computed<Segment[]>(() => {
  const dur = props.duration
  if (!dur || !props.chapters?.length) return [{ start: 0, end: 1 }]
  const sorted = [...props.chapters].sort((a, b) => a.time - b.time)
  return sorted.map((ch, i) => ({
    start: ch.time / dur,
    end: (sorted[i + 1]?.time ?? dur) / dur,
  }))
})

function ratioFromEvent(e: PointerEvent): number {
  const el = trackRef.value
  if (!el) return 0
  const rect = el.getBoundingClientRect()
  return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
}

function onPointerDown(e: PointerEvent) {
  if (!props.duration) return
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isSeeking.value = true
  seekRatio.value = ratioFromEvent(e)
}

function onPointerMove(e: PointerEvent) {
  if (!isSeeking.value) return
  seekRatio.value = ratioFromEvent(e)
}

function onPointerUp(e: PointerEvent) {
  if (!isSeeking.value) return
  const ratio = ratioFromEvent(e)
  const time = ratio * props.duration
  pendingSeekTime.value = time
  isSeeking.value = false
  emit('seek', time)
}

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

const thumbPct = computed(() => progressRatio.value * 100)
</script>

<template>
  <div
    ref="trackRef"
    class="vp-timeline"
    :class="{ 'vp-timeline--seeking': isSeeking }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="isSeeking = false"
  >
    <div
      v-for="(seg, i) in segments"
      :key="i"
      class="vp-timeline-segment"
      :style="{ flex: seg.end - seg.start }"
    >
      <div class="vp-timeline-buffered" :style="{ width: segmentBuffered(seg) + '%' }" />
      <div class="vp-timeline-fill" :style="{ width: segmentFill(seg) + '%' }" />
    </div>

    <div v-if="duration > 0" class="vp-timeline-thumb" :style="{ left: `${thumbPct}%` }" />

    <div v-if="isSeeking" class="vp-timeline-tooltip" :style="{ left: `${thumbPct}%` }">
      {{ formatTime(displayTime) }}
    </div>
  </div>
</template>
