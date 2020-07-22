<template>
    <div class="bottom">
        <a href="javascript:;" v-for="(tab,index) in tabs" :key="index" class="tab"
         :class="{active:index == num}" @click="addClassName(index)">
            <router-link :to="tab.url">
                <div class="pho"><img v-if="num!=index" :src="tab.img">
                <img  v-if="num==index" :src="tab.active"></div>
            </router-link>
        </a>
    </div>
</template>

<script>
    export default {
        name:'bottom',
        props:['tabnum'],
        data(){
            return{
                num:0,
                tabs:[
                    {url:'/',img:require('../assets/home.png'),active:require('../assets/home2.png')},
                    {url:'/forum',img:require('../assets/luntan.png'),active:require('../assets/luntan2.png')},
                    {url:'/share',img:require('../assets/share.png'),active:require('../assets/share2.png')},
                    {url:'/my',img:require('../assets/my.png'),active:require('../assets/my2.png')},
                ]
            }
        },
        methods:{
            addClassName(index) {
                this.num = index;
            },
        },
        mounted(){
            this.num = this.tabnum
        }
    }
</script>

<style scoped>
    .bottom{
        border-top: 0.1px solid #ffe9ba;
        color: #333;
        position: fixed;
        background-color: white;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .tab{
        width: 100%;
    }
    .tab img{
        height: 55px;
        margin: 7px auto;
    }
    .pho{
        width: 25%;
        float: left;
    }
</style>