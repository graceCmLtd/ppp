<!-- 买家审核中的票据 -->
<template lang="html">
  <div class="person_audit">
    <p class="person_audit_title">
      <span>正在审核中的票据</span>
    </p>
    <div class="audit_table">
      <el-row>
        <el-col :span="3"><div class="audit_title">票据类型</div></el-col>
        <el-col :span="4"><div class="audit_title bank">承兑银行</div></el-col>
        <el-col :span="3"><div class="audit_title">金额</div></el-col>
        <el-col :span="3"><div class="audit_title date">到期日</div></el-col>
        <el-col :span="3"><div class="audit_title">剩余天数</div></el-col>
        <el-col :span="4"><div class="audit_title results">审核结果</div></el-col>
        <el-col :span="4"><div class="audit_title">原因</div></el-col>
      </el-row>
      <el-row v-for="(item,index) in roteList" :key="index">
        <el-col :span="3"><div class="audit_mes">{{item.type}}</div></el-col>
        <el-col :span="4"><div class="audit_mes bank">{{item.bank}}</div></el-col>
        <el-col :span="3"><div class="audit_mes">{{item.amount}}</div></el-col>
        <el-col :span="3"><div class="audit_mes date">{{item.date}}</div></el-col>
        <el-col :span="3"><div class="audit_mes">{{item.time}}</div></el-col>
        <el-col :span="4"><div class="audit_mes results">{{item.status}}</div></el-col>
        <el-col :span="4"><div class="audit_mes">{{item.why}}</div></el-col>
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
          type:'电银',
          bank:'中国银行',
          amount:'100W',
          date:'2018-07-30',
          time:'7天',
          status:'审核不通过',
          why:'图片不够清晰'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.person_audit{
  width: 100%;
  height:100%;
  padding-top:5%;
  .person_audit_title{
    width: 85%;
    border-bottom:1px solid #979797;
    margin: 0 auto;
    text-align: left;
    span{
      padding-bottom: .5%;
      border-bottom: 4px solid #FF4329;
      font-size: 18px;
      color:#FF4329;
      font-weight: bold;
    }
  }
  .audit_table{
    width: 85%;
    margin: 0 auto;
    margin-top: 3%;
    border:1px solid #ccc;
    border-bottom:0;
    .audit_title{
      background: #ebebeb;
      line-height: 40px;
      min-height: 40px;
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
    .results{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
    }
    .audit_mes{
      min-height: 100px;
      border-bottom:1px solid #ccc;
      line-height: 100px;
      font-size: 14px;
    }
  }
}
</style>
