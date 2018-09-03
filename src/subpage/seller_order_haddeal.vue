<!-- 卖家已成交的订单 -->
<template lang="html">
  <div class="seller_order_haddeal">
    <div class="seller_order_mes">
      <el-row>
        <el-col :span="3"><div class="seller_mes_title">票据类型</div></el-col>
        <el-col :span="3"><div class="seller_mes_title bank">承兑银行</div></el-col>
        <el-col :span="3"><div class="seller_mes_title">金额</div></el-col>
        <el-col :span="3"><div class="seller_mes_title date">到期日</div></el-col>
        <el-col :span="3"><div class="seller_mes_title">剩余天数</div></el-col>
        <el-col :span="3"><div class="seller_mes_title amount">报价</div></el-col>
        <el-col :span="3"><div class="seller_mes_title">买家</div></el-col>
        <el-col :span="3"><div class="seller_mes_title opera">状态</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="seller_mes">电银</div></el-col>
        <el-col :span="3"><div class="seller_mes bankMes">中国招商银行朝阳分行</div></el-col>
        <el-col :span="3"><div class="seller_mes">100W</div></el-col>
        <el-col :span="3"><div class="seller_mes date">2018-07-30</div></el-col>
        <el-col :span="3"><div class="seller_mes">7天</div></el-col>
        <el-col :span="3"><div class="seller_mes amountMes">
          <span class="interest">年化：<span>10%</span></span>
          <span class="premium">每10w加：<span>***</span></span>
        </div></el-col>
        <el-col :span="3"><div class="seller_mes buyer">
          <span>赵经理</span>
          <span>13240891337</span>
        </div></el-col>
        <el-col :span="3"><div class="seller_mes opera">
          已成交
        </div></el-col>
      </el-row>
      <p class="seller_order_contact">
        <span>张家湾****有限公司</span>
        <span class="pople">赵经理</span>
        <span>13240891337</span>
        <button type="button" name="button">详情</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.seller_order_haddeal{
  width: 100%;
  height:100%;
  .seller_order_mes{
    width: 90%;
    border:1px solid #ccc;
    border-bottom:0;
    margin-top:3%;
    .seller_mes_title{
      background: #ebebeb;
      min-height: 30px;
      line-height: 30px;
      border-bottom:1px solid #ccc;
    }
    .bank{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .date{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .amount{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .opera{
      border-left:1px solid #ccc;
    }
    .seller_mes{
      min-height: 70px;
      max-height:70px;
      line-height: 70px;
      font-size: 12px;
      border-bottom:1px solid #ccc;
    }
    .bankMes{
      line-height: 18px;
      padding-top:18%;
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .amountMes{
      line-height: 0;
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
      display: flex;
      flex-direction: column;
      .interest{
        height:35px;
        line-height: 35px;
        border-bottom:1px solid #ccc;
      }
      .premium{
        height:35px;
        line-height: 35px;
      }
    }
    .buyer{
      padding-top:16%;
      line-height: 20px;
    }
    .seller_order_contact{
      width:100%;
      min-height: 40px;
      border-bottom:1px solid #ccc;
      line-height: 40px;
      font-size: 14px;
      position: relative;
      button{
        position: absolute;
        right:2%;
        min-height: 28px;
        width: 12%;
        top:14%;
        color:white;
        border-radius:3px;
        background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      }
      .pople{
        margin-left: 80px;
        margin-right: 40px;
      }
    }
  }
}
</style>
