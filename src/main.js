import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import './plugins/element'

import './assets/fonts/iconfont.css'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
// import TreeTable from 'vue-table-with-tree-grid'
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 拦截器
axios.interceptors.request.use(config => {

  // config.headers.Authorization = window.sessionStorage.getItem('token')给请求头添加一个令牌
  //最开始是请求过来token 所以登录请求其实是没有token的 直接为空 后面返回的数据中含有token 就将其存储在
  // sessionStorage（会话级）中 这样是为了让有些api组件不能直接被访问到
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios
// Vue.component('tree-table','TreeTable')
Vue.component('tree-table', TreeTable)
Vue.config.productionTip = false
// Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
