import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user'
import permission from './permission'

export default new Vuex.Store({
  modules: {
    user:user,
    permission:permission
  }
})
