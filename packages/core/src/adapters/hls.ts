export async function createHlsAdapter(video: HTMLVideoElement, src: string) {
  const { default: Hls } = await import('hls.js')

  if (!Hls.isSupported()) {
    // Safari supports HLS natively
    video.src = src
    return null
  }

  const hls = new Hls()
  hls.loadSource(src)
  hls.attachMedia(video)
  return hls
}
