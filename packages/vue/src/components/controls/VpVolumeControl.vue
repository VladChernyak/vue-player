<script setup lang="ts">
import VpIcon from '../VpIcon.vue'

const props = defineProps<{
  volume: number
  isMuted: boolean
}>()

const emit = defineEmits<{
  toggleMute: []
  setVolume: [value: number]
}>()

const iconName = () => {
  if (props.isMuted || props.volume === 0) return 'volume-muted'
  if (props.volume > 0.5) return 'volume-high'
  return 'volume-low'
}

function onInput(e: Event) {
  emit('setVolume', Number((e.target as HTMLInputElement).value))
}
</script>

<template>
  <div class="vp-volume">
    <button class="vp-button" @click="emit('toggleMute')">
      <VpIcon :name="iconName()" />
    </button>
    <input
      class="vp-volume-slider"
      type="range"
      min="0"
      max="1"
      step="0.02"
      :value="isMuted ? 0 : volume"
      @input="onInput"
    />
  </div>
</template>
