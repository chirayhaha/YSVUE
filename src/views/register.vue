<template>
    <div class="register"  :style="{height:height+'px'}">
        <i class="el-icon-top-left" @click="$router.go(-1)"></i>
        <div class="title"><span>艺升</span></div>
        <el-form ref="registerinfo" :rules="rules" label-width="80px" :model="registerinfo" class="registerinfo" hide-required-asteriskc>
            <el-form-item label="登录号码" prop="userid" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')"  class="area" type="text" placeholder="phone number" v-model="registerinfo.userid" ></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')"  class="area" type="text" placeholder="name" v-model="registerinfo.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')" show-password class="area" type="password" placeholder="password" v-model="registerinfo.password" ></el-input>
            </el-form-item>
            <el-form-item label="密保问题" prop="question" class="register-item">
                <el-select v-model="registerinfo.question" placeholder="请选择" size="mini" @change="change(registerinfo.question)">
                    <el-option
                        v-for="item in questions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="ans" label="密保答案" class="register-item">
                <el-input type="text" @keyup.enter.native ="registeraxios('registerinfo')"  class="area" v-model="registerinfo.ans"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="registeraxios('registerinfo')" class="submit_btn">注册</el-button>
            </el-form-item>
        </el-form>
        
        <div class="zz"  :style="{height:height+'px'}"></div>
    </div>
</template>

<script>
    export default {
        name:'register',
        data(){
        return {
            height:'',
            registerinfo:{
                username:'',
                userid:'',
                password:'',
                question:'',
                ans:''
            },
            questions:[
                {value:"我的名字",label:"我的名字"},
                {value:"我最喜欢的颜色",label:"我最喜欢的颜色"},
                {value:"我的最爱",label:"我的最爱"},
            ],
            rules: {
                userid:[
                    {required:true, message:'请输入用户id',trigger: 'blur'},
                    { min: 8, max: 11, message: '长度 11 个字符', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                question:[
                    {required:true}
                ],
                ans:[
                    {required:true}
                ]
            }
        }
    },
    methods:{
        registeraxios(registerinfo){
            this.$refs[registerinfo].validate((valid) => {
                if(valid){
                    let userinfo = this.registerinfo
                    //api-user-index.js
                    this.$api.user.register(userinfo).then(res => {
                        if(res.code == 1){
                            this.$message("注册成功")
                            this.$router.push({path:'/login'})
                        }
                        else{
                            this.$message('用户已存在')
                        }
                    })
                }
            })
        },
        setHeight(){
            let height = screen.height
            this.height = height
        },
        change(value){
            this.registerinfo.question = value
        },
    },
    mounted(){
        this.setHeight()
    }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;position: relative;}
.register{
    background: url('~@/assets/indexbg.jpg');
    background-position: left top;
    background-repeat: no-repeat;
    background-size: cover;
}
.zz{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(255,255,255,0.7);
}
.el-icon-top-left{
    position: fixed;
    left: 10px;
    top: 10px;
    font-size: 30px;
    z-index: 100;
}
.title{
    width: 100%;
    writing-mode: vertical-lr;/*文字从左向右*/    
    writing-mode: tb-lr;
    font-size: 30px;
    padding-top: 70px ;
    padding-left:300px;
    color: rgb(216, 213, 60);
    letter-spacing: 15px;
    z-index: 2;
}
.registerinfo{
    margin: 25px;
    text-align-last: justify;
    z-index: 2;
}
.register-item{
    margin: 40px 20px;
}
.btns{
    margin-right: 22px;
    padding: 5px;
    float: right;
}
.submit_btn,.submit_btn:visited{
    background-color: rgb(228, 231, 31);
    border: none;
}
.submit_btn:hover{background-color: rgb(235, 236, 147);}
</style>