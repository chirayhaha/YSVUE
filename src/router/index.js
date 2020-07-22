import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import login from '../views/login'
import register from '../views/register'
import forum from '../views/forum'
import my from '../views/my'
import share from '../views/share'
import webinfo from '../views/webinfo'
import userinfo from '../views/userinfo'
import settings from '../views/settings'
import findPassword from '../views/findPassword'
import myshare from '../views/myshare'
import sharedetail from '../views/sharedetail'
import searchtest from '../views/searchTest'
import searcharticles from '../views/searchArticles'
import reward from '../views/reward'
import mylikes from '../views/myLikes'
import updatepassword from '../components/updatePassword'
import mypage from '../views/mypage'
import tests from '../views/tests'
import editarticle from '../views/editaricle'
import myfollow from '../views/myfollow'
import mymsg from '../views/mymsg'

Vue.use(VueRouter)

export const defalutRoutersMap = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path:'/findpassword',
    name:'findpassword',
    component:findPassword
  },
  {
    path:'/tests',
    name:'tests',
    component:tests
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:defalutRoutersMap
})

export const asyncRoutersMap= [
  {
    path: '/forum',
    name: 'forum',
    component: forum,
    meta:{roleid:['1']}
  },
  {
    path: '/my',
    name: 'my',
    component: my,
    meta:{roleid:['1']}
  },
  {
    path: '/share',
    name: 'share',
    component: share,
    meta:{roleid:['1']}
  },
  {
    path:'/webinfo',
    name:'webinfo',
    component:webinfo,
    meta:{roleid:['1']}
  },
  {
    path:'/userinfo',
    name:'userinfo',
    component:userinfo,
    meta:{roleid:['1']}
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings,
    meta:{roleid:['1']}
  },
  {
    path:'/myshare',
    name:'myshare',
    component:myshare,
    meta:{roleid:['1']}
  },
  {
    path:'/sharedetail',
    name:'sharedetail',
    component:sharedetail,
    meta:{roleid:['1']}
  },
  {
    path:'/searchtest',
    name:'searchtest',
    component:searchtest,
    meta:{roleid:['1']}
  },
  {
    path:'/searcharticles',
    name:'searcharticles',
    component:searcharticles,
    meta:{roleid:['1']}
  },
  {
    path:'/reward',
    name:'reward',
    component:reward,
    meta:{roleid:['1']}
  },
  {
    path:'/mylikes',
    name:'mylikes',
    component:mylikes,
    meta:{roleid:['1']}
  },
  {
    path:'/mypage',
    name:'mypage',
    component:mypage,
    meta:{roleid:['1']}
  },
  {
    path:'/editarticle',
    name:'editarticle',
    component:editarticle,
    meta:{roleid:['1']}
  },
  {
    path:'/myfollow',
    name:'myfollow',
    component:myfollow,
    meta:{roleid:['1']}
  },{
    path:'/mymsg',
    name:'mymsg',
    component:mymsg,
    meta:{roleid:['1']}
  }
]

