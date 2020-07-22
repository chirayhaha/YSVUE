<template>
    <div class="testurls">
        <div class="one" v-for="(item,index) in items" :key="index">
          <div  v-if="item.name == '更多类型'" class="item">
            <router-link to="/tests"><img :src="item.imgurl">
            <p class="name">
              {{item.name}}
            </p></router-link>
          </div>
          <div v-else @click="toinfopage(item.name)" class="item">
            <img :src="item.imgurl">
            <p class="name">
              {{item.name}}
            </p>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name:'testurls',
        data(){ 
          return{
            items:[
              {name:'广告设计师',imgurl:require('../assets/gdsjs.png')},
              {name:'ICAD',imgurl:require('../assets/icad.png')},
              {name:'平面设计师',imgurl:require('../assets/pmsjs.png')},
              {name:'轻工设计师',imgurl:require('../assets/qgsjs.png')},
              {name:'视觉设计师',imgurl:require('../assets/sjsj.png')},
              {name:'室内设计师',imgurl:require('../assets/snsjs.png')},
              {name:'UI设计师',imgurl:require('../assets/ui.png')},
              {name:'更多类型',imgurl:require('../assets/more.png')},
            ]
          }
        },
        methods: {
            handleOpen(key, keyPath) {
            
            },
            handleClose(key, keyPath) {
            
            },
            toinfopage(webname){
              this.$router.push({name:'webinfo',params:{webname:webname}})
            }
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;position: relative;}
.testurls{
  width: 100%;
  height: 30%; 
  border-bottom: 0.2px solid rgb(221, 221, 221);
  vertical-align: middle!important;
}
a{
  text-decoration: none;
  color: #000;
}
img{
    width:50px;
}
.label{
    font-size: 17px;
    margin: 0 auto;
}
.item{
    width: 80px;
    float: left;
    margin: 0 auto;
    margin-bottom: 15px;
    text-align: center;
    margin-left: 10px;
}
.item p{
    font-size: 13px;
}
.one{
  margin: 0 auto;
}
</style>