<!-- 用户报价中的票据 -->
<template lang="html">
  <div class="person_offerIn">

    <el-row  v-for="(item,index) in noteList" :key = "index">
      <div @click="getDetail(index)" style="border: 1px solid #eee; background: #fff; margin-top:-7px; height: 142px;  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);">
        <el-row>
          <el-col><div class="person_offerIn_title" id="name_w">{{item.acceptor}}</div></el-col>
          <el-col><div class="person_offerIn_title limit" id="name_w_limit">{{item.amount/10000}}w</div></el-col>
          <el-col><div class="person_offerIn_title">剩余天数:124天</div></el-col>
          <el-col><div class="person_offerIn_title time">到期日:{{item.maturity}}</div></el-col>
          <el-col><div class="person_offerIn_title">发布日期:{{item.releaseDate}}</div></el-col>
        </el-row>
      </div>
    </el-row>

    <!-- <el-row v-for="(item,index) in noteList" :key="index">
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
    </el-row> -->
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
    },
    getDetail(index){
      console.log("see details .......")
    }
  },
  created(){
    this.getPaper()
  }
}
</script>

<style lang="scss" scoped>
.person_offerIn{
  width: 300px;
  height: 100%;
  margin-top: 1%;
  margin-left: 1%;
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
  #name_w{
    font-weight:bold;
    color: #666666;
    font-size:20px;
    letter-spacing: 1px;

  }
#name_w_limit{
  font-weight: bold;
  color: #F15749;
  letter-spacing: 1px;
  position: relative;
  top: 48px;
  left: -100px;
  font-size: 24px;
}

</style>
