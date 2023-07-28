import {getSubscription, createSubscription} from "./../subscription.js"

const NotificationWithSW = {
  mounted() {
    this.handleEvent("send", async payload => {
      console.log(payload)

      const subscription = await getSubscription()
      if (!subscription) {
        const permission = await Notification.requestPermission()
        if (permission === 'denied') {
          return alert('処理を中止します。この処理の実行には通知を許可していただく必要があります');
        } else {
          await createSubscription().then(subscription => {
            // 通知情報自体はここでsubscriptionを参照して取得可能
            // NOTE:
            // ここで取得した場合に、例えばサーバ側の公開鍵を変えた際に（再取得が必要だが）、すでに通知を許可しているユーザーに対して実行されずに、エラーが出続ける
          })
        }
      }

      // ここでは（デモのため）改めてsubscription情報をサーバに渡して通知を作成している
      getSubscription().then(subscription => {
        this.pushEvent("send_from_server", {
          message: payload.message,
          waiting_sec: payload.waiting_sec,
          subscription: subscription.toJSON()
        })
      })
    })
  }
}

export default NotificationWithSW
