<script setup lang="ts">
import IcoPlay from '../icons/IcoPlay.vue'
import IcoPause from '../icons/IcoPause.vue'

defineProps<{ isPlaying: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button class="vp-button" :aria-label="isPlaying ? 'Pause' : 'Play'" @click="$emit('click')">
    <IcoPause v-if="isPlaying" />
    <IcoPlay v-else />
  </button>
</template>
