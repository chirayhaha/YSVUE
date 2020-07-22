import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import VueLazyload from 'vue-lazyload'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'//自定义图标
Vue.use(ElementUI);

import api from './api/install' //调用插件
Vue.use(api)

Vue.use(VueLazyload, {
     loading: require('./assets/loadding.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
     error: require('./assets/error.png')  //加载失败图片
});

import axios from 'axios'
Vue.prototype.$ajax= axios

import '@/permission'
Vue.config.productionTip = false

Vue.filter('dateFormat',function(dateStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(pattern)
})

//创建和挂载根实例。通过 router 配置参数注入路由，从而让整个应用都有路由功能
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上
new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app')
//render: h => h(App)表示 Vue 实例选项对象的 render 方法作为一个函数，接受传入的参数 h 函数，返回 h(App) 的函数调用结果。
//render函数是渲染一个视图，然后提供给el挂载，如果你没有加那么就等于没有视图给el挂载，就不会有任何显示。
