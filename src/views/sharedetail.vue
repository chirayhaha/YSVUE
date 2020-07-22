<template>
    <div class="sharedetail" :style="{height:height+'px'}">
        <div>
            <el-header>
                <back></back>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" trigger="click">
                        <p @click="delArticle" v-if="userid == details.userid">删除分享</p>
                        <p>未完待续</p>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
        </div>
        <el-main>
            <div class="userinfo">
                <div class="title">{{details.title}}</div>
                <div class="infos">
                    <div class="avatar">
                        <el-avatar :src="userinfo.avatar" fit="cover" :size="28" ></el-avatar>
                        <i v-show="!fo" class="el-icon-circle-plus"  v-if="userinfo.userid && userinfo.userid != userid" @click="follow"></i>
                        <i @click="unfollow" class="el-icon-success" v-show="fo"></i>
                    </div>
                    <div class="username">
                        <router-link :to="{name:'mypage',query:{userid:userinfo.userid}}" v-if="userinfo.userid != userid">
                            <span>{{userinfo.username}}</span></router-link>
                        <router-link :to="{name:'myshare'}" v-else><span>{{userinfo.username}}</span></router-link>
                        <span v-if="userinfo.roleid == 0" class="iconfont icon-vip" style="font-size:18px;color:gold"></span>
                        <div class="time" v-if="details.createtime">{{details.createtime | dateFormat}}</div>
                    </div>
                </div>
                
                
            </div>
            <div class="article">
                <div class="context">{{details.context}}</div>
                <div><img :src="details.image" style="width:100%"></div>
            </div>
        </el-main>

        <comments :artid="articleid"></comments>

        <el-backtop target=".sharedetail" :bottom="100"><span class="iconfont icon-huojian"></span>
        </el-backtop>
    </div>
</template>

<script>
import back from '../components/back'
import { getNowFormatDate } from '../utils/FormatDate'
import { getLocalStorage } from '../utils/localStorage'
import { Picker } from "emoji-mart-vue";
import comments from '../components/comments'

    export default {
        name:'sharedetail',
        data(){
            return{
                articleid:'',
                details:[],
                userinfo:[],
                height:'',
                width:"",
                userid:'',
                followinfos:{followid:'',userid:'',followname:''},
                fo:false
            }
        },
        filters:{getNowFormatDate},
        components:{back,Picker,comments},
        inject:['reload'],  //注入reload方法
        methods:{
            getsharedetail(){
                let id = this.$route.query
                this.$api.user.getsharedetail(id).then(res=>{
                    this.details = res.data
                    this.getuserinfo()
                })
            },
            getuserinfo(){
                let userid = JSON.parse(this.details.userid)
                this.$api.user.getuserinfo(userid).then(res=>{
                    this.userinfo = res.data
                    
                    this.isFollow()
                })
            },
            delArticle(){
                const h = this.$createElement;
                this.$msgbox( {
                    title:'提示',
                    message:h('p', null, [
                        h('span', null, '是否确认永久删除该分享'),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if(action === 'confirm'){
                            this.$api.user.delarticle(this.$route.query.id).then(res=>{
                                if(res.code==1){
                                    done()
                                    this.$router.push('/forum')
                                }
                            })
                        }
                        else{
                            done()
                        }
                    }
                    }).then(async() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration:500
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                            duration:500
                        }
                    );          
                });
            },
            follow(){
                this.followinfos.userid = this.userid
                this.followinfos.followid = this.userinfo.userid
                this.followinfos.followname = this.userinfo.username
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
        created() {
            this.getsharedetail()

            this.articleid = this.$route.query.id
            let height = screen.height
            this.height = height
            
            let width = screen.width
            this.width = width

            this.userid = JSON.parse(getLocalStorage('userid'))
        },
    }
</script>

<style scoped>
*{margin: 0;padding: 0;position: relative;text-align: left;overflow-x: hidden;}
.sharedetail{background-color: rgb(255, 255, 245);overflow: scroll;}
.el-backtop{border:5px solid #ffcb57;}
.icon-huojian{font-size: 30px;}
.userinfo{
    width: 100%;
    background-color: white;
    padding: 7px;
}
.el-header{background-color: white;margin-bottom: 7px;}
.el-main{padding: 0;margin: 0 auto;overflow-x: hidden;}


.time{
    /* position: absolute;
    top: 0px;
    left: 40px; */
    font-size: 9px;
    color: grey;
}
.article{
    /* margin-top: 7px; */
    padding: 15px;
    background-color: white;
}
.title{
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    font-family: '华文楷体';
    margin-bottom: 15px;
    margin-top: 15px;
    line-height: 30px;
    height: 100%;
    word-wrap: break-word;
}
.infos{
    height: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
}
.avatar{flex: 2;}
.username{
    /* position: absolute;
    left: 40px;
    top: 65px; */
    font-family: '楷体';
    font-weight: bold;
    font-size: 14px;
    color: rgb(201, 183, 27);
    flex:22;
}
.context{
    width: 100%;
    margin-bottom: 30px;
}

.el-icon-more{
    font-size: 25px;
    color: #ffcb57;
}
.el-dropdown{
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 0;
}
.el-icon-circle-plus{
    position: absolute;
    left: 15px;
    top: 15px;
    color: rgb(255, 217, 0);
    font-size: 15px;
    background: #fff;
    border-radius: 50%;
}
.el-icon-success{
    position: absolute;
    left: 15px;
    top: 15px;
    color: rgb(255, 217, 0);
    font-size: 15px;
    background: #fff;
    border-radius: 50%;
}
a{text-decoration: none;color: rgb(201, 183, 27);}
</style>