import { getLocalStorage } from '@/utils/localStorage'
/* import { Message.success } from 'mint-ui'; */
import { Message } from 'element-ui';
import axios from 'axios'

//创建axios实例
let service = axios.create({
  timeout:60000
})
//设置post、put默认content-type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

//添加请求拦截器 work
service.interceptors.request.use(
  (config) =>{
    //LocalStorage中获取token后设置请求头
    config.headers.common['Authorization'] = getLocalStorage('Token')
    return config
  },
  (error) =>{
    //请求错误处理
    Message.success({message:'请求超时!'})
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
    data =>{
      if(data.status && data.status == 200 && data.data.status == 'error'){
        Message.success({message:data.data.msg});
        return
      }
      return data;
    },
    err => {
      //错误处理
      if(err && err.response){
        switch(err.response.status){
          case 400: err.message = '请求错误(400)';break;
          case 401: err.message = '登录过期，请重新登录';ctx.rediect('/login');break;
          case 403: err.message = '拒绝访问(403)';break;
          case 404: err.message = '请求出错(404)';break;
          case 408: err.message = '请求超时(408)';break;
          case 500: err.message = '服务器错误(500)';break;
          case 501: err.message = '服务未实现(501)';break;
          case 502: err.message = '网络错误(502)';break;
          case 503: err.message = '服务不可用(503)';break;
          case 504: err.message = '网络超时(504)';break;
          case 505: err.message = 'HTTP版本不受支持(505)';break;
          default: err.message = `连接出错(${err.response.status})!`;
        }
      }
      else{
        err.message = '连接服务器失败!'
      }
      Message.success({message: err.message})
      return Promise.reject(err);
    }
) 


export default function() {	
  return service
}