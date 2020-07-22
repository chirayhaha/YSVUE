<template>
    <div class="findpassword">
        <el-header><back></back></el-header>
        <div class="info">
            <div v-show="show" class="check">
                <span>登录号码：</span>
                <el-input type="text" v-model="userid"></el-input>
            </div>
            <div class="qa">
                <div v-if="questions.length>0" class="q">
                    <p style="color:orange">请回答您的密保问题：</p><br>
                    <span>密保问题：</span>
                    <p>{{questions}}</p>
                </div>
                <br>
                <div v-if="questions.length>0">
                    <span>密保答案</span>
                    <el-input @keyup.enter.native ="checkans" v-model="inputans" class="a"></el-input>
                    <p v-if="questions.length>0" class="tip">输入答案后请按“回车”进入下一步</p>
                </div>
            </div>
            
            <div>
                <button v-show="show" class="btn" @click="getquestion">确认</button>
            </div>
        </div>
        <div v-show="showform" class="pform">
            <el-form :model="pwds" :rules="rules" ref="pwds" label-width="90px" class="pwds" hide-required-asterisk>
                <el-form-item label="新密码："  prop="newpwd" class="update-item">
                    <el-input type="password" v-model="pwds.newpwd" @keyup.enter.native ="findpassword('pwds')" show-password placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码："  prop="confirmpwd" class="update-item">
                    <el-input type="password" v-model="pwds.confirmpwd" @keyup.enter.native ="findpassword('pwds')" show-password placeholder="请再次输入新密码"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button class="submit" type="danger" @click="findpassword('pwds')">修改密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import back from '../components/back'
import {mapMutations} from 'vuex'

    export default {
        name:'findpassword',
        data(){
            return{
                findinfo:{
                    newpwd:'',confirmpwd:'',userid:'',answer:''
                },
                questions:'',
                ans:"",
                userid:'',
                inputans:'',
                show:true,
                showform:false,
                pwds:{newpwd:'',confirmpwd:'',userid:''},
                rules:{
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
        components:{back},
        methods:{
            handleToVerify(){
                
            },
            findpassword(){},
            change(item){
                
            },
            getquestion(){
                if(this.userid.length<=11 && this.userid.length >=8){
                    this.$api.user.getuserinfo(this.userid).then(res=>{
                        if(res.code == 1){
                            this.questions = res.data.question
                            this.ans = res.data.ans
                            this.show = false
                        }
                        else{
                            this.$message('用户不存在')
                        }
                        
                    })
                }
                else{
                    this.$message('请输入8-11位的正确号码')
                } 
            },
            checkans(){
                if(this.ans == this.inputans){
                    /**跳转到找回密码 */
                    this.$message('回答正确，请重新设置您的密码')
                    this.questions = ''
                    this.showform = true
                }
                else{
                    this.$message("回答错误")
                }
            },
            ...mapMutations(['user/LogOut']),
            findpassword(pwds){
                this.pwds.userid = this.userid
                this.$refs[pwds].validate((valid) => {
                    if (valid) {
                        this.$api.user.findpassword(this.pwds).then(res=>{
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
*{padding: 0;margin: 0;position: relative;text-align: left;}
.info{width: 90%;margin: 5px auto;}
.a{width: 380px;margin: 5px auto;}
.btn{
    border: none;
    background-color: rgb(222, 221, 135);
    color: white;font-size: 16px;
    padding: 5px 8px;
    margin-top: 15px;
}
.tip{
    color: rgb(255, 94, 0);
    font-size: 15px;
    margin-top: 10px;
}
.pform{width: 90%;margin: 5px auto;}
</style>