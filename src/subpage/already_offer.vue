<template lang="html">
  <div class="already_offer">
    <div class="already_offer_con">
      <div class="offer_mes">
        <el-row>
          <el-col :span="4"><div class="offer_table">票据类型</div></el-col>
          <el-col :span="4"><div class="offer_table bank">承兑银行</div></el-col>
          <el-col :span="4"><div class="offer_table">金额</div></el-col>
          <el-col :span="4"><div class="offer_table date">到期日</div></el-col>
          <el-col :span="4"><div class="offer_table">剩余天数</div></el-col>
          <el-col :span="4"><div class="offer_table amount">报价</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="offer_mesT">电银</div></el-col>
          <el-col :span="4"><div class="offer_mesT bankName">中国银行</div></el-col>
          <el-col :span="4"><div class="offer_mesT">100W</div></el-col>
          <el-col :span="4"><div class="offer_mesT dateTo">2018/07/30</div></el-col>
          <el-col :span="4"><div class="offer_mesT">7天</div></el-col>
          <el-col :span="4"><div class="offer_mesT amountTurn">
            <div class="rate">
              <p>利率：</p>
            </div>
            <div class="premium">
              <p>每10w加：</p>
            </div>
          </div></el-col>
        </el-row>
        <p class="company">
          <span style="margin-left:3%;">张家湾****贸易有限公司</span>
          <span style="margin-left:8%;">赵总</span>
          <span style="margin-left:8%;">13240891337</span>
          <button type="button" name="button">交易</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components:{
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
.already_offer{
  width:100%;
  height:100%;
  min-width: 1378px;
  .already_offer_con{
    width: 60%;
    margin:0 auto;
    height:100%;
    padding-top:3%;
    .offer_mes{
      width: 100%;
      height:20%;
      border:1px solid #ccc;
      min-height: 200px;
      .offer_table{
        min-height:50px;
        line-height: 50px;
        border-bottom:1px solid #ccc;
        font-size: 15px;
        background: #ebebeb;
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
      }
      .offer_mesT{
        min-height: 102px;
        border:0;
        line-height: 102px;
        font-size: 15px;
      }
      .bankName{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .dateTo{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .amountTurn{
        border-left: 1px solid #ccc;
        display: flex;
        flex-direction:column;
        // height:152px;
        .rate{
          width: 100%;
          height:50%;
          p{
            width: 100%;
            text-align: center;
            border-bottom:1px solid #ccc;
            height:100%;
            line-height: 51px;
            font-size: 14px;
          }
        }
        .premium{
          width: 100%;
          height:50%;
          p{
            width: 100%;
            line-height: 51px;
            font-size: 14px;
          }
        }
      }
      .company{
        width: 100%;
        min-height: 50px;
        border-top:1px solid #ccc;
        line-height: 50px;
        text-align: left;
        position: relative;
        button{
          width: 105px;
          height:36px;
          background:linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
          border-radius:3px;
          color:white;
          right:2%;
          top:8%;
          position: absolute;
        }
      }
    }
  }
}
</style>
