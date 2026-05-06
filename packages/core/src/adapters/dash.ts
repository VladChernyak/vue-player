export async function createDashAdapter(video: HTMLVideoElement, src: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaka = (await import('shaka-player')) as any
  const player = new shaka.Player()
  await player.attach(video)
  await player.load(src)
  return player
}
