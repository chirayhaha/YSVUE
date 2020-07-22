<template>
    <div>
        <el-footer>
            <div class="bottom" :style="{width:width+'px'}">
                <div class="share"><i class="el-icon-share"></i></div>
                <!-- 评论图标 -->
                <div class="pl" @click="show = !show"><i class="el-icon-chat-dot-round"></i></div>
                <div class="image" @click="likes()">
                    <span v-if="liked==0" class="iconfont icon-aixin1"></span>
                    <span v-if="liked==1" class="iconfont icon-aixin"></span>
                    <span v-if="artid.likenum&&artid.likenum.likenum!=0">{{artid.likenum.likenum}}</span>
                    <span v-if="!artid.likenum&&this.liked==1">{{1}}</span>
                </div>
            </div>
        </el-footer>

        <div>
            <span class="comtitle">评论</span>
            <span class="comnum">共{{allcomments.length}}条</span>
        </div>
        <div class="comments" v-for="(com,id) in allcomments" :key="id">
            <ul>
                <li v-show="tip!=null">{{tip}}</li>
                <li @click="con(com)">
                    <div v-if="!com.authorid" class="com">
                        <div class="comavatar">
                            <el-avatar :src="com.user.avatar" :size="25"></el-avatar>
                            <router-link v-if="com.userid == userid" to="/myshare"><span class="comname">{{com.user.username}}</span></router-link>
                            <router-link v-else :to="{name:'mypage',query:{userid:com.userid}}"><span class="comname">{{com.user.username}}</span></router-link><span>{{com.time | dateFormat}}</span>
                        </div>
                        <div class="comcontext">{{com.context}}</div>
                    </div>
                </li>
                    <div class="del" v-if="userid==com.userid"><button @click="delcomment(com.id)">删除</button></div>
                <transition name="el-zoom-in-bottom">
                    <div v-show="respone" class="transition-box">
                        <i @click="respone = false" class="el-icon-close"></i>
                        <div>
                            <el-input class="textarea" v-model="rescominfo.context" type="textarea" :rows="5"></el-input>
                            <div>
                                <span @click="emo = !emo"  class="iconfont icon-emoji"></span>
                                <el-button @click="comothers()" id="resbtn">回复评论</el-button>
                                <div v-show="emo"><picker :include="['people']" :showSearch="false" 
                                :showCategories="false" :showPreview="false" @select="addEmoji2"/></div>
                            </div>
                        </div>
                    </div>
                </transition>
            </ul>

            <ul>
                <div v-for="(res,index) in resinfos" :key="index">
                    <li v-if="resinfos.length!=0 && com.id == res.commentid"
                     @click="con2(res)" class="res">
                        <div class="resavatar">
                            <el-avatar :src="res.user.avatar" :size="25"></el-avatar>
                            <router-link v-if="res.user.userid == userid" to="/myshare">
                            <span class="resname">{{res.user.username}}</span></router-link>
                            <router-link v-else :to="{name:'mypage',query:{userid:res.userid}}">
                                <span class="resname">{{res.user.username}}</span></router-link>

                            <span class="restime">{{res.time | dateFormat}}</span>
                        </div>
                        <span class="@">回复</span>
                        <router-link to="/myshare" v-if="res.authorid == userid">
                            <span style="color:#ffcb57;margin:0px 5px">{{res.authorname}}</span></router-link>
                        <router-link :to="{name:'mypage',query:{userid:com.user.userid}}" v-else>
                            <span style="color:#ffcb57;margin:0px 5px">{{res.authorname}}</span></router-link>
                        <span>：&nbsp;</span>
                        <span class="rescontext">{{res.context}}</span>
                        <div class="del" v-if="userid==res.userid"><button @click="delresponse(res.id)">删除</button></div>
                    </li>

                    <transition name="el-zoom-in-bottom">
                        <div v-show="resres" class="transition-box">
                            <i @click="resres = false" class="el-icon-close"></i>
                            <div>
                                <el-input class="textarea" v-model="rescominfo.context" type="textarea" :rows="5"></el-input>
                                <div>
                                    <span @click="emo = !emo"  class="iconfont icon-emoji"></span>
                                    <el-button @click="comothers()" id="resresbtn">回复评论</el-button>
                                    <div v-show="emo"><picker :include="['people']" :showSearch="false" 
                                    :showCategories="false" :showPreview="false" @select="addEmoji2"/></div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </ul>
        </div>
        <div class="commentpage">
            <transition name="el-zoom-in-bottom">
                <div v-show="show" class="transition-box">
                    <i @click="show = !show" class="el-icon-close"></i>
                    <div>
                        <el-input class="textarea" v-model="commentinfo.context" type="textarea" :rows="5"></el-input>
                        <div>
                            <span @click="emo = !emo"  class="iconfont icon-emoji"></span>
                            <el-button @click="comment" class="combtn">发送评论</el-button>
                            <div v-show="emo"><picker :include="['people']" :showSearch="false" 
                            :showCategories="false" :showPreview="false" @select="addEmoji"/></div>
                        </div>
                        
                    </div>
                </div>
            </transition>
            
        </div>
    </div>
