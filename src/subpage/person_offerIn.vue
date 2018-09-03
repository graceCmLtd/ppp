<!-- 用户报价中的票据 -->
<template lang="html">
  <div class="person_offerIn">
    <el-row>
      <el-col :span="5"><div class="person_offerIn_title">公司名称</div></el-col>
      <el-col :span="4"><div class="person_offerIn_title limit">成交额</div></el-col>
      <el-col :span="5"><div class="person_offerIn_title">剩余天数</div></el-col>
      <el-col :span="5"><div class="person_offerIn_title time">到期日</div></el-col>
      <el-col :span="5"><div class="person_offerIn_title">交易时间</div></el-col>
    </el-row>
    <el-row v-for="(item,index) in noteList" :key="index">
      <el-col :span="5"><div class="person_offerIn_mes"
        :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''"
        >{{item.acceptor}}</div></el-col>
      <el-col :span="4"><div class="person_offerIn_mes limit">{{item.amount/10000}}w</div></el-col>
      <el-col :span="5"><div class="person_offerIn_mes">{{item.releaseDate}}</div></el-col>
      <el-col :span="5"><div class="person_offerIn_mes time">{{item.maturity}}</div></el-col>
      <el-col :span="5"><div class="person_offerIn_mes tradTime">
        <span>2018-07-22</span>
        <span>00:00:00</span>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      noteList:[]
    }
  },
  methods:{
    getPaper(){
      let Id=getCookie('Iud');
      this.axios.post(this.oUrl+'/bills/getMyBillsQuoted',{
        "uuid":Id,
        "filter":1
      },
      {headers:{
        'Content-Type':'application/json'
      }}
    ).then((res)=>{
      console.log(res)
      this.noteList=res.data;
    })
    }
  },
  created(){
    this.getPaper()
  }
}
</script>

<style lang="scss" scoped>
.person_offerIn{
  width: 80%;
  height:100%;
  margin-top: 4%;
  margin-left: 4%;
  .person_offerIn_title{
    min-height: 36px;
    line-height: 36px;
    background: #eff8ff;
  }
  .person_offerIn_mes{
    min-height: 70px;
    line-height: 70px;
    font-size: 14px;
  }
  .lineHeight{
    line-height: 35px!important;
    font-size: 13px;
  }
  .tradTime{
    line-height: 0;
    display: flex;
    flex-direction: column;
    span{
      width: 100%;
      height:35px;
      line-height: 45px;
      font-size: 12px;
    }
    span:nth-child(2){
      line-height: 25px;
    }
  }
}
</style>
