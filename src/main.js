// import './db'
import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './registerServiceWorker'
import router from './router'
import VueIziToast from 'vue-izitoast'
import VueSocialSharing from 'vue-social-sharing'
const rtdbPlugin = ({ rtdbPlugin }) => import('vuefire')

const options = {
  position: 'topRight'
}

Vue.use(rtdbPlugin)
Vue.use(VueIziToast, options)
Vue.use(VueSocialSharing)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
