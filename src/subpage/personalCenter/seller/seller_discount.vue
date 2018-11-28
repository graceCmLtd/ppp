<!-- 用户报价中的票据 -->
<template lang="html">
  <div class="seller_discount" style="overflow-y:auto; overflow-x:hidden;">

    <el-row  v-for="(item,index) in noteList" :key = "index">
      <div @click="onSelect(index)" class="list" style="border: 1px solid #eee; background: #fff; margin-top:-7px; height: 150px;  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2); position:relative;">
        <el-row >
          <el-col><div class="seller_discount_title" id="name_w" style="margin-top: 5px;" :title="getValue(index)">{{item.acceptor}}</div></el-col>

          <el-col><div class="seller_discount_title limit" id="name_w_limit">{{formatNumToStr(item.amount)}}</div></el-col>
          <p style="float:right;width:120px; font-size:14px; height:50px; line-height:25px; padding-top:-5px;">
          <el-col><div class="seller_discount_title">剩余天数:<i style="font-style:normal; color:#F15749; font-size:15px;">{{item.remain_days}}天</i></div></el-col>
          <el-col><div class="seller_discount_title time">到期日:<i style="font-style:normal; font-size:14px; font-weight:bold;">{{item.maturity}}</i></div></el-col>
          </p>
          <el-col><div class="seller_discount_title" style="text-align:center; font-size:13px;color:#666; line-height:32px;">{{item.releaseDate}}</div></el-col>

          <el-col><div  @click="delItem(index)" class="seller_discount_title" style="font-size:13px; font-weight:bold; color:#F15749;text-align:center; position:absolute; top:10px; right:10px;cursor: pointer; " title="删除">删除</div></el-col>
        </el-row>
      </div>
    </el-row>

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
      //console.log("get billNumber in 11.....")
      this.$emit("transb",this.billNumber)
      ////console.log(res)
    },
      getPaper(){
        let Id=getCookie('Iud');
        this.fetch.myPost('/bills/getMyBillsQuoted',{
            "uuid":Id,
            "filter":1,
            "billReferer":"传统渠道"
          },
          {headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }}
        ).then((res)=>{
          // //console.log("我的求贴 全部报价 ")
          //console.log(res)
          this.noteList=res.data;
        })
      },
      getValue(index){
        return this.noteList[index].acceptor
      },
      onSelect(index){
        // //console.log("on select the item ....")
        // //console.log(index)
        this.index = index
        var arr = new Array(this.noteList[index])
        this.noteDetail = arr
        ////console.log(this.noteList[index])
        this.billNumber=this.noteList[index].billNumber;
        //console.log(this.noteList[index].billNumber)
        this.getBillNum()
        //this.$emit("transb")
      },
      // 删除
        delItem: function(index){
          this.noteList.splice(index,1);
      },
    },
    created(){
      this.getPaper()

    },
    filters: {
      numFilter(value) {
        let realVal = Number(value).toFixed(2)
        return Number(realVal)
        }
      },
  }
</script>

<style lang="scss" scoped>
  .seller_discount{
    width: 290px;
    height: 424px;
    margin-top: -1%;
    margin-left: -4%;  
    .seller_discount_mes{
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
    font-size:14px;
    letter-spacing: 1px;
    max-width:160px;
    margin:0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor:pointer;
    text-align:center;
  }
  #name_w_limit{
   font-weight: bold;
    color: #F15749;
    letter-spacing: 1px;
    position: relative;
    top: 7px;
    left: 10px;
    font-size: 22px;
  }
#seller_discount_title_w{
  text-align:right;
}
</style>
