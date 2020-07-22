import router from './router'
import store from './store'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage' // 验权(从localstorage中获取)


import api from './api/apiList'
import { Message } from 'element-ui'
import {hasPermission} from './store/permission'

const whiteList = ['/login', '/register', '/', '/findpassword' , '/index','/tests']
router.beforeEach((to, from, next) => {  //全局前置守卫，导航切换触发时守卫按顺序调用
  //NProgress.start()
  // 点击登录时，拿到了token并存入了localstorage,保证页面刷新时,始终可以拿到token
  if (getLocalStorage('Token')) {
    if (to.path === '/login') {
      next({ path: '/' })
      //NProgress.done()
    }
    else {
      api.user.userinfo().then(res => {
        if (res.data) {
          let user = res.data.user;
          let roleid = res.data.user.roleid
          let avatar = res.data.user.avatar
          store.commit("user/SET_USERName", user.username) //同步
          store.commit("user/SET_USERID", user.userid)
          store.commit("user/SET_ROLEID", roleid)
          store.commit("user/SET_AVATAR",avatar)
          setLocalStorage("userid", JSON.stringify(user.userid))
        } 
      }).catch((err) => {
        console.log(err)
        store.dispatch('user/LogOut').then(() => { //异步调用
          next({ path: '/' })
        })
      })
              
      if(store.getters['user/roleid'].length === 0){
        store.dispatch('permission/getRoles').then(res=>{
          let roleid = res
          store.commit('user/SET_ROLEID',roleid)
          if(hasPermission(roleid,to)){
              store.dispatch('permission/createRouter', roleid).then(res=>{
                let addRouters = store.getters['permission/addRouters']
                let allRouters = store.getters['permission/allRouters']
                //路由更新
                router.options.routes = allRouters
                //添加动态路由
                router.addRoutes(addRouters)
                /* next({...to,replace:true}) */
                next({...to})
              })
          }
          else{
            console.log('nothas')
            next({path:'/401',replace:true})
          }
          
        }).catch((err)=>{
          store.dispatch('user/LogOut').then(()=>{
            next({ path: '/' })
          })
        })
      }
      else{
        next()
      }
    }

  }
  else {
    if (whiteList.indexOf(to.path) !== -1) { //whitelist中存在的页面
      // 点击退出时,会定位到这里
      next()
    } else {
      Message.success('请登录')
      next('/login')
      //NProgress.done()
    }
  }

})

router.afterEach(() => {
  //NProgress.done() // 结束Progress
})

