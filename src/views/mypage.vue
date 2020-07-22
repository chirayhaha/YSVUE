<template>
<!-- 个人页 -->
    <div class="mypage">
        <div class="userinfo">
            <back></back>
            <!-- {{userinfo}} -->
            <div><el-avatar :src="userinfo.avatar" fit="cover" :size="158"></el-avatar></div>
            <div>
                <span>{{userinfo.username}}</span>
                <i v-show="!fo" class="el-icon-circle-plus"  v-if="authorid != userid" @click="follow"></i>
                <i @click="unfollow" class="el-icon-success" v-show="fo"></i>
            </div>
        </div>
        <div class="items">
            <div>
                <ul v-for="(share,index) in shareinfo" :key="index">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item  :name='index'>
                            <template slot="title">
                                <p class="title">{{share.title.substring(0,20)}}</p>
                                <span class="time">{{share.createtime | dateFormat}}</span>
                                <div class="likes">
                                    <div v-if="share.likenum!=null && share.likenum.likenum != 0">
                                        <span class="iconfont icon-aixin"></span>
                                        <span>{{share.likenum.likenum}}</span>
                                    </div>
                                    <div v-else >
                                        <span class="iconfont icon-aixin1"></span>
                                    </div>
                                </div>
                                
                            </template>
                            <li>
                                <p>{{share.context}}</p>
                                <img class="image" :src="share.image">
                                <router-link :to="{path:'/sharedetail',query:{id:share.id}}">
                                    <span>更多详情<i class="el-icon-right"></i></span>
                                </router-link>
                            </li>
                        </el-collapse-item>
                    </el-collapse>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import back from '../components/back'
import { getLocalStorage } from '../utils/localStorage'
    export default {
        name:'mypage',
        data(){
            return{
                userinfo:[],
                shareinfo:[],
                activeNames: ['1'],
                fo:false,
                authorid:'',
                userid:'',
                followinfos:{followid:'',userid:''}
            }
        },
        components:{back},
        methods:{
            handleChange(val) {
            },
            getuserinfo(){
                let userid = this.$route.query.userid
                this.$api.user.getuserinfo(userid).then(res=>{
                    this.userinfo = res.data
                    this.isFollow()
                })
            },
            getmyshare(){
                let userid = this.$route.query.userid
                this.$api.user.getmyshare(userid).then(res=>{
                    this.shareinfo = res.data
                })

            },
            follow(){
                this.followinfos.userid = this.userid
                this.followinfos.followid = this.userinfo.userid
                this.$api.user.follow(this.followinfos).then(res=>{
                    if(res.code == 1){
                        this.fo = true
                        this.$message('关注成功')
                    }
                    else{
                        this.$message('关注失败')
                    }
                })
            },
            unfollow(){
                this.followinfos.userid = this.userid
                this.followinfos.followid = this.userinfo.userid
                this.$api.user.unfollow(this.followinfos).then(res=>{
                    if(res.code == 1){
                        this.fo = false
                        this.$message('已取消关注')
                    }
                    else{
                        this.$message('取消失败')
                    }
                })
            },
            isFollow(){
                this.followinfos.userid = this.userid
                this.followinfos.followid = this.userinfo.userid
                this.$api.user.isfollow(this.followinfos).then(res=>{
                    if(res.code == 1){
                        this.fo = true
                    }
                    else{
                        this.fo = false
                    }
                })
            },
        },
        created(){
            this.userid = JSON.parse(getLocalStorage('userid'))
            this.authorid = this.$route.query.userid
            this.getuserinfo()
            this.getmyshare()
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;position: relative;overflow-x: hidden;}
.mypage{width: 90%;margin: 0 auto;}
.userinfo{margin-top: 10px;}
.items{overflow: hidden;margin-top: 20px;}
.image{width: 200px;}
.title{font-size: 15px;}
.time{
    font-size: 10px;
    color: darkgray;
    margin-left: 5px;
}
.likes{margin-left: 20px;color:rgb(255, 20, 90)}
li{
    text-align: left;
}
a{
    text-decoration: none;
    color: darkgoldenrod;
    margin-left: 20px;
}
.el-icon-circle-plus{
    color: rgb(255, 217, 0);
    font-size: 15px;
    background: #fff;
    border-radius: 50%;
    font-size: 18px;
    vertical-align: middle!important;
}
.el-icon-success{
    color: rgb(255, 217, 0);
    font-size: 18px;
    vertical-align: middle!important;
    background: #fff;
    border-radius: 50%;
}
</style>