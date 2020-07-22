<template>
    <div class="forum">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
            <el-tab-pane name="first"  :style="{height:height-bottomh+'px'}">
                <span slot="label" class="label">推荐</span>
                <div class="search">
                    <el-input placeholder="请输入内容" class="searchinput" v-model="inputinfo" learable>
                    </el-input>
                    <router-link :to="{path:'/searcharticles',query:{info:inputinfo}}"><i class="el-icon-search"></i></router-link>
                </div>
                <div>
                    <div class="waterfall" v-cloak>
                        <ul class="item">
                            <li v-for="(share, index) in shares" :key="index">
                                <router-link :to="{path:'/sharedetail',query:{id:share.id}}"><div class="item_div">
                                    <img v-lazy="share.image" v-loading="true"  v-show="share.image">
                                    <span class="title">{{share.title}}</span>
                                    <p>{{ share.createtime | dateFormat}}</p>
                                </div></router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="second"  :style="{height:height-bottomh+'px'}">
                <span slot="label" class="label">考证</span>
                <div>待完善……</div>
            </el-tab-pane>
            <el-tab-pane name="third">
                <span slot="label" class="label">名师</span>
                <div>待完善……</div>
            </el-tab-pane>
            <el-tab-pane name="fourth" >
                <span slot="label" class="label">资料</span>
                <div>待完善……</div>
            </el-tab-pane>
        </el-tabs>

        <bottom :tabnum="tabnum"></bottom>
        <el-backtop target=".el-tab-pane" :bottom="100"><span class="iconfont icon-huojian"></span>
        </el-backtop>
    </div>
</template>

<script>
import bottom from '../components/footer'
import {setHeight,getElementHeight} from '../Height'
import { getLocalStorage } from '../utils/localStorage'

    export default {
        name:'forum',
        data() {
            return {
                activeName: 'first',
                height:'',
                inputinfo:'',
                shares:[], //瀑布流数据
                liked:'',
                currentindex:-1,
                likeinfo:{userid:'',articleid:''},
                bottomh:'',
                newWaterfallData: '',
                waterfallDataNumber:'',
                tabnum:1,
            };
        },
        
        components:{bottom},
        methods: {
            handleClick(tab, event) {
                
            },
            getshareinfos(){
                this.$api.user.getshareinfos().then(res=>{
                    this.shares = res.data
                })
            },
        },
        created(){
            this.getshareinfos()
        },
        mounted(){
            this.bottomh = getElementHeight('.bottom')
            this.height = setHeight()
        },
        
    }
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    position: relative;
}
.el-backtop{border:5px solid #ffcb57;}
.icon-huojian{font-size: 30px;}
.el-tabs{
    margin: 20px 20px 0px 20px;/*上右下左*/
    border: none;
    overflow: hidden;
    background-color: #fff;
}
.el-tab-pane{
    overflow-y: scroll;
}
.label{
    font-size: 30px;
}
.search{text-align: right;width: 100%;}
.searchinput{
    position: absolute;
    left: 0;
}
.el-icon-search{
    font-size: 27px;
    line-height: 40px;
    text-align: right;
    margin-right:10px;
    z-index: 1;
}
/* 
.el-card{
    margin:5px;
    width: 100%;
    max-width: 100%;
    position: relative;
}
.el-card img{
    width: 100%;
    max-width: 100%;
    height: auto;
} */
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}
.button img{
    width: 20px;
}

/* .image {
    width: 100%;
    display: block;
} */

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

a{
    text-decoration: none;
    color: black;
}
.like{position: relative;}
.icon-aixin1{
    position: absolute;
    right: 3px;
    top: 7px;
    font-size: 20px;
    color: rgb(233, 233, 71);
}
.like .icon-aixin{
    position: absolute;
    right: 3px;
    top: 7px;
    font-size: 20px;
    color: rgb(233, 71, 98);
}


.waterfall{
    width: 99%;
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
.item li .item_div{
    position: relative;
}
.title{
    word-wrap: break-word;
}
</style>