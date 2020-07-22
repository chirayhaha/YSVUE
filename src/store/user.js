import { getLocalStorage,removeLocalStorage } from '@/utils/localStorage'

const user  = {
    namespaced: true,
    state : {
      username:'',
      token: '',
      userid:'',
      roleid:[],
      avatar:'',
    },
    getters : {
       // 传字符串参数 
      token: state => state.token,
      username: state => state.username,/*  */
      userid: state => state.userid,
      roleid: state => state.roleid,
      avatar: state => state.avatar,
    },
    mutations: {   
      SET_USERName: (state, username) => {
        state.username = username
      },
      SET_USERID: (state, userid) => {//将请求中res.data.user对象存入userid
        state.userid = userid
      },
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      SET_ROLEID:(state,roleid) =>{
        state.roleid = roleid
      },
      SET_AVATAR:(state,avatar) =>{
        state.avatar = avatar
      }
    }, 
    actions:{
        //登出
        LogOut() {
          return new Promise((resolve, reject) => {
            removeLocalStorage('Token')
            commit('user/SET_ROLEID', [])/* this.$store. */
            resolve()
          })
        },
  
        
    }
  }
  
  export default user;
  