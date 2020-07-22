<template>
    <div class="updatepassword">
        <div class="all">
            <div><i class="el-icon-close" @click="click"></i></div>
            <div class="info">
                <el-form :model="pwds" :rules="rules" ref="pwds" label-width="90px" class="pwds" hide-required-asterisk>
                    <el-form-item label="旧密码："  prop="oldpwd" class="update-item">
                        <el-input type="password" v-model="pwds.oldpwd" @keyup.enter.native ="updatepassword('pwds')" show-password placeholder="请输入旧密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码："  prop="newpwd" class="update-item">
                        <el-input type="password" v-model="pwds.newpwd" @keyup.enter.native ="updatepassword('pwds')" show-password placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码："  prop="confirmpwd" class="update-item">
                        <el-input type="password" v-model="pwds.confirmpwd" @keyup.enter.native ="updatepassword('pwds')" show-password placeholder="请再次输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button class="submit" type="danger" @click="updatepassword('pwds')">修改密码</el-button>
                    </el-form-item>
                </el-form>
            </div>    
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { getLocalStorage } from '@/utils/localStorage'
import { Message } from 'element-ui';
import {mapMutations} from 'vuex'

    export default {
        name:'updatepassword',
        data(){
            return{
                pwds:{oldpwd:'',newpwd:'',confirmpwd:'',userid:''},
                rules:{
                    oldpwd:[
                        {required:true},
                    ],
                    newpwd: [
                        { required: true}
                    ],
                    confirmpwd: [
                        { required: true,
                        },{validator:(rule,value,callback)=>{
                            if(this.pwds.confirmpwd != 0 || this.pwds.confirmpwd != 0){
                                if( this.pwds.confirmpwd!=this.pwds.newpwd){callback(new Error('两次输入的密码不一致'))}
                                else{callback()}}}
                            }
                            
                    ],
                }
            }
        },
        methods:{
            click(){
                this.$emit('toshow', false);
            },
            ...mapMutations(['user/LogOut']),
            updatepassword(pwds){
                console.log(this.pwds)
                let userid = JSON.parse(getLocalStorage('userid')) 
                this.pwds.userid = userid
                this.$refs[pwds].validate((valid) => {
                    if (valid) {
                        this.$api.user.updatepassword(this.pwds).then(res=>{
                            if(res.code==1){
                                this.$message('更改成功')
                                this.$store.dispatch('user/LogOut')
                                this.$router.push('/login')
                            }
                        })
                    }
                })
            },
            
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;position: relative;}
.all{
    background:white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align-last: justify;
}
.el-input{
    width: 260px;
    margin: 10px auto;
}
.info{
    width: 85%;
    margin: 0 auto;
    position: relative;
    top: 70px;
    height: 30%;
}
.info span{
    font-size: 15px;
}
.el-icon-close{
    font-size: 30px;
    position: absolute;
    left: 10px;
    top: 10px;
}
.btns{
    z-index: 10;
}
.update-item{
    margin: 40px 20px;
}
</style>