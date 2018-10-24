<!-- 用户个人发出的报价 -->
<template lang="html">
  <div class="person_offer">
    <div class="offer_pic">
      <img src="../../static/img/receipt.png" alt="">
    </div>
    <div class="offer_w_con">
      <div class="offer_title_external">
        <p class="offer_title">
          <el-row>
            <el-col :span="7">
              <router-link to="/release/Receipt/ReceiptAll"
                           tag="div" class="offer_tit" @click.native="ReceiptAll()" :class="{offer:color==1}" ref="one"
              >全部
                <span class="person_offer_add"></span>
                <span class="person_offer_triangle"></span>
              </router-link></el-col>

            <el-col :span="4"><router-link to="/release/Receipt/offerPrices" tag="div"
                                           class="offer_tit" @click.native="offerPri()" :class="{offer:color==2}"
            >&nbsp;&nbsp;&nbsp;已接单
              <span class="person_offer_add"></span>
              <span class="person_offer_triangle" ref="Receipt_triangle_prices"></span>
            </router-link></el-col>

            <el-col :span="4"><router-link to="/release/Receipt/offerCancel" tag="div" class="offer_tit offer_choesT" @click.native="offerCan()"
                                           :class="{offer:color==3}" 
            >待接单

              <span class="person_offer_add"></span>
              <span class="person_offer_triangle" ref="Receipt_triangle_cancel"></span>
            </router-link></el-col>



          <!--   <el-col :span="5"><router-link to="/release/Receipt/offerConfirm" tag="div" class="offer_tit offer_choesT" @click.native="offerCan1()"
                                           :class="{offer:color==4}"
            >卖家已确认
              <span class="person_offer_add"></span>
              <span class="person_offer_triangle" ref="Receipt_triangle_confirm"></span>
            </router-link></el-col> -->


            <el-col :span="4"><router-link to="/release/Receipt/offerInvalid" tag="div" class="offer_tit offer_choesT" @click.native="offerCan2()"
                                           :class="{offer:color==5}"
            >已失效
              <span class="person_offer_add"></span>
              <span class="person_offer_triangle" ref="Receipt_triangle_invalid"></span>
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
      ReceiptAll(){
        this.color=1;
        console.log(this)
      },
      offerPri(){
        this.color=2;
        this.$refs.Receipt_triangle_prices.style.right='-9%'
        console.log(this)
      },
      offerCan(){
        this.color=3;
        this.$refs.Receipt_triangle_cancel.style.right='-9%'
      },
      offerCan1(){
        this.color=4;
        this.$refs.Receipt_triangle_confirm.style.right='-9%'
      },
      offerCan2(){
        this.color=5;
        this.$refs.Receipt_triangle_invalid.style.right='-9%'
      }
    },
    created(){
      if (this.$route.path == "/release/Receipt/ReceiptAll") {
        this.color = 1
      }else if(this.$route.path =="/release/Receipt/offerPrices"){
        this.color =2
      }else if(this.$route.path == "/release/Receipt/offerCancel"){
        this.color =3
      }else if(this.$route.path ==  "/release/Receipt/offerInvalid"){
        this.color = 5
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
          height: 80px;
          width: 100%;
        }
    }
    .offer_w_con{
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    .offer_title_external{
      width: 100%;
      height:50px;
      position: relative;
      .offer_title{
        min-height: 36px;
        line-height: 36px;
        margin-left: 1%;
        border-bottom: 3px solid #F15749;
        background: white;
        position: absolute;
        bottom: 0;
        width: 49%;
        .offer{
          background: #F15749;
          color:white;
          position: relative;
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
          .person_offer_add{
            width: 100%;
            position: absolute;
            top:-40%;
            left:0;
            background: #F15749;
          }
        }
        .offer_tit{
          cursor:pointer;
        }
      }
    }
  }
}
</style>
