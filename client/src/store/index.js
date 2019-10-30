import Vue from 'vue'
import Vuex from 'vuex'

import sessionModule from "./session"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    session: sessionModule
  }
})
