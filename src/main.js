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
import global_ from '@/components/global'
import * as fetch_ from '@/assets/fetch'

import vueAccordion from 'vue-accordion'


import * as util_ from '@/assets/util'


// 
// import {vueAccordion} from 'accordion'

Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.prototype.$axios=Api;
Vue.prototype.axios=Axios;

Vue.prototype.GLOBAL = global_;
//Vue.prototype.oUrl='http://localhost:8080/ppp'

Vue.prototype.fetch = fetch_;
Vue.prototype.util = util_;

Vue.component('vue-accordion', vueAccordion)


// Vue.prototype.oUrl='https://39.104.140.40/ppp'


 Vue.prototype.oUrl='http://localhost:8080/ppp' 

 //Vue.prototype.oUrl='http://39.104.104.150:8080/ppp'
 //Vue.prototype.oUrl='http://192.168.3.88:8080/ppp' 

 // Vue.prototype.oUrl='https://pengpengpiao.com/ppp' 




/* eslint-disable no-new */

export default new Vue({
  el: '#app',
  router,
  components: { 
    App
   },
  template: '<App/>'
})

