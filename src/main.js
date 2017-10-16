// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'

import "./common/stylus/index.styl"

//导入mock
import Mock from './mock'
Mock.bootstrap();

Vue.config.productionTip = false

//将axios改写成Vue的原型属性
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
