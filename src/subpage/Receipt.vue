<!-- 用户个人发出的报价 -->
<template lang="html">
  <div class="person_offer">
    <div class="offer_pic">
      <img src="../../static/img/receipt.png" alt="">
    </div>
    <div class="offer_title_external">
      <p class="offer_title">
        <el-row>
          <el-col :span="7">
            <router-link to="/release/Receipt/ReceiptAll"
                         tag="div" class="offer_tit" @click.native="ReceiptAll()" :class="{offer:color==1}" ref="one"
            >全部资源池交易
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



          <el-col :span="5"><router-link to="/release/Receipt/offerCancel" tag="div" class="offer_tit offer_choesT" @click.native="offerCan1()"
                                         :class="{offer:color==4}"
          >卖家已确认
            <span class="person_offer_add"></span>
            <span class="person_offer_triangle" ref="Receipt_triangle_cancel"></span>
          </router-link></el-col>


          <el-col :span="4"><router-link to="/release/Receipt/offerCancel" tag="div" class="offer_tit offer_choesT" @click.native="offerCan2()"
                                         :class="{offer:color==5}"
          >已失效
            <span class="person_offer_add"></span>
            <span class="person_offer_triangle" ref="Receipt_triangle_cancel"></span>
          </router-link></el-col>

        </el-row>
      </p>
    </div>
    <div class="person_offer_view">
      <router-view></router-view>
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
        console.log(this)
      },
      // offerAcc(){
      //   this.color=2;
      // },
      offerPri(){
        this.color=2;
        // this.$refs.Receipt_triangle_prices.style.right='-9%'
      },
      offerCan(){
        this.color=3;
        this.$refs.Receipt_triangle_cancel.style.right='-9%'
      },
      offerCan1(){
        this.color=4;
        this.$refs.Receipt_triangle_cancel.style.right='-9%'
      },
      offerCan2(){
        this.color=5;
        this.$refs.Receipt_triangle_cancel.style.right='-9%'
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
      margin-top: 2%;
      text-align: left;
      margin-left: 1%;
      img{
        width:100%;
        height:80%;
      }
    }
    .offer_title_external{
      width: 100%;
      height:50px;
      position: relative;
      .offer_title{
        width: 60%;
        min-height: 36px;
        line-height: 36px;
        margin-left: 4%;
        border-bottom: 1px solid #F15749;
        background: white;
        position: absolute;
        bottom:0;
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
            height:14px;
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
    .person_offer_view{
      min-height: 500px;
    }
  }
</style>
