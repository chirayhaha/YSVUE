<template>
    <div class="reward" :style="{height:height+'px'}">
        <div><el-header><router-link to="/my"><i class="el-icon-arrow-left"></i></router-link></el-header></div>
        <div class="middle">
            <div class="benifit" :style="{height:height/4+'px'}">
                <span>金币收益：{{record*0.15+total*0.05 | parseFloat}}个</span>
                <span  v-if="record == null">金币收益：0个</span>
                <p v-if="!record">暂无收益~</p>
                <div class="rules">
                    <el-popover
                        placement="bottom"
                        title="金币规则"
                        width="200"
                        trigger="click"
                        content="每获得一个赞能获得0.05个金币，每一篇文章可以获得0.15个金币">
                        <el-button slot="reference">金币规则</el-button>
                    </el-popover>
                </div>
            </div>
            <div style="margin-top:-30px">
                <div class="share">
                    <button @click="goshare">马上分享赢奖励</button>
                </div>
                <div class="signin">
                    <button>签到有奖</button>
                </div>
                <div class="vip">
                    <button>成为会员</button>
                </div>
            </div>
             
        </div>
        <div><el-footer></el-footer></div>
    </div>
</template>

<script>
import back from '../components/back'
import { setHeight } from '../Height';
import { getLocalStorage } from '../utils/localStorage';

    export default {
        name:'reward',
        components:{back},
        data(){
            return{
                height:'',
                record:[],
                likenum:[],
                total:0,
                num:''
            }
        },
        filters:{
            parseFloat:function(count){
                let total = parseFloat(count).toFixed(2)
                return total
            }
        },
        methods:{
            getreward(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getreward(userid).then(res=>{
                    this.record = res.data
                    
                    this.$api.user.getmyshare(userid).then(res=>{
                        this.likenum = res.data
                        this.likenum.forEach(like=>{
                            if(like.likenum!=null){
                                this.total += like.likenum.likenum
                            }
                        })
                        
                    })
                })
            },
            goshare(){
                this.$router.push('/share')
            }
        },
        created(){
            this.height = setHeight()
            this.getreward()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;position: relative;}
.reward{background-color: rgb(255, 254, 247);width: 100%;overflow-x: hidden;}
.benifit{
    background-color: #ffc400;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
}
.el-footer{background: #ffc400;position: fixed;bottom: 0;width: 100%;}
.el-header{text-align: left;padding: 0;}
.el-icon-arrow-left{font-size: 35px;margin-top: 5px;}
.benifit span{
    font-size: 25px;
    color: white;
    position: absolute;
    left: 10px;
    top: 25px;
    font-weight: bolder;
}
.benifit p{
    font-size: 18px;
    color: white;
    position: absolute;
    left: 15px;
    top: 65px;
    font-weight: bold;
}
.middle button{
    width: 50%;
    font-size: 20px;
    align-self:center;
    margin: 0 auto;
    height: 45px;
    border-radius: 10px;
    border: none;
    background-color: #ffd900;
    color: white;
    font-weight: bold;
}
.share,.signin,.vip{
    width: 85%;
    margin: 0 auto;
    height: 80px;
    border-radius: 40px;
    margin-bottom: 30px;
    display:flex;
    background: white;
    box-shadow: rgb(201, 201, 201) 6px 6px 8px -1px ;/** h-shadow v-shadow blur spread color inset; */
}
.rules{
    height: 100%;
    width: 200px;
    position: relative;
    left: 80%;
    top: -18%;
}
.rules .el-button{
    font-size: 15px;
    width: 100%;
    background-color: #ffc40000;
    text-decoration: underline;
    padding: 0;
    margin: 0;
}
</style>