import {getSubscription, createSubscription} from "./../subscription.js"

const NotificationWithSW = {
  mounted() {
    this.handleEvent("send", async payload => {
      console.log(payload)

      // サブスクリプション有無と通知許可依頼
      const subscription = await getSubscription()
      if (!subscription) {
        const permission = await Notification.requestPermission()
        if (permission === 'denied') {
          return alert('処理を中止します。この処理の実行には通知を許可していただく必要があります');
        } else {
          await createSubscription().then(subscription => {
            // 通知情報自体はここでsubscriptionを参照して取得可能
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
