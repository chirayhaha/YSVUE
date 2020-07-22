<template>
    <div>
        <el-header><back></back></el-header>
        <div>
            <el-tabs tab-position="left" :style="{height:height/1.5+'px'}">
                <!-- 表演艺术、视觉艺术、语言艺术、综合艺术 -->
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>绘画</span></div>
                    </template>
                    <div v-for="(see,index) in seeings" :key="index" class="item">
                        <router-link :to="{name:'webinfo',params:{webname:see.name}}"><img :src="see.image">
                        <p>{{see.name}}</p></router-link>
                    </div>
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>雕塑</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>建筑</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane  class="act">
                    <template slot="label">
                        <div class="label"><span>音乐</span></div>
                    </template>
                    ...
                    <img>
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>舞蹈</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>戏剧</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="language">
                    <template slot="label">
                        <div class="label"><span>文学</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="combine">
                    <template slot="label">
                        <div class="label"><span>电影</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>电视</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>歌剧</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>音乐剧</span></div>
                    </template>
                    ...
                </el-tab-pane>
                <el-tab-pane class="seeing">
                    <template slot="label">
                        <div class="label"><span>待续</span></div>
                    </template>
                    ...
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import back from '../components/back'

    export default {
        name:'tests',
        data() {
            return {
                height:'',
                width:'',
                seeings:[
                    {name:'绘画比赛',image:require('../assets/draw.png')},
                    {name:'绘画比赛2',image:require('../assets/draw.png')},
                    {name:'绘画比赛3',image:require('../assets/draw.png')},
                    {name:'绘画比赛4',image:require('../assets/draw.png')},
                    {name:'绘画比赛5',image:require('../assets/draw.png')},
                ]
            };
        },
        components:{back},
        methods: {
        },
        created(){
            this.height = screen.height
            
        },
    }
</script>

<style scoped>
*{padding: 0;margin: 0;text-align: left;}
.el-tabs{
    
}
.el-tab-pane{
    margin: 0 auto;
}
.act{}
.seeing{}
.language{}
.combine{}
img{
    width:50px;
}
.label{
    font-size: 17px;
    margin: 0 auto;
}
.item{
    width: 60px;
    float: left;
    margin: 0 8px;
    margin-bottom: 15px;
    text-align: center;
}
.item p{
    font-size: 13px;
}
a{
    text-decoration: none;
    color: #000;
}
</style>