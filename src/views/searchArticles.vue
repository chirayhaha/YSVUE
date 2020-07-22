<template>
    <div class="searcharticles">
        <div><el-header>
            <back></back>
            <el-input placeholder="请输入内容" class="searchinput" v-model="info" learable>
            </el-input>
            <i @click="searcharticles" class="el-icon-search"></i>
        </el-header></div>
        <div class="middle">
            <div class="waterfall" v-cloak>
                        <ul class="item">
                            <li v-for="(res, index) in searchresults" :key="index">
                                <router-link :to="{path:'/sharedetail',query:{id:res.id}}"><div class="item_div">
                                    <img v-lazy="res.image" v-loading="true"  v-show="res.image">
                                    <span class="title">{{res.title}}</span>
                                    <p>{{ res.createtime | dateFormat}}</p>
                                </div></router-link>
                            </li>
                        </ul>
                    </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script>
import back from '../components/back'

    export default {
        name:'searcharticles',
        data(){
            return{
                searchresults:[],
                info:'',
                tip:false
            }
        },
        components:{back},
        methods:{
            searcharticles(){
                if(this.info==''){
                    let info = this.$route.query.info
                    this.$api.user.searcharticles(info).then(res=>{
                        if(res.data.length>0){
                            this.searchresults=res.data
                            this.tip=false
                        }
                        else{this.tip=true}
                    })
                }
                else{
                    this.$api.user.searcharticles(this.info).then(res=>{
                        if(res.data.length>0){
                            this.searchresults=res.data
                            this.tip=false
                        }
                        else{this.tip=true}
                    })
                }
                
                
            }
        },
        created(){
            this.searcharticles()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;position: relative;}
.searchinput{
    width: 75%;
    margin: 0 auto;
    position: relative;
    top: 8px;
}
.el-icon-search{
    font-size: 25px;
    position: relative;
    top: 10px;
    left: 5px;
}
a{
    text-decoration: none;
    color: black;
}

.time {
    font-size: 13px;
    color: #999;
}
.waterfall{
    width: 99%;
}
.item img{
    width:100%;
}
.item p{
    margin-top: 5px;
    padding: 0 8px;
    font-size: 0.75rem;
    color: #999;
}
.item {
    column-count:2;
    margin-top: 10px;
    margin-bottom: 80px;
}
.item li{
    list-style: none;
    margin-bottom: 10px;
    padding: 8px;
    background: #fff;
    border-radius: 2px;
    padding-bottom: 10px;
    box-shadow: 1px 3px 5px rgba(0,0,0,.1);
}
.item li .item_div{
    position: relative;
}
.title{
    word-wrap: break-word;
}
</style>