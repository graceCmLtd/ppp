<!-- 买家资源池 -->
<template lang="html">
  <div class="person_order">
    <p  class="order_title_chsoe">
      <el-row>
        <el-col :span="6"><div class="order_title">全部资源池交易</div></el-col>
        <el-col :span="5"><div class="order_title turn">待您确认</div></el-col>
        <el-col :span="4"><div class="order_title">审核中</div></el-col>
        <el-col :span="4"><div class="order_title deal">已成交</div></el-col>
        <el-col :span="5"><div class="order_title">我毁约的</div></el-col>
      </el-row>
    </p>
    <div class="order_mes">
      <el-row>
        <el-col :span="3"><div class="mes_title">票据类型</div></el-col>
        <el-col :span="3"><div class="mes_title bank">承兑银行</div></el-col>
        <el-col :span="3"><div class="mes_title">金额</div></el-col>
        <el-col :span="3"><div class="mes_title date">到期日</div></el-col>
        <el-col :span="3"><div class="mes_title">剩余天数</div></el-col>
        <el-col :span="3"><div class="mes_title off">报价</div></el-col>
        <el-col :span="3"><div class="mes_title">状态</div></el-col>
        <el-col :span="3"><div class="mes_title oper">操作</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="mes_details">电银</div></el-col>
        <el-col :span="3"><div class="mes_details bank">中国银行</div></el-col>
        <el-col :span="3"><div class="mes_details">100W</div></el-col>
        <el-col :span="3"><div class="mes_details date">2018-07-30</div></el-col>
        <el-col :span="3"><div class="mes_details">7天</div></el-col>
        <el-col :span="3"><div class="mes_details offMes">
          <span class="limit">年化:10%</span>
          <span class="premium">每10w加:</span>
        </div></el-col>
        <el-col :span="3"><div class="mes_details">状态</div></el-col>
        <el-col :span="3"><div class="mes_details operMes">
          <p><button type="button" name="button">确认交易</button></p>
          <p><button type="button" name="button" @click="showOper()">我要毁约</button></p>
        </div></el-col>
      </el-row>
      <p class="contact">
        <span class="bankId">张家湾****贸易有限公司</span>
        <span class="bankId" style="margin-left:6%;">赵总</span>
        <span class="bankId" style="margin-left:6%;">13900323434</span>
        <button type="button" name="button">详情</button>
      </p>
    </div>
    <div class="mes_box" ref="mes_box">
      <span>
        <img src="../../static/img/Logo.png" alt="">
      </span>
      <p>毁约将影响您在平台的信用，超过5次毁约降</p>
      <p>平台信用评级，交易手续费将相应调整，恶意毁</p>
      <p>约多次，经工作人员查实将封号</p>
      <p class="order_oper">
        <button type="button" name="button">我要交易</button>
        <button type="button" name="button">确认要毁约</button>
      </p>
    </div>
    <div class="mes_mask" v-show="orderShow" @click="hideOper()">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      orderShow:false,
      noteList:[]
    }
  },
  methods:{
    showOper(){
      let _this=this;
      _this.orderShow=true;
      _this.$refs.mes_box.style.top="30%";
      _this.$refs.mes_box.style.opacity="1";
    },
    hideOper(){
      let _this=this;
      setTimeout(()=>{
        _this.orderShow=false;
      },500)
      _this.$refs.mes_box.style.top="15%";
      _this.$refs.mes_box.style.opacity="0";
    },
    getOrder(){
      let _this=this;
      _this.axios.get(this.oUrl+'/quote/getByQuoterId?quoterId=b7138b09c85b4bf6a9da174cb165085e').then((res)=>{
        console.log(res)
      })
    }
  },
  created(){
    this.getOrder()
  }
}
</script>

<style lang="scss">
.person_order{
  width: 100%;
  height:100%;
  padding-top:10%;
  .order_title_chsoe{
    width: 60%;
    margin-left: 4%;
    border:1px solid #ccc;
    .order_title{
      min-height: 36px;
      line-height: 36px;
      cursor:pointer;
    }
    .turn{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .deal{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .order_title:hover{
      background:linear-gradient(180deg,rgba(255,120,83,1),rgba(255,67,41,1));
      color:white;
    }
  }
  .order_mes{
    width: 85%;
    margin-left: 4%;
    border:1px solid #ccc;
    border-bottom:0;
    margin-top: 3%;
    .mes_title{
      min-height: 36px;
      line-height: 36px;
      background: #ebebeb;
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
    .off{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .oper{
      border-left:1px solid #ccc;
    }
    .mes_details{
      min-height: 70px;
      line-height: 70px;
      border-bottom:1px solid #ccc;
      font-size: 14px;
    }
    .contact{
      width: 100%;
      min-height: 36px;
      border-bottom:1px solid #ccc;
      line-height: 36px;
      font-size: 14px;
      text-align: left;
      box-sizing: border-box;
      padding-left:20%;
      position: relative;
      button{
        width:80px;
        height:26px;
        border-radius:3px;
        font-size: 12px;
        background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
        color:white;
        position: absolute;
        right:2%;
        top:15%;
      }
    }
    .offMes{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
      line-height: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      span{
        width: 100%;
        height:35px;
        text-align: left;
        padding-left:12%;
        line-height: 35px;
        font-size: 12px;
        box-sizing: border-box;
      }
      .limit{
        border-bottom:1px solid #ccc;
      }
    }
    .operMes{
      border-left:1px solid #ccc;
      line-height: 0;
      display: flex;
      flex-direction: column;
      p{
        width: 100%;
        height:35px;
        line-height: 35px;
      }
      button{
        background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
        border-radius:5px;
        color:white;
      }
      p:nth-child(2){
        button{
          background: white;
          color:#FE452C;
          border:1px solid #FE452C;
        }
      }
    }
  }
  .mes_box{
    width: 500px;
    height:300px;
    background: white;
    position: absolute;
    z-index: 601;
    top:15%;
    left:50%;
    margin-left:-250px;
    padding-top:2%;
    transition: all .5s;
    opacity: 0;
    span{
      width: 150px;
      height:70px;
      margin-bottom:4%;
      img{
        width: 100%;
        height:100%;
      }
    }
    p{
      width: 100%;
      text-align: center;
    }
    .order_oper{
      width: 100%;
      margin-top: 10%;
      button{
        min-height: 40px;
        width: 20%;
        border-radius:5px;
        background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
        color:white;
      }
      button:nth-child(1){
        margin-right:10px;
      }
      button:nth-child(2){
        margin-left: 10px;
      }
    }
  }
  .mes_mask{
    width: 100%;
    height:100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 600;
  }
}
</style>
