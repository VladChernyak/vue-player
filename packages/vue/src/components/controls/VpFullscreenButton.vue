<script setup lang="ts">
import IcoFullscreenEnter from '../icons/IcoFullscreenEnter.vue'
import IcoFullscreenExit from '../icons/IcoFullscreenExit.vue'

defineProps<{ isFullscreen: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="vp-button"
    :aria-label="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
    @click="$emit('click')"
  >
    <IcoFullscreenExit v-if="isFullscreen" />
    <IcoFullscreenEnter v-else />
  </button>
</template>
