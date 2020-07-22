<template>
    <div class="searchtest">
        <div><el-header>
            <back></back>
            <el-input placeholder="请输入内容" class="searchinput" v-model="info" learable>
            </el-input>
            <i @click="searchtest" class="el-icon-search"></i>
        </el-header></div>
        <div class="middle">
            <div class="results">
                <span v-if="!tip">共有{{searchresults.length}}条相关信息</span>
                <el-row>
                    <el-col :span="12" v-for="(res, index) in searchresults" :key="index">
                        <router-link :to="{name:'webinfo',params:{webname:res.webname}}"><el-card v-if="!tip">
                            <span>{{res.webname}}</span>
                        </el-card></router-link>
                    </el-col>
                    <el-col>
                        <span v-if="tip">暂无相关消息呢</span>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import back from '../components/back'

    export default {
        name:'searchtest',
        data(){
            return{
                searchresults:[],
                info:'',
                tip:false
            }
        },
        components:{back},
        methods:{
            searchtest(){
                if(this.info==''){
                    let info = this.$route.query.info
                    this.$api.user.searchtest(info).then(res=>{
                        if(res.data.length>0){
                            this.searchresults=res.data
                            this.tip=false
                        }
                        else{this.tip=true}
                    })
                }
                else{
                    this.$api.user.searchtest(this.info).then(res=>{
                        if(res.data.length>0){
                            this.searchresults=res.data
                            this.tip=false
                        }
                        else{this.tip=true}
                    })
                }
                
                
            },
        },
        created(){
            this.searchtest()
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
.results{
    text-align: left;
}
.el-card{
    margin-top: 8px;
    text-align:center
}
</style>