import './db'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueIziToast from 'vue-izitoast'
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
