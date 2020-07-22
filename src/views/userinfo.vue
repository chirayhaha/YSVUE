<template>
    <div class="userinfo">
        <el-header><div class="top">
            <back></back>
        </div></el-header>
        <div class="middle">
            
            <updateAvatar></updateAvatar>

            <div class="info">
                <el-form size="meduim" :model="editinfo" label-width="80px" :rules="rules" ref="editinfo" class="editinfo" hide-required-asterisk>
                    <el-form-item label="用户名"  prop="username" class="edit-item">
                        <el-input @keyup.enter.native ="edit('editinfo')"  class="area" type="text" placeholder="用户名" v-model="editinfo.username" ></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary"  @click="edit('editinfo')" class="submit_btn">保存更改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
import { getLocalStorage,setLocalStorage } from '@/utils/localStorage'
import back from '../components/back'
import updateAvatar from '../components/updateAvatar'

    export default {
        name:'userinfo',
        data() {
            return {
                imageUrl: '',
                avatarinfo:{
                    userid:'',
                    avatar:''
                },
                editinfo:{
                    username:'',
                    userid:'',
                },
                rules:{
                    username:[
                        {required:true},
                    ],
                }
            };
        },
        components:{back,updateAvatar},
        methods: {
            edit(editinfo){
                this.$refs[editinfo].validate((valid) => {
                    let userid = JSON.parse(getLocalStorage('userid'))
                    this.editinfo.userid = userid
                    if (valid) {
                        let editinfo = this.editinfo
                        this.$api.user.edituserinfo(editinfo).then(res=>{
                            if(res.code == 1){
                                this.$message('更改成功')
                                setLocalStorage('username',this.editinfo.username)
                            }
                            if(res.code == -1){
                                this.$message('更改失败，请重试')
                            }
                        })
                    }
                });
            },
            
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;position: relative;}
.el-header{
    background: rgb(255, 245, 129);
}
.area{
    width: 300px;
}
.submit_btn:hover{background-color: rgb(194, 194, 32);border-color: rgb(194, 194, 32);}
</style>