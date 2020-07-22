<template>
    <div>
        <el-header>
            <back></back>
            <span class="title">我的关注</span>
        </el-header>
        <div class="list">
            <ul v-for="(fo,index) in follows" :key="index">
                <router-link :to="{name:'mypage',query:{userid:fo.followid}}">
                    <li>
                        <el-avatar :src="fo.user.avatar" :size="60"></el-avatar>
                        <p>{{fo.user.username}}</p>
                    </li>
                </router-link>
            </ul>
        </div>

        <el-backtop :bottom="100"><span class="iconfont icon-huojian"></span>
        </el-backtop>
    </div>
</template>

<script>
import back from '../components/back'
import { getLocalStorage } from '../utils/localStorage'

    export default {
        name:'myfollow',
        components:{back},
        data(){
            return{
                follows:[]
            }
        },
        methods:{
            getmyfollow(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getmyfollow(userid).then(res=>{
                    this.follows = res.data
                })
            }
        },
        created(){
            this.getmyfollow()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;overflow-x: hidden;}
.el-header{
    border-bottom: 5px dotted rgb(163, 160, 126);
}
.title{
    font-size: 25px;
    line-height: 70px;
    color: #e6bb5e;
    font-weight: bold;
    font-family: '幼圆';
}

.list{
    margin-top: 10px;
}
ul{
}
li{
    list-style: none;
    width: 100%;
    height: 100px;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    border: 0.1px dotted yellow;
    background: rgb(255, 247, 202);
    margin-bottom: 10px;
}
li p{
    border-bottom: 10px dotted white;
    font-family: '幼圆';
    padding-bottom: 3px;
}
a{
    text-decoration: none;
    color: darksalmon;
    cursor: pointer;
}
a:hover{
    color: lightsalmon
}
a:active{
    color: rgb(202, 87, 49);
}
a:visited{
    color: rgb(255, 89, 89);
}
.el-backtop{border:5px solid #ffcb57;}
.icon-huojian{font-size: 30px;}
</style>