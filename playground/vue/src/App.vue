<script setup lang="ts">
import { ref } from 'vue'
import { VideoPlayer } from '@vue-player/vue'

const sources = [
  {
    label: 'HLS (VOD)',
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    label: 'MP4',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    label: 'Live HLS',
    src: 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4S.m3u8',
  },
]

const active = ref(sources[0])
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="header-inner">
        <span class="logo">
          <span class="logo-icon">▶</span>
          vue-player
        </span>
        <span class="badge">playground</span>
      </div>
    </header>

    <main class="main">
      <div class="player-section">
        <div class="player-wrap">
          <VideoPlayer
            :src="active.src"
            :keyboard="true"
            @error="console.error('player error', $event)"
          />
        </div>
      </div>

      <aside class="sidebar">
        <section class="card">
          <h3 class="card-title">Source</h3>
          <div class="source-list">
            <button
              v-for="s in sources"
              :key="s.src"
              class="source-btn"
              :class="{ active: active.src === s.src }"
              @click="active = s"
            >
              {{ s.label }}
            </button>
          </div>
        </section>

        <section class="card">
          <h3 class="card-title">Theme tokens</h3>
          <p class="card-hint">
            Override CSS variables on <code>.vp-player</code> to customise the player.
          </p>
          <code class="code-block">
            .my-player {<br>
            &nbsp;&nbsp;--vp-primary: #ff6b6b;<br>
            &nbsp;&nbsp;--vp-radius: 0px;<br>
            }
          </code>
        </section>
      </aside>
    </main>
  </div>
</template>

<style>
/* ─── Reset ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ─── Base ─── */
:root {
  --pg-bg:        #0b0b0f;
  --pg-surface:   #111118;
  --pg-border:    rgba(255, 255, 255, 0.07);
  --pg-text-1:    #efefef;
  --pg-text-2:    rgba(255, 255, 255, 0.50);
  --pg-text-3:    rgba(255, 255, 255, 0.28);
  --pg-accent:    #3DD68C;
  --pg-radius:    12px;
  --pg-font:      ui-sans-serif, system-ui, -apple-system, sans-serif;
}

body {
  background: var(--pg-bg);
  color: var(--pg-text-1);
  font-family: var(--pg-font);
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ─── Header ─── */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--pg-border);
  background: rgba(11, 11, 15, 0.80);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--pg-text-1);
}

.logo-icon {
  color: var(--pg-accent);
  font-size: 12px;
}

.badge {
  padding: 2px 8px;
  background: rgba(61, 214, 140, 0.12);
  color: var(--pg-accent);
  border: 1px solid rgba(61, 214, 140, 0.20);
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
}

/* ─── Layout ─── */
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 32px;
  align-items: start;
}

@media (max-width: 800px) {
  .main { grid-template-columns: 1fr; }
}

/* ─── Player ─── */
.player-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.player-wrap {
  width: 100%;
  border-radius: var(--pg-radius);
  overflow: hidden;
  box-shadow:
    0 0 0 1px var(--pg-border),
    0 24px 64px rgba(0, 0, 0, 0.60);
}

/* ─── Sidebar ─── */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ─── Card ─── */
.card {
  background: var(--pg-surface);
  border: 1px solid var(--pg-border);
  border-radius: var(--pg-radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--pg-text-3);
}

.card-hint {
  font-size: 13px;
  color: var(--pg-text-2);
  line-height: 1.5;
}

.card-hint code {
  font-family: ui-monospace, monospace;
  font-size: 12px;
  background: rgba(255,255,255,0.06);
  padding: 1px 5px;
  border-radius: 4px;
}

/* ─── Source buttons ─── */
.source-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.source-btn {
  display: block;
  width: 100%;
  padding: 9px 12px;
  background: none;
  border: 1px solid var(--pg-border);
  border-radius: 8px;
  color: var(--pg-text-2);
  font-size: 13px;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}

.source-btn:hover {
  border-color: rgba(255,255,255,0.16);
  color: var(--pg-text-1);
}

.source-btn.active {
  border-color: rgba(61, 214, 140, 0.40);
  background: rgba(61, 214, 140, 0.08);
  color: var(--pg-accent);
}

/* ─── Code block ─── */
.code-block {
  display: block;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.7;
  color: var(--pg-text-2);
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--pg-border);
  border-radius: 8px;
  padding: 12px 14px;
}
</style>
