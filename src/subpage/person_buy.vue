<template lang="html">
  <div class="person_buy">
    <div class="person_buy_pic">
      <img src="../../static/img/process.png" alt="">
    </div>
    <div class="person_buy_list">
      <el-row>
        <el-col :span="5"><div class="person_buy_title">公司名称</div></el-col>
        <el-col :span="5"><div class="person_buy_title limit">成交额</div></el-col>
        <el-col :span="4"><div class="person_buy_title">剩余天数</div></el-col>
        <el-col :span="5"><div class="person_buy_title date">到期日</div></el-col>
        <el-col :span="5"><div class="person_buy_title">交易时间</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="person_buy_mes">恒大广州集团</div></el-col>
        <el-col :span="5"><div class="person_buy_mes limit">100W</div></el-col>
        <el-col :span="4"><div class="person_buy_mes">5天</div></el-col>
        <el-col :span="5"><div class="person_buy_mes date">2018-07-30</div></el-col>
        <el-col :span="5">
          <div class="person_buy_mes time">
            <span class="de_date">2018-07-30</span>
            <span class="de_time">00:00:00</span>
          </div>
      </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.person_buy{
  width: 100%;
  height:100%;
  .person_buy_pic{
    width: 100%;
    height:30%;
    img{
      width: 100%;
      height:100%;
    }
  }
  .person_buy_list{
    width: 90%;
    margin-left: 10%;
    border:1px solid #ccc;
    border-bottom:0;
    .person_buy_title{
      min-height: 40px;
      line-height: 40px;
      border-bottom:1px solid #ccc;
    }
    .limit{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .date{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .person_buy_mes{
      min-height: 100px;
      border-bottom:1px solid #ccc;
      line-height: 100px;
      font-size: 14px;
    }
    .time{
      line-height: 0;
      display: flex;
      flex-direction: column;
      .de_date{
        width: 100%;
        height:50px;
        line-height: 70px;
      }
      .de_time{
        width: 100%;
        height:50px;
        line-height: 30px;
      }
    }
  }
}
</style>
