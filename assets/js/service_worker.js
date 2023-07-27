console.log("service-worker loaded")

self.addEventListener("fetch", (e) => {})

// プッシュ処理
self.addEventListener('push', (e) => {
  const data = e.data.json()
  const title = data.title
  const options = {
    body : data.body,
    icon: data.icon,
    data: {
      link_to: data.link
    }
  }
  e.waitUntil(self.registration.showNotification(title, options))
});
