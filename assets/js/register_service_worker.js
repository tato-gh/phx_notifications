/* eslint-disable no-console */

import { register } from 'register-service-worker'

// if (process.env.NODE_ENV === 'production') {
  register("/sw.js", {
    ready () {
      console.log('Service served by cache.')
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error durikg service worker registration:', error)
    }
  })
// }
