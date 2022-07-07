import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import 'postcss-pxtorem'
import MyIcon from '@/components/MyIcon.vue'
import '@/style/index.less'
import * as obj from '@/filters'
import FollowUser from '@/components/FollowUser.vue'
import '@/components'
// 全局注册组件
Vue.component(FollowUser.name, FollowUser)
// 全局注册路由器
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
