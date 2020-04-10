import './db'
import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'
import App from './App.vue'
import store from './store'

Vue.use(rtdbPlugin)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
