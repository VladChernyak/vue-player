<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'

const src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
</script>

<template>
  <div class="page">
    <h1>vue-player playground</h1>

    <div class="player-wrap">
      <VideoPlayer
        :src="src"
        :keyboard="true"
        @play="console.log('play')"
        @pause="console.log('pause')"
        @error="console.error('error', $event)"
      />
    </div>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: #0f0f0f;
  color: #fff;
  font-family: system-ui, sans-serif;
}

.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  margin: 0 0 24px;
  font-size: 20px;
  font-weight: 500;
  opacity: 0.6;
}

.player-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
