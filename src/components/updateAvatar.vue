<template>
    <div class="updateAvatar">
        <div class="image">
            <img :src="$store.state.user.avatar" class="avatarimg">
            <br>
            <div class="btn"><input type="file" class="upbtn" name="file" @change="handleUpload" accept=".jpg,.png,.gif"></div>
        </div>
</div>
</template>

<script>
    export default {
        name:'updateAvatar',
        name:'userinfo',
        data() {
            return {
                imageUrl: '',
                avatarinfo:{
                    userid:'',
                    avatar:''
                },
            }
        },
        methods:{
            handleUpload(ev){
                let file = ev.target.files[0]
                let param = new FormData()
                param.append('file',file,file.name)
                console.log(param)

                this.$api.user.updateAvatar(param).then(res=>{
                    if(res.code == 1){
                        //更新头像
                        this.$store.commit("user/SET_AVATAR",res.data.avatar+'?'+Math.random())
                        console.log(res.data.avatar)
                        this.$message('上传头像成功')
                    }
                    else{
                        this.$message('上传头像失败')
                    }
                })
            },
        },
    }
</script>

<style scoped>
*{margin: 0;padding: 0;position: relative;}
.avatarimg{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
}

.image{
    width: 90%;
    height: 100%;
    margin: 10px auto;
}
.btn{
    width: 60px;
    height: 30px;
    background-image: url('../assets/uploadbtn.png');
    margin: 5px auto;
}
.upbtn{
    width: 60px;
    height: 30px;
    opacity: 0;
}
</style>