const NotificationWithoutSW = {
  mounted() {
    this.handleEvent("send", payload => {
      console.log(payload)

      if(!("Notification" in window)) { return }

      const permission = Notification.permission
      console.log(`permission: ${permission}`)
      // 怒られるので抜ける
      if(permission == "denied") { return }

      Notification
        .requestPermission()
        .then(function() {
          console.log(`ok please wait: ${payload.waiting_sec} sec`)
          setTimeout(() => {
            new Notification(payload.message)
          }, payload.waiting_sec * 1000)
        })
    })
  }
}

export default NotificationWithoutSW
