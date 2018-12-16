import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://' + window.location.hostname + ':8079',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  sockets: {
    connect: function() {
      this.$router.push('')
    }
  },
  render: h => h(App)
}).$mount('#app')
