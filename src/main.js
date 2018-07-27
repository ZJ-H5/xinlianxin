import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueBus from '@/common/js/vuebus'
// 解决300毫秒延迟
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import { AlertPlugin, ToastPlugin, Toast, LoadingPlugin, Loading } from 'vux'
import 'api/validate'

import 'assets/css/iconfont.css'
import 'common/stylus/index.styl'
import 'assets/css/global.css'
import 'lib-flexible/flexible'
import 'assets/css/app.css'
Vue.prototype.$http = axios
Vue.use(AlertPlugin, Toast, Loading)
Vue.use(ToastPlugin, {position: 'middle'})
Vue.use(LoadingPlugin, {tepositionxt: 'absolute'})
Vue.use(VueLazyLoad, {
  loading: require('common/image/defaultkf.jpg')
})
Vue.use(VueBus)
fastclick.attach(document.body)
Vue.config.productionTip = false
// 使用touch事件
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
// Vue.prototype.$axios = axios
// axios 不支持Vue.use(axios)

let bus = new Vue()
Vue.prototype.bus = bus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
