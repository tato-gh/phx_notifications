console.log("service-worker loaded")

self.addEventListener("fetch", (e) => {})

// プッシュ処理
self.addEventListener('push', (e) => {
  const data = e.data.json()
  const title = data.title
  const options = {
    body : data.body,
    data: {
      link_to: data.link
    }
    // icon: data.icon,
  }
  e.waitUntil(self.registration.showNotification(title, options))
});

// 押下後処理
self.addEventListener('notificationclick', (e) => {
  console.log('clicked', e)
});
