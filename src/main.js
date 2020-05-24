// import './db'
import Vue from 'vue'
import App from './App.vue'
import store from './store'

// const VueIziToast = () => import('vue-izitoast')
import VueIziToast from 'vue-izitoast'

import './registerServiceWorker'
// import 'izitoast/dist/css/iziToast.css'
const rtdbPlugin = ({ rtdbPlugin }) => import('vuefire')

const options = {
  position: 'topRight'
}

Vue.use(rtdbPlugin)
Vue.use(VueIziToast, options)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
