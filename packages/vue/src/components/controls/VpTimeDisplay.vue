<script setup lang="ts">
import { formatTime } from '@vue-player/core'

defineProps<{
  currentTime: number
  duration: number
}>()
</script>

<template>
  <span class="vp-time">
    <span class="vp-time-current">{{ formatTime(currentTime) }}</span>
    <span class="vp-time-sep">/</span>
    <span>{{ formatTime(duration) }}</span>
  </span>
</template>
