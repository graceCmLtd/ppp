<!-- 用户审核中的票据 -->
<template lang="html">
  <div class="person_offerBe">
    <!-- <h2 style="height: 142px; margin-left: -427px;">用户审核中的票据</h2> -->
  <el-row  v-for="(item,index) in noteList" :key = "index">

      <div @click="onSelect(index)" style="border: 1px solid #eee; background: #fff; margin-top:-7px; height: 150px;  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);">
        <el-row >
          <el-col><div class="person_offerIn_title" id="name_w" style="margin-top: 5px;" :title="getValue(index)">{{item.acceptor}}</div></el-col>

          <el-col><div  id="name_w_limit" >{{item.amount/10000 | numFilter}}w</div></el-col>
          <p style="float:right;width:120px; font-size:14px; height:50px; line-height:25px; padding-top:-5px;">
          <el-col><div class="person_offerIn_title">剩余天数:<i style="font-style:normal; color:#F15749; font-size:15px;">{{item.remain_days}}天</i></div></el-col>
          <el-col><div class="person_offerIn_title time">到期日:<i style="font-style:normal; font-size:14px; font-weight:bold;">{{item.maturity}}</i></div></el-col>
          </p>
           <el-col><div class="person_offerIn_title" style="text-align:center; font-size:13px;color:#666; line-height:32px;">{{item.releaseDate}}</div></el-col>
          <el-col><div  @click="delItem(index)" class="person_offerIn_title" style="font-size:13px; font-weight:bold; color:#F15749;text-align:center; position:absolute; top:10px; right:10px;cursor: pointer; " title="删除">删除</div></el-col>
        </el-row>
      </div>
    </el-row>
  </div>

  <!--  <person-paper noteList = 666></person-paper> -->


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
            "filter":4
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log("我的求贴 全部报价 ")
          console.log(res)
          this.noteList=res.data;
          if (!this.noteList.length ==0) {
            this.billNumber=this.noteList[this.index].billNumber
          }
          
          this.getBillNum()
        })
      },
      onSelect(index){
        console.log("on select the item ....")
        console.log(index)
        this.index = index
        var arr = new Array(this.noteList[index])
        this.noteDetail = arr
        this.billNumber=this.noteList[index].billNumber;
        this.getBillNum()
      },
        getValue(index){
        return this.noteList[index].acceptor
      },
      // 删除
        delItem: function(index){
          this.noteList.splice(index,1);
      },
    },
    created(){
      this.getPaper()
    /*定时刷新页面*/
    let _this = this
    let timer = window.setInterval(function(){
      if (_this.$route.path == '/release/paper/offerIn') {
        _this.getPaper()
        console.log("in timer")
      }else{
        window.clearInterval(timer)
        console.log("shutdown timer")
      }
      
    },_this.GLOBAL.flushSeconds)
    /*定时刷新页面 end*/
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
  .person_offerBe{
    width: 272px;
    height: 424px;
    overflow-y:auto;
    overflow-x:hidden;
    margin-top: -1%;
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
    font-size:14px;
    letter-spacing: 1px;
    text-align:center;
    max-width:160px;
    margin:0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor:pointer;
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
#person_offerIn_title_w{
  text-align:right;
}
</style>

