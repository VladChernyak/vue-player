export function isFullscreenSupported(): boolean {
  return !!(
    document.fullscreenEnabled ||
    (document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled
  )
}

export function isPiPSupported(): boolean {
  return 'pictureInPictureEnabled' in document
}

export async function enterFullscreen(el: HTMLElement): Promise<void> {
  if (el.requestFullscreen) {
    await el.requestFullscreen()
  } else {
    const webkit = el as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }
    await webkit.webkitRequestFullscreen?.()
  }
}

export async function exitFullscreen(): Promise<void> {
  if (document.exitFullscreen) {
    await document.exitFullscreen()
  } else {
    const webkit = document as Document & { webkitExitFullscreen?: () => Promise<void> }
    await webkit.webkitExitFullscreen?.()
  }
}

export function getFullscreenElement(): Element | null {
  return (
    document.fullscreenElement ||
    (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
    null
  )
}
