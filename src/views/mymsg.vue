<template>
    <div>
        <el-header><back></back></el-header>
        <div class="msgs">
            <el-tabs :stretch=true>
                <el-tab-pane>
                    <template slot="label">
                        <span>评论</span>
                    </template>
                    <div v-for="(com,index) in mycomments" :key="index" class="res">
                        <div class="responser">
                            <router-link :to="{name:'mypage',query:{userid:com.userid}}">
                                <el-avatar :src="com.user.avatar" :size="45"></el-avatar>
                                <p>{{com.user.username}}</p>
                            </router-link>
                        </div>
                        <div class="huifu">
                            <span>回复&nbsp;<span style="color:grey">我</span>&nbsp;：</span>
                            <p class="context">{{com.context}}</p>
                        </div>
                        <router-link :to="{name:'sharedetail',query:{id:com.articleid}}">
                            <span class="detail">详情<i class="el-icon-caret-right"></i>
                            </span></router-link>
                    </div>
                </el-tab-pane>
                <el-tab-pane>
                    <template slot="label">
                        <span>私信</span>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-backtop :bottom="100"><span class="iconfont icon-huojian"></span>
        </el-backtop>
    </div>
</template>

<script>
import back from '../components/back'
import { getLocalStorage } from '../utils/localStorage'

    export default {
        name:'mymsg',
        components:{back},
        data(){
            return{
                mycomments:[]
            }
        },
        methods:{
            getmycomments(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getmycomments(userid).then(res=>{
                    this.mycomments = res.data
                })
            }
        },
        created(){
            this.getmycomments()
        },
    }
</script>

<style scoped>
*{padding: 0;margin: 0;}
.msgs{
    text-align: left;
    width: 95%;
    margin: 0 auto;
}
.res{
    border-bottom:  3px dotted rgb(139, 121, 70);
    padding: 8px;
    display: flex;
    flex-direction: row;
}
.responser{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: rgb(245, 241, 207);
    text-align: center;
    margin-left: 5px;
    flex: 4;
}
.responser p{
    font-size: 13px;
    background-color: #fff;
    color: rgb(184, 172, 8);
}
.huifu{
    margin-left: 20px;
    margin-top: 8px;
    flex: 16;
    display: flex;
    flex-direction: column;
    font-size: 15px;
}
.context{
    margin-top: 10px;
    font-size: 18px;
}
.detail{
    position: absolute;
    right: 20px;
    flex: 4;
    color: darkkhaki;
    font-size: 13px;
}
a{
    text-decoration: none;
    color: black;
}
.el-backtop{border:5px solid #ffcb57;}
.icon-huojian{font-size: 30px;}
</style>