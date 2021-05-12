import Vue from 'vue'
import Vuex from 'vuex'

import lists from './modules/lists'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    lists,
    auth
  }
})