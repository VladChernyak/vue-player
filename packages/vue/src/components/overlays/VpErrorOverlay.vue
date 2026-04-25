<script setup lang="ts">
import type { PlayerError } from '@vue-player/core'
import VpIcon from '../VpIcon.vue'

defineProps<{
  error: PlayerError
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="vp-overlay">
    <slot :error="error" :retry="() => emit('retry')">
      <div class="vp-error">
        <VpIcon name="alert" class="vp-error-icon" />
        <div class="vp-error-message">{{ error.message }}</div>
        <button class="vp-error-retry" @click="emit('retry')">Try again</button>
      </div>
    </slot>
  </div>
</template>
