<script setup lang="ts">
import VpIcon from '../VpIcon.vue'
defineProps<{ isPlaying: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button class="vp-button" @click="$emit('click')">
    <VpIcon :name="isPlaying ? 'pause' : 'play'" />
  </button>
</template>
