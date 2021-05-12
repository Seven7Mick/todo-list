import Vue from 'vue'
import router from './router/router.js'
import store from './store/state.js'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
