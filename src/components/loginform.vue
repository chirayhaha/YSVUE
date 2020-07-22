<template>
    <div class="loginform">
        <div class="title"><span>艺升</span></div>
        <div>
            <el-form size="meduim" :model="logininfo" label-width="70px" :rules="rules" ref="logininfo" class="logininfo" hide-required-asterisk>
                <el-form-item label="登录号码"  prop="userid" class="login-item">
                    <el-input @keyup.enter.native ="loginaxios('logininfo')"  class="area" type="text" placeholder="手机号" v-model="logininfo.userid" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" class="login-item"> 
                    <el-input @keyup.enter.native ="loginaxios('logininfo')" show-password class="area" type="password" placeholder="密码" v-model="logininfo.password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" class="login-item" prop="verifycode">
                    <el-input v-model="logininfo.verifycode" class="area" type="text" @keyup.enter.native ="loginaxios('logininfo')" 
                    style="width:140px;positon:relative;top:-35px" placeholder="请输入验证码"></el-input>
                    <img :src="imgsrc" @click="changecode" alt="验证码" class="code">
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary"  @click="loginaxios('logininfo')" class="submit_btn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <router-link to="/findpassword"><div class="findtxt" @click="find = true">找回密码</div></router-link>
    </div>
</template>

<script>
import axios from 'axios'
import { setLocalStorage } from '@/utils/localStorage'
import { Message } from 'element-ui';

    export default {
        name:'loginform',
        data(){
            return {
                logininfo:{
                    userid:'',
                    password:'',
                    verifycode:'',
                },
                imgsrc:'http://localhost:3000/api/users/getverifycode',
                rules:{
                    userid:[
                        {required:true,},
                        { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true}
                    ],
                },
                find:false
            }
        },
        components:{},
        props:['pheight'],
        methods:{
            loginaxios(logininfo){
                this.$refs[logininfo].validate((valid) => {
                    if (valid) {
                        let userinfo = this.logininfo;
                        this.$api.user.postlogin(userinfo).then(res =>{
                            if(res.code == -1){
                                this.$message("该用户不存在")
                            }else if(res.code == 0){
                                this.$message("密码错误")
                            }else if(res.code == 1){
                                //成功验证
                                setLocalStorage("Token",res.data.token)
                                setLocalStorage("userid",res.data.userid)
                                this.$message("登录成功")
                                this.$router.push({path:'/'})
                            }
                            else if(res.code == 3){
                                this.$message("验证码错误")
                            }
                            else{
                                this.showMessage("info","未知错误")
                            }
                        })
                    }
                });
            },
            changecode(){
                this.imgsrc = 'http://localhost:3000/api/users/getverifycode?'+Math.random()
            }
        }
    }   
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    position: relative;
}
.title{
    width: 100%;
    writing-mode: vertical-lr;/*文字从左向右*/    
    writing-mode: tb-lr;
    font-size: 32px;
    padding-top: 70px ;
    padding-left:300px;
    color: rgb(233, 229, 0);
    letter-spacing: 15px;
}
.logininfo{
    margin: 25px;
    text-align-last: justify;
}
.login-item{
    margin: 40px 20px;
}
.btns{
    margin-right: 22px;
    padding: 5px;
    float: right;
}
.submit_btn{
    background-color: rgb(213, 216, 30);
    border: none;
}
.submit_btn:active,.submit_btn:visited{background-color: rgb(156, 163, 49);}
.submit_btn:hover{background-color: rgb(231, 231, 88);}
.findtxt{
    float: left;
    position: relative;
    top: 30px;
    left: 50px;
    text-decoration: underline;
    color: rgb(245, 191, 13);
    font-weight: bolder;
    font-size: 17px;
}
.code{
    position: relative;
    top: -10px;
    left: 10px;
}
</style>