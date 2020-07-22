<template>
    <div class="mylikes">
        <el-header><back></back><span class="headtitle">我的点赞</span></el-header>
        <div>
            <div class="waterfall" v-cloak>
                <ul class="item">
                    <li v-for="(like,index) in likeinfos" :key="index">
                        <router-link :to="{path:'/sharedetail',query:{id:like.articleid}}"><div class="item_div">
                            <img v-lazy="like.article.image" v-loading="true"  v-show="like.article.image">
                            <span>{{like.article.title}}</span>
                            <p>{{ like.article.createtime | dateFormat}}</p>
                        </div></router-link>
                    </li>
                </ul>
            </div>
        </div>
        <el-backtop :bottom="100"><span class="iconfont icon-huojian"></span>
        </el-backtop>
    </div>
</template>

<script>
import back from '../components/back'
import { getLocalStorage } from '../utils/localStorage'

    export default {
        name:'mylikes',
        components:{back},
        data(){
            return{
                likeinfos:[],
            }
        },
        methods:{
            getmylikes(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getmylikes(userid).then(res=>{
                    this.likeinfos = res.data
                })
            }
        },
        created(){
            this.getmylikes()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;position: relative;overflow-x: hidden;}
.el-header{border-bottom: 0.1px solid rgb(221, 221, 221);}
.headtitle{
    font-size: 27px;
    line-height: 55px;
    color: #ffcb57;
    font-family: '幼圆';
}
a{
    text-decoration: none;
    color: black;
}
.el-backtop{border:5px solid #ffcb57;z-index: 20;}
.icon-huojian{font-size: 30px;}

.waterfall{
    width: 95%;
    margin: 10px auto;
}
.item img{
    width:100%;
}
.item p{
    margin-top: 5px;
    padding: 0 8px;
    font-size: 0.75rem;
    color: #999;
}
.item {
    column-count:2;
    margin-top: 10px;
    margin-bottom: 80px;
}
.item li{
    list-style: none;
    margin-bottom: 10px;
    padding: 8px;
    background: #fff;
    border-radius: 2px;
    padding-bottom: 10px;
    box-shadow: 1px 3px 5px rgba(0,0,0,.1);
}
</style>