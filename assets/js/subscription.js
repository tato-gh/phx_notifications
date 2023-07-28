const publicKey = process.env.PUSH_PUBLIC_KEY

export async function getSubscription() {
  const registration = await navigator.serviceWorker.ready
  return await registration.pushManager.getSubscription()
}

export async function createSubscription() {
  const registration = await navigator.serviceWorker.ready
  return await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicKey
  })
}
