<script setup lang="ts">
import { VideoPlayer } from '@vue-player/vue'
import type { Chapter } from '@vue-player/core'

const src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
const poster = '/demo-poster.webp'

const chapters: Chapter[] = [
  { time: 0, label: 'Opening' },
  { time: 56, label: 'The Squirrels Appear' },
  { time: 164, label: 'First Prank' },
  { time: 268, label: 'Buck Gives Chase' },
  { time: 390, label: 'Retaliation' },
  { time: 492, label: "Buck's Revenge" },
]
</script>

<template>
  <section class="home-demo">
    <div class="home-demo-inner">
      <h2 class="home-demo-title">See it in action</h2>
      <p class="home-demo-sub">
        HLS adaptive streaming, chapters, quality switching and Picture-in-Picture — all live.
      </p>
      <div class="home-demo-player">
        <ClientOnly>
          <VideoPlayer
            :src="src"
            :poster="poster"
            :chapters="chapters"
            thumbnails="/demo-thumbs.vtt"
          />
          <template #fallback>
            <div class="home-demo-placeholder">
              <span class="home-demo-icon">▶</span>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-demo {
  margin-top: 48px;
  padding: 80px 24px;
  border-top: 1px solid var(--vp-c-divider);
  overflow-x: clip;
}

@media (max-width: 640px) {
  .home-demo {
    padding: 48px 8px;
  }

  .home-demo-inner {
    max-width: 100%;
  }
}

.home-demo-inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.home-demo-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  background: linear-gradient(
    120deg,
    var(--vp-c-brand-1) 0%,
    var(--docs-gradient-end, #22d3ee) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-demo-sub {
  font-size: 16px;
  color: var(--vp-c-text-2);
  max-width: 520px;
  line-height: 1.6;
}

.home-demo-player {
  width: 100%;
  margin-top: 16px;
  border-radius: 16px;
  box-shadow:
    0 0 0 1px var(--vp-c-divider),
    0 32px 80px rgba(0, 0, 0, 0.35);
}

.home-demo-placeholder {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-demo-icon {
  font-size: 40px;
  opacity: 0.2;
}
</style>
