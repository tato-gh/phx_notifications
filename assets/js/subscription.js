const publicKey = process.env.PUSH_PUBLIC_KEY

// /**
//  * see https://qiita.com/megadreams14/items/2f4221c3cc2a39663d7d
//  * npm web-push パッケージ サイトを参考
//  *    https://www.npmjs.com/package/web-push
//  *
//  */
// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
//
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

export async function getSubscription() {
  // 手元Edgeで動かない...
  const registration = await navigator.serviceWorker.ready
  return await registration.pushManager.getSubscription()
}

export async function createSubscription() {
  const registration = await navigator.serviceWorker.ready
  return await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicKey
    // applicationServerKey: urlBase64ToUint8Array(publicKey)
  })
}
