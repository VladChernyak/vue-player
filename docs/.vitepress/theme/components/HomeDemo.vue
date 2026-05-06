<template>
  <section class="home-demo">
    <div class="home-demo-inner">
      <h2 class="home-demo-title">See it in action</h2>
      <p class="home-demo-sub">
        Chapters, subtitles, thumbnail previews, quality switching and Picture-in-Picture — all
        live.
      </p>
      <div class="home-demo-player">
        <div class="home-demo-placeholder">
          <span class="home-demo-icon">▶</span>
          <span class="home-demo-label">Live demo coming soon</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-demo {
  padding: 80px 24px;
  border-top: 1px solid var(--vp-c-divider);
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
  background: linear-gradient(120deg, var(--vp-c-brand-1) 0%, var(--docs-gradient-end, #22d3ee) 100%);
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
  aspect-ratio: 16 / 9;
  margin-top: 16px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px var(--vp-c-divider),
    0 32px 80px rgba(0, 0, 0, 0.35);
}

.home-demo-placeholder {
  width: 100%;
  height: 100%;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.home-demo-icon {
  font-size: 40px;
  opacity: 0.2;
}

.home-demo-label {
  font-size: 14px;
  color: var(--vp-c-text-3);
  letter-spacing: 0.02em;
}
</style>
