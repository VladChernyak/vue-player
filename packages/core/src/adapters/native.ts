export interface NativeAdapter {
  load: (src: string) => void
  destroy: () => void
}

export function createNativeAdapter(video: HTMLVideoElement): NativeAdapter {
  return {
    load(src: string) {
      video.src = src
      video.load()
    },
    destroy() {
      video.removeAttribute('src')
      video.load()
    },
  }
}
