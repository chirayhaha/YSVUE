<template>
    <div class="share" :style="{height:height+'px'}">
        <div class="top">
            <i class="el-icon-close" @click="$router.go(-1)"></i>
        </div>
        <div class="middle">
            
            <el-form :model="shareinfo" ref="shareinfo" :rules="rules">
                <el-form-item prop="img" style="width:100%;height:135px">
                    <el-button class="draft" @click="savedraft(shareinfo)">存为草稿</el-button>
                    <el-upload
                        class="avatar-uploader"
                        ref="upload"
                        multiple
                        :limit="3"
                        :show-file-list="false"
                        action="http://localhost:3000/api/users/share"
                        :before-upload="beforeUpload"
                        :on-change="handleChange"
                        :auto-upload="false"
                        :data="shareinfo"
                        list-type="picture-card"
                        :on-success="successupload">
                    <img v-if="shareinfo.img" :src="shareinfo.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="title">
                    <el-tooltip class="item" effect="light" content="标题" placement="top">
                        <input type="text" class="title" v-model="shareinfo.title" placeholder="填写标题会有更多点赞噢~">
                    </el-tooltip>
                </el-form-item>
                <el-form-item prop="context">
                    <textarea class="context" v-model="shareinfo.context" rows="10" cols="50" placeholder="添加正文"></textarea>
                    <span @click="show = !show" class="iconfont icon-emoji"></span>
                    <div v-if="show" ><picker@select="addEmoji" :showSearch="false"/></div>
                </el-form-item>
                <el-form-item>
                    <div class="topic">
                        <img src="../assets/topic.png" style="width:30px">
                        <span>参与话题</span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="bottom">
                        <el-button class="sharebtn" @click="share(shareinfo)">发布</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <bottom style="display:none" :tabnum="tabnum"></bottom>
    </div>
</template>

<script>
import { getElementHeight } from '../Height'
import { getLocalStorage } from '../utils/localStorage'
import { getNowFormatDate } from '../utils/FormatDate'
import { Picker } from "emoji-mart-vue";
import VEmojiPicker from 'v-emoji-picker';
import bottom from '../components/footer'

    export default {
        name:'share',
        components:{VEmojiPicker,Picker},
        inject:['reload'],
        data(){
            return{
                shareinfo:{
                    context:'',
                    title:'',
                    img:'',
                    userid:JSON.parse(getLocalStorage('userid')),
                    sent:1,
                    createtime:getNowFormatDate(),
                },
                height:'',
                rules:{context:[{required:true}],img:[{required:true}]},
                sharedata:new FormData(),
                show:false,
                tabnum:2
            }
        },
        components:{bottom},
        methods:{
            share(shareinfo) {
                this.$refs.shareinfo.validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit()
                    } else {
                        this.$api.user.share(this.shareinfo).then(res=>{
                            if(res.code==1){
                                this.$message('发布成功')
                                this.shareinfo={}
                                this.reload()
                            }else{
                                this.$message('发布失败')
                            }
                        })
                        return false
                    }
                }); 
            },
            savedraft(shareinfo){
                this.shareinfo.sent = 0
                this.$refs.shareinfo.validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit()
                    } else {
                        this.$api.user.share(this.shareinfo).then(res=>{
                            if(res.code==1){
                                this.$message('已保存为草稿')
                                this.shareinfo={}
                                this.reload()
                            }else{
                                this.$message('保存失败')
                            }
                        })
                        return false
                    }
                });
            },
            resetForm(shareinfo) {
                this.$refs[shareinfo].resetFields();
                this.shareinfo.img = '';
            },
 
            handleChange (file, fileList) {
                this.shareinfo.img = URL.createObjectURL(file.raw);
            },
 
            beforeUpload(file) {
                return true;
            },
            successupload(res, file){
                if(res.code==1){
                    this.$message('发布成功')
                    this.shareinfo={}
                    this.reload()
                }else{
                    this.$message('发布失败')
                }
            },
            selectEmoji(emoji) {
                
            },
            addEmoji(e) {
                this.shareinfo.context += e.native;
            }

        },
        created(){
            this.height = document.documentElement.clientHeight || document.body.clientHeight;
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;position: relative;font-family: '宋体';}
.share{
    display: flex;
    flex-direction: column;
}
.top{
    width: 100%;
    height: 50px;
    text-align: left;
    flex: 2;
}
.el-icon-close{
    font-size: 30px;
    font-weight: bolder;
    margin: 10px;
}
.draft{
    width: 100px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    position: absolute;
    right: 10px;
    top: -40px;
    color: #94732c;
    background-color: rgb(255, 255, 241);
}
.middle{
    flex: 16;
}
.title{
    border: none;
    border-bottom: 0.1px solid #ffecc2;
    width: 85%;
    color: #333;/*#606266*/
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0px;
}
.context{
    border: none;
    width: 85%;
    color: #333;
    font-size: 18px;
    padding: 10px 0px;
    text-indent:2em;
}
.bottom{
    flex: 2;
}
.sharebtn{
    text-align: center;
    width: 85%;
    font-size: 18px;
    /**两个同时设置可以实现设置完字符间距仍居中显示 */
    letter-spacing: 3rem;
    text-indent: 3rem;
    background-color: #ffcb57;
    color: white;
    border-radius: 30px;
    margin: 30px auto;
}
.topic{
    text-align: left;
    margin: 0px auto;
    padding: 10px 10px 10px 0px;
    width: 82%;
    height: 30px;
    border-top: 0.1px solid #ffecc2;
    border-bottom: 0.1px solid #ffecc2;
}
.avatar-uploader{
    margin: 0 auto;
}
.avatar{
    max-width: 150px;
    margin: 0 auto;
}
.icon-emoji{
    font-size: 30px;
    color: #ffcb57;
    position: absolute;
    left: 8%;
}
.emoji-mart{
    margin: 0 auto;
    z-index: 0.5;
}
</style>