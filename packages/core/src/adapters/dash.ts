export async function createDashAdapter(video: HTMLVideoElement, src: string) {
  const shaka = await import('shaka-player')
  const player = new shaka.Player()
  await player.attach(video)
  await player.load(src)
  return player
}
