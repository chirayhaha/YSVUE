<template>
    <div class="myshare">
        <el-header><back></back><span class="headtitle">我的分享</span></el-header>
        <el-main>
            <div>
                <el-radio-group v-model="reverse">
                    <el-radio :label="true">倒序</el-radio>
                    <el-radio :label="false">正序</el-radio>
                </el-radio-group>
            </div>
            <div>
                <el-timeline :reverse="reverse">
                    <el-timeline-item placement="top" color="yellow"
                    v-for="(myshare,index) in myshares"
                    :key="index"
                    :timestamp="myshare.createtime | dateFormat">
                        <div class="item" v-if="myshares!=[]">
                            <ul >
                                <router-link :to="{path:'/sharedetail',query:{id:myshare.id}}"><li>
                                    <div v-if="myshare.pass==0 &&myshare.sent!=0" style="color:gold;"><span class="tip">审核中</span></div>
                                    <div v-if="myshare.sent == 0">
                                        <router-link :to="{name:'editarticle',query:{id:myshare.id}}" style="color:green;">
                                            <span class="tip">点击可编辑</span></router-link>
                                    </div>
                                    <div v-if="myshare.pass==-1" style="color:red"><span class="tip">审核不通过，请勿发布不良信息</span></div>
                                        <div class="image">
                                            <p>{{myshare.title}}</p>
                                            <img v-if="myshare.image" :src="myshare.image">
                                        </div>
                                    </li>
                                </router-link>
                            </ul>
                        </div>
                        <div v-else>
                            <p>暂未发布信息</p>
                            <router-link to="/share"><button>马上分享</button></router-link>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-main>
        <el-backtop :bottom="100"><span class="iconfont icon-huojian"></span>
        </el-backtop>
    </div>
</template>

<script>
import { getLocalStorage } from '../utils/localStorage'
import back from '../components/back'
    export default {
        name:'myshare',
        data(){
            return{
                myshares:[],
                reverse:false
            }
        },
        
        components:{back},
        methods:{
            getmyshare(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getmyshare(userid).then(res=>{
                    this.myshares = res.data
                })
            },
            handleClick(tab, event) {},
        },
        created(){
            this.getmyshare()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;position: relative;overflow-x: hidden;}
.myshare{background-color: rgb(255, 252, 232);}
.el-header{border-bottom: 1px dotted rgb(182, 90, 14) ;}
.el-main{width: 100%;}
.headtitle{
    font-size: 27px;
    line-height: 55px;
    color: #ffcb57;
    font-family: '方正姚体';
}
li{list-style: none;text-align: left;}
ul{
    background-color: white;
    margin: 8px 0px;
    z-index: 1;
}
li{padding: 8px;}
.image img{
    max-width: 100px;
    max-height: 70px;
    margin-top: 5px;
    margin-left: 5px;
}

a{text-decoration: none;color: black;}
.el-backtop{border:5px solid #ffcb57;z-index: 20;}
.icon-huojian{font-size: 30px;}
.el-tab-pane{
    overflow-y: scroll;
}
.el-timeline-item{
    overflow: hidden;
}
.tip{
    float: right;
}
</style>