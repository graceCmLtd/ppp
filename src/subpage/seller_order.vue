<!-- 卖家订单 -->
<template lang="html">
  <div class="seller_order">
    <div class="seller_order_con">
      <div class="seller_order_title">
        <el-row>

          <el-col :span="12"><router-link
            to="/release/sellerorder/haddeal" tag="div"
            class="order_title" :class="{sellerAc:color==1}"
            @click.native="hadOrder()"
            >已完成</router-link></el-col>
          <el-col :span="12"><router-link
            to="/release/sellerorder/cancel" tag="div"
            class="order_title confirmed" :class="{sellerAc:color==2}"
            @click.native="cancelOrder()"
            >已失效</router-link></el-col>
        </el-row>
      </div>
      <div class="seller_order_view">
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
    hadOrder(){
      this.color=1;
    },
    cancelOrder(){
      this.color=2;
    }
  }
}
</script>

<style lang="scss" scoped>
.seller_order{
  width: 100%;
  height:100%;
  .seller_order_con{
    width: 96%;
    margin-left:4%;
    margin-top:8%;
    .seller_order_title{
      width: 35%;
      border:1px solid #ccc;
      .sellerAc{
        background: linear-gradient(180deg,rgba(255,120,83,1),rgba(255,67,41,1));
        color:white;
      }
      .order_title{
        min-height: 32px;
        line-height: 32px;
        cursor:pointer;
      }
      .confirmed{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .rejected{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
    }
  }
}
</style>
