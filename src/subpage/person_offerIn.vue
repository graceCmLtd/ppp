<!-- 用户报价中的票据 -->
<template lang="html">
  <div class="person_offerIn" style="overflow-y: scroll; overflow-x: hidden;">

    <el-row  v-for="(item,index) in noteList" :key = "index">

      <div @click="onSelect(index)" style="border: 1px solid #eee; background: #fff; margin-top:-7px; height: 150px;  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);">
        <el-row >
          <el-col><div class="person_offerIn_title" id="name_w" style="margin-top: 5px;">{{item.acceptor}}</div></el-col>

          <el-col><div class="person_offerIn_title limit" id="name_w_limit">{{item.amount/10000}}w</div></el-col>
          <el-col><div class="person_offerIn_title">剩余天数:{{item.remain_days}}天</div></el-col>
          <el-col><div class="person_offerIn_title time">到期日:{{item.maturity}}</div></el-col>
          <el-col><div class="person_offerIn_title" style="text-align:center;">{{item.releaseDate}}</div></el-col>
        </el-row>
      </div>
    </el-row>

    <!--<el-row v-for="(item,index) in noteList" :key="index">
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
    </el-row>-->
    <!-- <person-paper  :noteL = 'noteDetail' ></person-paper> -->
  </div>


</template>

<script>
  import {getCookie} from '@/assets/util'
  /*import personPaper from '@/subpage/person_paper'*/
  export default {
    data(){
      return{
        noteList:[],
        index:0,
        billNumber:'',
        noteDetail:[],
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes"
      }
    },
    /*components: {
      personPaper
    },*/
    methods:{

      getBillNum(){
        //this.billN = this.billN+1;
      console.log("get billNumber in 11.....")
      this.$emit("transb",this.billNumber)
      //console.log(res)
    },
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
          console.log("我的求贴 全部报价 ")
          console.log(res)
          this.noteList=res.data;
        })
      },
      onSelect(index){
        console.log("on select the item ....")
        console.log(index)
        this.index = index
        var arr = new Array(this.noteList[index])
        this.noteDetail = arr
        //console.log(this.noteList[index])
        this.billNumber=this.noteList[index].billNumber;
        console.log(this.noteList[index].billNumber)
        this.getBillNum()
        //this.$emit("transb")
      }
    },
    created(){
      this.getPaper()

    }
  }
</script>

<style lang="scss" scoped>
  .person_offerIn{
    width: 290px;
    height: 424px;
    margin-top: -2%;
    margin-left: -4%;
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
    font-size:16px;
    letter-spacing: 1px;

  }
  #name_w_limit{
   font-weight: bold;
    color: #F15749;
    letter-spacing: 1px;
    position: relative;
    top: 48px;
    left: 16px;
    font-size: 24px;
  }

</style>
