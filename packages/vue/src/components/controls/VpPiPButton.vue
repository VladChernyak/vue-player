<script setup lang="ts">
import IcoPipEnter from '../icons/IcoPipEnter.vue'
import IcoPipExit from '../icons/IcoPipExit.vue'

defineProps<{ isPiP: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="vp-button"
    :aria-label="isPiP ? 'Exit Picture-in-Picture' : 'Picture-in-Picture'"
    @click="$emit('click')"
  >
    <IcoPipExit v-if="isPiP" />
    <IcoPipEnter v-else />
  </button>
</template>
