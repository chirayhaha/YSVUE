<template>
    <div class="my">
        <div class="top">
            <el-avatar :src="$store.state.user.avatar" fit="cover" :size="90" @error="errorHandler">
            </el-avatar>
            <span class="username">{{username}}</span>
            <i class="el-icon-switch-button" @click="logout"></i>
        </div>
        <div class="middle">
            <el-row>
                <el-col>
                    <router-link to="/myfollow"><div class="myfollow">
                        <span class="iconfont icon-follow"></span>
                        <span>我的关注</span>
                        <i class="el-icon-arrow-right"></i>
                    </div></router-link>
                </el-col>
                <el-col>
                    <router-link to="/userinfo"><div class="myinfo">
                        <i class="el-icon-edit-outline"></i>
                        <span>个人信息</span>
                        <i class="el-icon-arrow-right"></i>
                    </div></router-link>
                </el-col>
                <el-col>
                    <router-link to="/myshare"><div class="myshare">
                        <i class="el-icon-reading"></i>
                        <span>我的发布</span>
                        <i class="el-icon-arrow-right"></i>
                    </div></router-link>
                </el-col>
                <el-col>
                    <router-link to="/mymsg"><div class="mymsg">
                        <i class="el-icon-chat-dot-round"></i>
                        <span>我的消息</span>
                        <i class="el-icon-arrow-right"></i>
                    </div></router-link>
                </el-col>
                <el-col>
                    <router-link to="/mylikes"><div class="mylikes">
                        <img src="../assets/likes.png" style="width:20px;margin-right: 10px;">
                        <span>点赞</span>
                        <i class="el-icon-arrow-right"></i>
                    </div></router-link>
                </el-col>
                <el-col>
                    <router-link to="/reward"><div class="mymoney">
                        <img src="../assets/money.png" style="width:20px;margin-right: 10px;">
                        <span>我的奖励金</span>
                        <i class="el-icon-arrow-right"></i>
                    </div></router-link>
                </el-col>
                <el-col>
                    <router-link to="/settings"><div class="mysetting">
                        <i class="el-icon-setting"></i>
                        <span>设置</span>
                        <i class="el-icon-arrow-right"></i>
                    </div></router-link>
                </el-col>
            </el-row>
        </div>
        <bottom :tabnum = "tabnum"></bottom>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");
import { removeLocalStorage, getLocalStorage } from "@/utils/localStorage";
import bottom from '../components/footer'

    export default {
        name:'my',
        data(){
            return{
                tabnum:3
            }
        },
        components:{bottom},
        methods: {
            errorHandler() {
                return true
            },
            logout() {
                this.$api.user.logout().then(res => {
                    removeLocalStorage("Token");
                    this.$router.push("/login");
                });
            },
        },
        computed: {
            ...mapState({
                userid: state => state.userid,
                username: state => state.username,
                avatar: state => state.avatar
            })
        },
    }
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    position: relative;
    font-family: '宋体';
}
.top{
    width: 95%;
    height: 110px;
    margin: 0 auto;
    border-bottom: 0.1px solid rgb(214, 214, 214);
}
.el-avatar{
    position: absolute;
    left: 12px;
    top: 10px;
}
.username{
    font-size: 28px;
    color: rgb(152, 153, 85);
    font-weight: bolder;
    position: fixed;
    top: 55px;
    left: 125px;
}
.middle{
    text-align: left;
    font-size: 20px;
    margin-top: 20px;
}
.el-col{
    width: 95%;
    height: 50px;
    margin: 10px;
}
.el-col i{
    color:#ffcb57;
    font-weight: bold;
    margin-right: 10px;
}
.icon-follow{
    font-size: 20px;
    color:#ffcb57;
    font-weight: bold;
    margin-right: 10px;
}
.myshare,.mymsg,.myinfo,.mylikes,.mymoney,.mysetting,.myfollow{
    margin-left: 20px;
    color: #272100;
}
.el-icon-arrow-right{
    position: fixed;
    right: 30px;
}
.el-icon-switch-button{
    position: absolute;
    right: 2px;
    top: 8px;
    font-size: 30px;
    color: #81711562;
    font-weight: bolder;
}
a{
    text-decoration: none;
    color: black;
    font-weight: bold;
}
</style>