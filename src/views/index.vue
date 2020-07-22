<template>
  <div class="index">
    <el-container>
      <el-header>
        <img class="logo" src="../assets/logo.png" />
        <el-input placeholder="请输入内容" class="searchinput" v-model="inputinfo" learable></el-input>
        <router-link :to="{path:'/searchtest',query:{info:inputinfo}}"><i class="el-icon-search"></i></router-link>
      </el-header>
      <el-main :style="{height:mainHeight+'px'}">
        <div class="block">
          <el-carousel height="150px" autoplay>
            <!--  type="card" -->
            <el-carousel-item v-for="(item,id) in ads" :key="id">
              <h3 class="small">{{ item.title }}</h3>
              <img :src="item.img" class="ad-img" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <br />
        
        <testurls></testurls><br>

        <div class="aaa">
          <div class="coms" v-for="(com,index) in coms" :key="index">
            <div class="photo">
              <img :src="com.img" class="comphoto" />
            </div>
            <div class="txt">
              <p class="title">{{com.title}}</p>
              <p class="jie" :style="{width:width/1.8+'px'}">{{com.jie}}</p>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <bottom :tabnum="tabnum"></bottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import testurls from "../components/testurls";
import bottom from "../components/footer";

export default {
  name: "index",
  components: { testurls, bottom },
  data() {
    return {
      inputinfo: "",
      mainHeight: "",
      ads: [
        { title: "啊哈哈", img: require("../assets/ad1.png") },
        { title: "一嘿嘿", img: require("../assets/ad2.png") },
        { title: "哇哦哦", img: require("../assets/ad3.png") }
      ],
      coms: [
        {
          img: require("../assets/bs2.png"),
          title: "黑盒创意设计奖",
          jie:
            "2020 第 二 届 BBCD 黑 盒 创 意 设 计 奖 | Black Box Creative Design Award"
        },
        {
          img: require("../assets/bs4.png"),
          title: "「衣起重生」",
          jie:
            "为 呼 吁 更 多 人 共 同 关 注 环 保，「衣起重生」 环 保 设 计 大 赛 开 启 ！"
        },
        {
          img: require("../assets/bs3.png"),
          title: "国际艺术设计奖",
          jie:
            "CLD 国 际 艺 术 设 计 奖 | International Council of art and esign Award"
        },
        {
          img: require("../assets/bs1.png"),
          title: "梦想机器人",
          jie:
            " 梦 想 6 号 机 器 人形 象 比 赛  | Dream Robot No.6 Image Design Competition"
        }
      ] ,
      width: "",
      tabnum:0
    };
  },
  mounted() {
    this.getElementHeight();
    this.getwidth();
  },
  methods: {
    getElementHeight() {
      let whole = screen.height;
      let header =
        document.querySelector(".el-header").clientHeight ||
        document.querySelector(".el-header").offsetHeight;
      let footer =
        document.querySelector(".el-footer").clientHeight ||
        document.querySelector(".el-header").offsetHeight;
      let main = whole - header - footer;
      this.mainHeight = main;
    },
    getwidth() {
      let width =
        document.querySelector(".el-header").clientWidth ||
        document.querySelector(".el-header").offsetWidth;
      this.width = width;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  position: relative;
  font-family: "行楷";
}
.index {
  height: 100%;
  width: 100%;
}
.el-header {
  border-bottom: 0.1px solid #ffe9ba;
  color: #333;
  line-height: 60px;
}
.el-main {
  background-color: white;
  color: #333;
}
.el-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.logo {
  flex: 3;
  height: 45px;
  width: 25px;
  margin: 9px auto;
  margin-right: 10px;
}
.searchinput {
  width: 250px;
  flex: 20;
}
.el-icon-search {
  flex: 2;
  margin-left: 10px;
  font-size: 25px;
  line-height: 55px;
  color: #ffcb57;
}
.el-carousel__item h3 {
  color: rgb(129, 127, 21);
  font-size: 17px;
  opacity: 0.75;
  margin: 0;
  z-index: 1;
  position: absolute;
  top: 92px;
  height: 30px;
  width: 100%;
  line-height: 30px;
  background-color: rgba(255, 255, 255, 0.9);
}

.el-carousel__item:nth-child(2n) {
  background-color: rgb(246, 252, 255);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: rgb(232, 247, 255);
}
.ad-img {
  width: 100%;
  height: 150px;
}
.comphoto {
  width: 110px;
  height: 82px;
  float: left;
}
.coms {
  border-bottom: 0.1px solid rgb(221, 221, 221);
  padding: 20px 7px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.txt {
  text-align: left;
}
.title {
  position: relative;
  left: 20px;
  color: #ffcb57;
}
.jie {
  position: relative;
  left: 20px;
  border: 0.5px solid black;
  width: 360px;
  padding: 2px;
  margin: 2px;
  font-size: 14px;
  border-radius: 5%;
} 

</style>
