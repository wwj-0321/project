import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import './plugins/element'
import './assets/fonts/iconfont.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
 
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  config.headers.Authorization=window.sessionStorage.getItem('token')  
  // console.log(config)
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
// Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
