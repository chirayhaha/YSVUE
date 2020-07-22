<template>
    <div class="setting">
        <updatePassword v-show="toshow" @toshow="show" :style="{height:height+'px'}"></updatePassword>
        <el-header v-show="!toshow"><back></back></el-header>
        <div class="middle">
            <el-col v-show="!toshow">
                <div @click="showupdatep">
                    <span>修改密码</span><i class="el-icon-arrow-right"></i>
                </div>
            </el-col>
            <el-col>
                <div><span>通用设置</span><i class="el-icon-arrow-right"></i></div>
            </el-col>
        </div>
        
    </div>
</template>

<script>
import updatePassword from '../components/updatePassword'
import back from '../components/back'

    export default {
        name:'settings',
        components:{updatePassword,back},
        data(){
            return{
                height:'',
                toshow:false,
            }
        },
        methods:{
            setHeight(){
                let height = screen.height
                this.height = height
            },
            showupdatep(){
                this.toshow=true
            },
            show(chilmsg){
                this.toshow = chilmsg  //false
            }
        },
        created(){
            this.setHeight()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;position: relative;}
.el-header{
    background: rgb(255, 245, 129);
}
.el-col{
    width: 100%;
    background: rgb(241, 241, 241);
}
.el-col div{
    width: 100%;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    margin: 0px 0px 5px 0px;
    background: white;
}
.el-col span{
    position: absolute;
    left: 10px;
}

.el-icon-arrow-right{
    position: absolute;
    right: 10px;
    font-size: 30px;
    line-height: 50px;
}
.all{z-index: 11;}
</style>