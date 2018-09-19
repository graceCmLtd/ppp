<!-- 发布资源池报价 -->
<template lang="html">
  <div class="content">
    <div class="content_w1_title" style="margin-top:68px;">
      <span>发布/修改资源池报价</span>
    </div>

    <!-- 导航内容 -->
    <div class="person_offer_all">
      <div class="offer_mes">
        <el-row>
          <el-col :span="4"><div class="mes_title">票面金额</div></el-col>
          <el-col :span="4"><div class="mes_title">期限</div></el-col>
          <el-col :span="4"><div class="mes_title">国有+国股</div></el-col>
          <el-col :span="3"><div class="mes_title">大商</div></el-col>
          <el-col :span="3"><div class="mes_title">授信城商</div></el-col>
          <el-col :span="3"><div class="mes_title">村镇银行</div></el-col>
          <el-col :span="3"><div class="mes_title">操作</div></el-col>
        </el-row>
      </div>
    </div>
<!-- 内容 -->
     <div class="" v-for="(item,index) in noteList" :key="index">
        <el-row >
          <el-col :span="4"><div class="mes">{{item.billType}}</div></el-col>
          <el-col :span="4"><div class="mes bank" ref="person_offer_all_bank"                                
          >{{item.acceptor}}</div></el-col>
          <el-col :span="4"><div class="mes">{{item.amount}}</div></el-col>
          <el-col :span="3"><div class="mes date">{{item.maturity}}</div></el-col>
          <el-col :span="3"><div class="mes">{{item.remain_days}}</div></el-col>
          <el-col :span="3"><div class="mes amount mes_chose">
            <div class="premium">
              <p>{{item.real_money/10000}}W</p>
            </div>
          </div></el-col>
          <el-col :span="3"><div class="mes pula">
            <span>{{item.intentionStatus}}</span>
          </div></el-col>
          <el-col :span="3"><div class="mes operaMes">
            <p><button type="button" name="button" @click="turnPlace(index)" style="background: #F2F2F2; color: #666; margin-top: 20px; width: 79px;">下一步</button></p>
          </div></el-col>
        </el-row>

        <div class="mes_bot">
          <p>
            <span>{{item.companyName}}</span>
          <span class="pople">{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none">&nbsp;&nbsp;&nbsp;QQ咨询</a></span>
            <button type="button" name="button">票据详情</button>
          </p>
        </div>
      </div>

    <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics(current_index)">

    </div>

  </div>
  </div>
</template>
<script>
  
</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    height:100%;
     background:rgba(255,255,255,1);
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    .content_w1_title{
      height: 61px;
      border-bottom:3px solid #F15749;
      span{
        width:190px;
        height:61px;
        font-size: 16px;
        font-family:"微软雅黑";
        font-weight:bold;
        color:#fff;
        /*line-height:26px;*/
        display: block;
        background: #F15749;
        line-height: 61px;
      }
   } 
     .person_offer_all{
    width: 100%;
    height:100%;
    .offer_mes{
      margin-left: 1%;
      margin-top: 1%;
      .mes_title{
        background: #F15749;
        min-width: 36px;
        line-height: 36px;
        font-weight: bold;
        color: #fff;
      }
      .lineHeight{
        line-height: 35px!important;
        font-size: 13px!important;
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
      .mes{
        margin-top:8px;
        margin-bottom:8px;
        min-height: 70px;
        line-height: 70px;
        font-size: 14px;
      }
      .opera{
        border-left:1px solid #ccc;
      }
      .mes_chose{
        display: flex;
        flex-direction: column;
        margin-top:8px;
        margin-bottom:8px;
        .rate{
          width: 100%;
          height:50%;
          margin-top: -3px;
          p{
            width: 100%;
            text-align: center;
            border-bottom:1px solid #ccc;
            height:100%;
            line-height: 35px;
            font-size: 14px;
          }
        }
        .premium{
          width: 100%;
          height:50%;
          p{
            width: 100%;
            line-height: 72px;
            font-size: 14px;
          }
        }
      }
      .operaMes{
        border-left:1px solid #ccc;
        line-height: 0;
        display: flex;
        flex-direction: column;
        p{
          width: 100%;
          height:35px;
          line-height: 35px;
          button{
            min-width: 60px;
            height:30px;
            border-radius: 3px;
            background: #F15749;
            color:white;
          }
        }
        p:nth-child(2){
          button{
            background: white;
            border:1px solid #F15749;
            color:#F15749;

          }
        }
      }
      .mes_bot{
        min-height: 36px;
        line-height: 36px;
        font-size: 14px;
        position: relative;
        background: #EFF8FF;
        p{
          width: 60%;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          button{
            width:105px;
            height:30px;
            border-radius:3px;
            background: #F15749;
            color:white;
            position: absolute;
            right:2%;
            top:12%;
          }
        }
      }

    }

  }
}
</style>
