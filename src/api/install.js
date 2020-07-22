import apiList from './apiList'
//必须有install函数，插件才能用vueuse注册
const install = function(Vue){
    if(install.installed)//如果插件注册了
        return
    install.installed = true
    //添加、设置对象属性返回对象，方法挂载在vueproperty，然后通过this.xx调用
    Object.defineProperties(Vue.prototype,{
        $api:{//全局数据接口
            get(){
                return apiList
            },
            enumerable:false,//不可枚举
            configurable:false//不可重写
        }
    })
}

export default{
    install
}