<!-- 买家报价详情 -->
<template lang="html">
  <div class="person_offerDe">
    <p class="person_offerDe_title">买家收票价格</p>
    <p class="person_offerDe_pop">
      <span>买家：赵经理</span>
      <span>联系方式：13240891337</span>
    </p>
    <div class="person_offerDe_mes">
      <el-row>
        <el-col :span="4"><div class="offerDe_mes">国股</div></el-col>
        <el-col :span="5"><div class="offerDe_mes much">10w-49.8w</div></el-col>
        <el-col :span="5"><div class="offerDe_mes">12.28后到期加0.10</div></el-col>
        <el-col :span="5"><div class="offerDe_mes unknow">4.25+40</div></el-col>
        <el-col :span="5"><div class="offerDe_mes opera">
          <button type="button" name="button">去贴现</button>
        </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.person_offerDe{
  width: 100%;
  padding-top:3%;
  height:100%;
  .person_offerDe_title{
    width: 100%;
    text-align: left;
    padding-left:5%;
    font-size: 14px;
  }
  .person_offerDe_pop{
    width: 100%;
    margin-top:2%;
    text-align: left;
    padding-left:8%;
    font-size: 14px;
    span:nth-child(2){
      margin-left: 5%;
    }
  }
  .person_offerDe_mes{
    width: 96%;
    margin-left: 5%;
    border:1px solid #ccc;
    border-bottom:0;
    margin-top:5%;
    .offerDe_mes{
      min-height: 45px;
      line-height: 45px;
      border-bottom:1px solid #ccc;
    }
    .much{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .unknow{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .opera{
      button{
        min-width: 100px;
        min-height: 28px;
        background: linear-gradient(180deg,rgba(255,125,91,1),rgba(255,71,46,1));;
        border-radius:5px;
        color:white;
      }
    }
  }
}
</style>
