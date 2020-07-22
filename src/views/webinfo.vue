<template>
    <div class="webinfo">
        <div class="top">
            <back></back>
            <el-header><span>考试详情</span></el-header>
        </div>
        <div class="middle">
            <p class="testname">考试名称：{{infos.webname}}</p>
            <p class="testname">报名链接：<a @click="go(infos.weblink)">{{infos.weblink}}</a></p>
            <p class="testname">考试时间：{{infos.testtime}}</p>
            <p class="testname">考试简介：{{infos.testinfo}}</p>
        </div>
        
    </div>
</template>

<script>
import back from '../components/back.vue'
import { setLocalStorage,getLocalStorage } from '../utils/localStorage'

    export default {
        name:'webinfo',
        components:{back},
        data(){
            return{
                infos:'',
            }
        },
        methods:{
            getwebinfo(){  
                let name = this.$route.params.webname
                setLocalStorage('webname',name)
                let webname = getLocalStorage('webname')
                this.$api.user.getwebinfo(webname).then(res=>{
                    this.infos = res.data
                })
            },
            go(link){
                window.location.href= link    //在原标签页打开
            }
        },
        created(){
            this.getwebinfo()
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;position: relative;}
.el-header{
    font-size: 25px;
    text-align: center;
    padding: 12px;
    color: #151c81;
    font-weight: bolder;
    border-bottom: 0.1px solid rgb(238, 238, 238);
}
.middle{
    text-align: left;
    margin: 20px auto;
    font-size: 18px;
    width: 90%;
    /**超出范围自动换行 */ 
    word-wrap: break-word; 
    word-break: normal;
}
.middle p{
    margin-bottom: 30px;
}
a{
    text-decoration: underline;
    color: #151c81;
}
</style>