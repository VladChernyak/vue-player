<script setup lang="ts">
import VpIcon from '../VpIcon.vue'
defineProps<{ isFullscreen: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button class="vp-button" @click="$emit('click')">
    <VpIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen-enter'" />
  </button>
</template>
