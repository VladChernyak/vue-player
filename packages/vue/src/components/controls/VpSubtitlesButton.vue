<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Track } from '@vue-player/core'
import IcoCaptions from '../icons/IcoCaptions.vue'
import IcoCheck from '../icons/IcoCheck.vue'

const props = defineProps<{
  tracks: ReadonlyArray<Track>
  currentTrack: Track | null
}>()

const emit = defineEmits<{ setTrack: [track: Track | null] }>()

const isOpen = ref(false)
const wrapRef = ref<HTMLElement | null>(null)

function close() {
  isOpen.value = false
}

function isActive(track: Track) {
  return (
    props.currentTrack !== null &&
    props.currentTrack.language === track.language &&
    props.currentTrack.label === track.label
  )
}

function select(track: Track | null) {
  emit('setTrack', track)
  close()
}

function onDocClick(e: MouseEvent) {
  if (wrapRef.value && !wrapRef.value.contains(e.target as Node)) close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="wrapRef" class="vp-menu-wrap" @keydown.escape="close">
    <button
      class="vp-button"
      :class="{ 'vp-menu-open': isOpen, 'vp-captions-active': currentTrack !== null }"
      aria-label="Subtitles"
      @click.stop="isOpen ? close() : (isOpen = true)"
    >
      <IcoCaptions />
    </button>

    <Transition name="vp-popup">
      <div v-if="isOpen" class="vp-menu" @click.stop>
        <button
          class="vp-quality-option"
          :class="{ 'vp-active': currentTrack === null }"
          @click="select(null)"
        >
          <IcoCheck v-if="currentTrack === null" class="vp-quality-check" />
          <span v-else class="vp-quality-check" />
          <span class="vp-quality-label">Off</span>
        </button>
        <button
          v-for="track in tracks"
          :key="track.language + track.label"
          class="vp-quality-option"
          :class="{ 'vp-active': isActive(track) }"
          @click="select(track)"
        >
          <IcoCheck v-if="isActive(track)" class="vp-quality-check" />
          <span v-else class="vp-quality-check" />
          <span class="vp-quality-label">{{ track.label }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>
