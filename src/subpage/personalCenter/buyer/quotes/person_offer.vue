<!-- 用户个人发出的报价 -->
<template lang="html">
  <div class="person_offer">
    <div class="offer_pic">
        <img src="../../../../../static/img/offer2.png" alt="">
    </div>
    <span style="color:#F15749; position:relative; top:40px; left:110px; font-weight:bold; z-index: 999;" >如卖家已接收你的报价，请去我的接单里查看 
      <router-link to="/release/Receipt/ReceiptAll" tag="span"><img style="width:100px; height:30px; position:relative; top:10px;" src="../../../../../static/img/9.14.png">   </router-link>
    </span>

    <div class="offer_w_con">
      <div class="offer_title_external">
        <p class="offer_title">
          <el-row>
            <el-col :span="6"><router-link to="/release/offer/offerAll"
               tag="div" class="offer_tit"
               @click.native="offerAll()"
               :class="{offer:color==1}"
               ref="one"
               >全部报价
               <span class="person_offer_add"></span>
               <span class="person_offer_triangle"></span>
             </router-link></el-col>
            <el-col :span="6"><router-link to="/release/offer/offerPrices"
              tag="div" class="offer_tit"
              @click.native="offerPri()"
              :class="{offer:color==3}"
              >&nbsp;&nbsp;&nbsp;报价中
              <span class="person_offer_add"></span>
              <span class="person_offer_triangle" ref="person_offer_triangle_prices"></span>
            </router-link></el-col>
            <el-col :span="6"><router-link to="/release/offer/offerCancel"
              tag="div" class="offer_tit offer_choesT"
              @click.native="offerCan()"
              :class="{offer:color==4}"
              >已失效报价
              <span class="person_offer_add"></span>
              <span class="person_offer_triangle" ref="person_offer_triangle_cancel"></span>
            </router-link></el-col>
          </el-row>

        </p>
      </div>
    <div class="person_offer_view">
      <router-view></router-view>
    </div>
</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      color:1
    }
  },
  methods:{
    offerAll(){
      this.color=1;
    },
    offerAcc(){
      this.color=2;
    },
    offerPri(){
      this.color=3;
      this.$refs.person_offer_triangle_prices.style.right='-9%'
    },
    offerCan(){
      this.color=4;
      this.$refs.person_offer_triangle_cancel.style.right='-9%'
    }
  },
    created(){
      if (this.$route.path == "/release/offer/offerAll") {
        this.color = 1
      }else if(this.$route.path =="/release/offer/offerPrices"){
        this.color =3
      }else if(this.$route.path == "/release/offer/offerCancel"){
        this.color =4
      } 
    }
}
</script>

<style lang="scss" scoped>
.person_offer{
  width: 100%;
  height:100%;
  .offer_pic{
    width: 100%;
    height: 8%;
    text-align: left;
    img{
       width: 99%;
       height:80px;
    }
  }
  .offer_w_con{
    margin-left: 1%;
    background:#fff;
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    width: 98%;
  .offer_title_external{
    width: 100%;
    height:50px;
    position: relative;
    .offer_title{
          width: 49%;
          min-height: 36px;
          line-height: 36px;
          margin-left: 1%;
          border-bottom: 3px solid #F15749;
          background: white;
          position: absolute;
          bottom: 0;
      .offer{
        background: #F15749;
        color:white;
        position: relative;
        width:130px;
        .person_offer_triangle{
          width:0;
          height:0;
          border-width:0 10px 10px;
          border-style:solid;
          border-color:transparent transparent #AF2600;
          margin:40px auto;
          position: absolute;
          top:-135.4%;
          right:-9.5%;
          transform:rotate(-135deg);
        }
      }
      .offer_tit{
        cursor:pointer;
      }
    }
  }
  .person_offer_view{
    // min-height: 500px;
  }
 }
}
</style>
