<template>
    <div class="login" :style="{height:height+'px'}" v-bind:pheight="height">
        <transition name="el-zoom-in-center">
            <div v-show="show" class="transition-box">
                <i class="el-icon-close" v-show="show" @click="show = !show"></i>
                <loginform></loginform>
            </div>
        </transition>
        <div>
            <span class="title" :style="{height:height/2+'px'}" v-show="!show">
            艺升</span>
        </div>
        <div>
            <el-button class="lbtn" v-show="!show" @click="showlogin">登录</el-button>
            <br>
            <router-link to="/register"><el-button class="rbtn" v-show="!show">注册</el-button></router-link>
        </div>
    </div>
</template>

<script>
import loginform from '../components/loginform'

    export default {
        name:'login',
        data(){
            return{
                height:'',
                show:false,
                show2:false,
            }
        },
        components:{loginform},
        methods:{
            setHeight(){
                let height = screen.height
                this.height = height
            },
            showlogin(){
                this.show2 = this.show
                this.show = !this.show
            },

        },
        mounted(){
            this.setHeight()
        }
    }
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family: '宋体';
    position: relative;
}
.login{
    background: url('~@/assets/indexbg.jpg');
    background-position: left top;
    background-repeat: no-repeat;
    background-size: cover;
}
.title{
    writing-mode: vertical-lr;/*文字从左向右*/    
    writing-mode: tb-lr;
    margin: 0 auto;
    font-size: 70px;
    color: rgb(255, 238, 0);
    letter-spacing: 35px;
}
.transition-box {
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.7);
    color: rgb(144, 146, 15);
}
.el-icon-close{
    position: absolute;
    left: 5px;
    top: 5px;
    font-size: 30px;
    z-index: 1;
}
.lbtn{
    width: 250px;
    height: 50px;
    font-size: 25px;
    margin-bottom: 30px;
    font-weight: bolder;
    background-color: rgba(255,255,255,0.8);
}
.rbtn{
    width: 250px;
    height: 50px;
    font-size: 25px;
    margin-bottom: 30px;
    font-weight: bolder;
    background-color: rgba(255,255,255,0.8);
}
</style>