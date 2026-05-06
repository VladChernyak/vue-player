<script setup lang="ts">
import IcoVolumeHigh from '../icons/IcoVolumeHigh.vue'
import IcoVolumeLow from '../icons/IcoVolumeLow.vue'
import IcoVolumeMuted from '../icons/IcoVolumeMuted.vue'

const props = defineProps<{
  volume: number
  isMuted: boolean
}>()

const emit = defineEmits<{
  toggleMute: []
  setVolume: [value: number]
}>()

function onInput(e: Event) {
  emit('setVolume', Number((e.target as HTMLInputElement).value))
}
</script>

<template>
  <div class="vp-volume">
    <button
      class="vp-button"
      :aria-label="isMuted || volume === 0 ? 'Unmute' : 'Mute'"
      @click="emit('toggleMute')"
    >
      <IcoVolumeMuted v-if="isMuted || volume === 0" />
      <IcoVolumeLow v-else-if="volume <= 0.5" />
      <IcoVolumeHigh v-else />
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
