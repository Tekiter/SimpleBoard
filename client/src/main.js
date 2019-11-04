import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios"
import BootstrapVue from "bootstrap-vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import session from "@/utils/session.js"

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.prototype.$http = axios
axios.defaults.baseURL = session.apiURL


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
