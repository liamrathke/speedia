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

// https://vuejs.org/v2/guide/components-registration.html
// Register all default components inside the base folder for automatic import
const requireComponent = require.context('./components/base', false, /Base[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  Vue.component(componentName, componentConfig.default || componentConfig)
})

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
