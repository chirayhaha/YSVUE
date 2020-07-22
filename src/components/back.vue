<template>
    <div class="back">
        <i class="el-icon-arrow-left" @click="goback()"></i>
    </div>
</template>

<script>
    export default {
        name:'back',
        inject:['reload'],
        methods:{
            goback(){
                this.$router.go(-1)
                this.reload()
            }
        }
    }
</script>

<style scoped>
.el-icon-arrow-left{
    font-size: 30px;
    font-weight: bolder;
    color:#856012;
    z-index: 1;
    position: fixed;
    top: 15px;
    left: 5px;
}
</style>