</template>

<script>
import back from '../components/back'
import { getLocalStorage } from '../utils/localStorage'
import { getNowFormatDate } from '../utils/FormatDate'
import { Picker } from "emoji-mart-vue";

    export default {
        name:'comments',
        filters:{getNowFormatDate},
        components:{Picker},
        inject:['reload'],  //注入reload方法
        data(){
            return{
                resinfos:[],
                width:"",
                show:false,
                commentinfo:{userid:'',articleid:0,context:'',time:getNowFormatDate()},
                allcomments:[],
                tip:'',
                liked:'',
                likeinfo:{userid:'',articleid:''},
                userid:'',
                rescominfo:{userid:'',articleid:'',authorid:'',context:'',time:getNowFormatDate()},
                respone:false,
                resres:false,
                emo:false,
                id:'',
                authorid:'',
                aus:[],
                authorname:''
            }
        },
        props:['artid'],
        methods:{
            con(com){
                this.id = com.id
                this.authorid = com.userid
                this.authorname = com.user.username
                this.respone = true;
                this.show=false;
                this.resres = false
            },
            con2(res){
                this.id = res.commentid
                this.authorid = res.userid
                this.authorname = res.user.username
                this.respone = false;
                this.show=false;
                this.resres = true
            },
            comment(){
                this.commentinfo.userid = this.userid
                this.commentinfo.articleid = this.artid
                if(this.commentinfo.context!=''){
                    this.$api.user.comment(this.commentinfo).then(res=>{
                        if(res.code==1){
                            this.$message('发送成功')
                            this.reload()
                        }
                        if(res.code==-1){
                            this.$message('发送失败')
                        }
                    })
                }
                else{
                    this.$message('评论内容不能为空')
                }
            },
            getcomments(){
                this.$api.user.getcomments(this.artid).then(res=>{
                    if(res.status==200){
                        this.allcomments = res.data
                        
                    }
                    if(res.code==0){
                        this.tip = res.msg
                    }
                })
            },
            likes(){
                this.likeinfo.userid = this.userid
                this.likeinfo.articleid = this.artid
                if(this.liked==0){
                    this.$api.user.like(this.likeinfo).then(res=>{
                        this.liked=1
                        if(this.artid.likenum){
                            this.artid.likenum.likenum+=this.artid.likenum.likenum
                        }
                        
                    })
                }
                if(this.liked==1){
                    this.$api.user.unlike(this.likeinfo).then(res=>{
                        this.liked=0
                        this.artid.likenum.likenum-=this.artid.likenum.likenum
                    })
                }
                else{
                    this.liked=0
                }
            },
            isLiked(){
                this.likeinfo.userid = this.userid
                this.likeinfo.articleid = this.artid
                this.$api.user.isliked(this.likeinfo).then(res=>{
                    if(res.code==1){
                        this.liked=1;
                        this.likenum=res.data.likenum
                    }
                    else{this.liked=0}
                })
            },
            delcomment(id){
                let infos = {userid:'',id:''}
                infos.userid = this.userid
                infos.id = id
                this.$api.user.delcomment(infos).then(res=>{
                    if(res.code==1){this.$message('删除成功');this.reload()}
                    if(res.code==-1){this.$message('删除失败');this.reload()}
                })

            },
            comothers(){
                this.rescominfo.userid = this.userid
                this.rescominfo.authorid = this.authorid
                this.rescominfo.articleid = this.artid
                this.rescominfo.commentid = this.id
                this.rescominfo.authorname = this.authorname
                if(this.rescominfo.context!=''){
                    this.$api.user.comothers(this.rescominfo).then(res=>{
                        if(res.code==1){
                            this.$message('发送成功')
                            this.reload()
                        }
                        else{this.$message('发送失败')}
                    })
                }
                else{
                    this.$message('评论内容不能为空')
                }
            },
            getresponse(){
                this.$api.user.getresponse(this.artid).then(res=>{
                    this.resinfos = res.data
                    
                })

            },
            addEmoji(e) {
                this.commentinfo.context += e.native;
            },
            addEmoji2(e) {
                this.rescominfo.context += e.native;
            },
            delresponse(id){
                let delres = { userid:'' , id:''}
                delres.userid = this.userid
                delres.id = id
                this.$api.user.delresponse(delres).then(res=>{
                    if(res.code == 1){
                        this.$message('删除成功')
                        this.reload()
                    }
                    else{
                        this.$message('删除失败')
                    }
                })
            }
        },
        created() {
            this.userid = JSON.parse(getLocalStorage('userid'))
            this.isLiked()
            this.getcomments()
            this.getresponse()

            let width = screen.width
            this.width = width

        },
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
a{text-decoration: none;}
.el-footer{background-color: white;margin-top: 7px;padding: 0;}
.el-message-box{z-index: 1;}
.bottom{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    text-align: center;
    margin: 0 auto;
}
.pl{
    flex: 8;
    font-size:45px;
    color:#ffcb57;
    margin: 0 auto;
    text-align: center;
}
.el-icon-share,.el-icon-chat-dot-round{line-height: 45px;margin-top: 5px;}
.share{
    flex: 8;
    font-size:45px;
    color:#ffcb57;
    line-height: 45px;
    text-align: center;
}
.image{flex: 8;text-align: center;justify-content: center;}
.icon-aixin1{
    color: #ffcb57;
    font-size: 45px;
    line-height: 60px;
}
.icon-aixin{
    color: rgb(233, 71, 98);
    font-size: 45px;
    line-height: 60px;
}

.comments{
    background-color: white;
    position: relative;
}
.com{
    border-bottom: 0.1px solid rgb(231, 112, 0);
    padding: 7px;
    position: relative;
    left: 10px;
}
.comavatar,.resavatar{font-size: 12px;color: lightgray;}
.comname,.resname{
    margin-left: 10px;
    margin-right: 10px;
    font-size: 15px;
    color: #ffcb57;
}
.comtitle{
    margin: 20px 0px 7px 5px;
    letter-spacing: 0.5rem;
    font-size: 17px;
    color: rgb(185, 185, 185);
}
.comnum{
    color: rgb(185, 185, 185);
    font-size: 15px;
}
ul{margin: 0;padding: 0;}
li{list-style: none;}

.transition-box {
    width: 100%;
    height: 280px;
    background-color: rgb(255, 254, 205);
    text-align: center;
    color: black;
    position: fixed;
    bottom: 0;
    z-index: 100;
}
.el-icon-close{float: right;font-size: 20px;color: #ffcb57;z-index: 1;}

.el-icon-more{
    font-size: 25px;
    color: #ffcb57;
}
.res{
    width: 90%;
    border-bottom: 0.1px dotted rosybrown;
    padding: 7px;
    margin: 2px;
    position: relative;
    left: 10%;
}
.del{
    position: absolute;
    right: 20px;
    top: 20px;
}
.combtn,#resbtn,#resresbtn{
    position: fixed;
    right: 50px;
}
.textarea{
    margin: 20px 0 10px 0;
}
.icon-emoji{
    font-size: 25px;
    position: fixed;
    right: 20px;
    line-height: 40px;
}
</style>