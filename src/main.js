// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import Api from '@/assets/axios.js'
import Axios from 'axios'
import '@/assets/index.css'
import 'swiper/dist/css/swiper.css';
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.prototype.$axios=Api;
Vue.prototype.axios=Axios;
Vue.prototype.oUrl='http://39.104.140.40/ppp'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
