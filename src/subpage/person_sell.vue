<!-- 我卖出的 -->
<template lang="html">
  <div class="person_sell">
    <div class="pic_sell">
      <img src="../../static/img/process.png" alt="">
    </div>
    <div class="sell_table">
      <el-row>
        <el-col :span="5"><div class="sell_title">公司名称</div></el-col>
        <el-col :span="5"><div class="sell_title limit">成交额</div></el-col>
        <el-col :span="4"><div class="sell_title">剩余天数</div></el-col>
        <el-col :span="5"><div class="sell_title date">到期日</div></el-col>
        <el-col :span="5"><div class="sell_title">交易时间</div></el-col>
      </el-row>
      <el-row v-for="(item,index) in roteList" :key="index">
        <el-col :span="5"><div class="sell_mes">{{item.company}}</div></el-col>
        <el-col :span="5"><div class="sell_mes limit">{{item.limit}}</div></el-col>
        <el-col :span="4"><div class="sell_mes">{{item.rema}}</div></el-col>
        <el-col :span="5"><div class="sell_mes date">{{item.date}}</div></el-col>
        <el-col :span="5"><div class="sell_mes tradTime">
          <span class="dateOf">{{item.dateA}}</span>
          <span class="timeOf">{{item.time}}</span>
        </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      roteList:[
        {
          company:'恒大广州集团',
          limit:'100W',
          rema:'5天',
          date:'2018-07-30',
          dateA:'2018-07-22',
          time:'00:00:00'
        },
        {
          company:'中国工商银行',
          limit:'100W',
          rema:'5天',
          date:'2018-07-30',
          dateA:'2018-07-22',
          time:'00:00:00'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.person_sell{
  width: 100%;
  height:100%;
  .pic_sell{
    width: 100%;
    height:30%;
    img{
      width: 100%;
      height:100%;
    }
  }
  .sell_table{
    width: 80%;
    margin: 0% auto;
    border:1px solid #ccc;
    border-bottom:0;
    .sell_title{
      min-height: 46px;
      line-height: 46px;
      background: #ebebeb;
      border-bottom: 1px solid #ccc;
    }
    .limit{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .date{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .sell_mes{
      min-height: 100px;
      line-height: 100px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
    }
    .tradTime{
      position: relative;
      margin-top:1px;
      .dateOf{
        width: 100%;
        text-align: center;
        position: absolute;
        left:0;
        top:-15%;
      }
      .timeOf{
        position: absolute;
        width: 100%;
        text-align: center;
        left:0;
        bottom:-15%;
      }
    }
  }
}
</style>
