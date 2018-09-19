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
     <div class="color_w" v-for="(item,index) in noteList" :key="index">
        <el-row style="height:77px; line-height:77px;">
          <el-col :span="4"><div class="mes">10w-50w</div></el-col>
          <el-col :span="4"><div class="mes bank" ref="person_offer_all_bank"                                
          >3个月以下</div></el-col>
          <el-col :span="4"><div class="mes">4.5</div></el-col>
          <el-col :span="3"><div class="mes date">5.34%</div></el-col>
          <el-col :span="3"><div class="mes">3.7%</div></el-col>
          <el-col :span="3"><div class="mes">4.52%</div></el-col>
          <el-col :span="3"><div class="mes pula">
            <p>
              <a style="font-style: normal;width:120px;height:50px;background:#F15749;border-radius:4px;color:#fff;display:inline;">修改</a>
              <a style="font-style: normal;width:120px;height:50px;background:#53C0FF;border-radius:4px;color:#fff;display:inline;">删除</a>
            </p>
          </div></el-col>
        </el-row>

      </div>
    <div class="add_w">
      <span>增加报价</span>
    </div>
    <div class="edit_w">
      <a class="note_w">默认备注：详细价格联系方式详谈</a>
      <a class="edit_wq">编辑备注</a>
    </div>

    <div class="bottom_foot">
      <a>回到资源市场</a>
      <a>查看我的资源池报价</a>
    </div>

  </div>
</template>
<script>
  import {getCookie} from '@/assets/util'
  export default {
    data(){
      return{
        noteList:[],
        day:null,
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        current_index:'',
        remain_days:null,
        marDay:[],
        pic : ''
      }
    },
    methods:{
      getReceiptAll(){
        let Id=getCookie('Iud');
        console.log(Id)
        this.axios.post(this.oUrl+'/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":"2"
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          let _this=this;
          console.log(res);
          _this.noteList=res.data;
          for(let v in res.data){
            // console.log(res.data[v].maturity)
            // _this.marDay=res.data[v].maturity;
            let date=new Date();
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let day=date.getDate();
            if(month>=1&&month<9){
              month='0'+month
            }
            let secDay=year+'/'+month+'/'+day;
            let secDayStamp=new Date(secDay).getTime()
            let timeAll=new Date(res.data[v].maturity).getTime();
            let lastDay=timeAll-secDayStamp;
            _this.day=Math.floor(lastDay/86400000)
            console.log(_this.day)
            _this.marDay.push(_this.day)
          }
          console.log(_this.marDay)
        })
      },
      linkToA(index){
        /*<a href="'tencent://message/?uin='+{{item.contactsQQ}}+'&Site=pengpengpiao.cn&Menu=yes'" style="text-decoration:none">{{item.contactsQQ}}qq咨询</a>*/
        let _this=this;
        let Id=getCookie('Iud');
        _this.linka = "tencent://message/?uin="+_this.noteList[index].contactsQQ+"&Site=pengpengpiao.cn&Menu=yes"
        //alert(index)
      },
      turnPlace(index){
        let _this=this;
        let billNum=_this.noteList[index].billNumber;
        _this.$router.push({
          name:'Detailed',
          query:{
            bills:billNum
          }
        })
      },

    },
    mounted(){
      this.getReceiptAll();
    }
  }
</script>
<style lang="scss" scoped>
color_w span:nth-child(odd){background:#F4F4F4;}
color_w span:nth-child(even){background:#C00;}
.color_w:hover{
        background: #fffbee;
        box-shadow: 0 0 15px rgba(0,0,0,.2);
        z-index: 1;
        cursor: pointer;
}
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
      margin-left: 0%;
      margin-top: 1%;
      .mes_title{
        background: #F15749;
        min-width: 36px;
        line-height: 50px;
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
.add_w{
  width:100%;
  height:77px;
  background:#EFF8FF;
  text-align: right;
  line-height:77px;
  padding:0 40px;
  span{
    width:120px;
    height:50px;
    background:rgba(83,192,255,1);
    box-shadow:0px 2px 4px 0px rgba(83,192,255,0.4);
    border-radius:4px 3px 3px 3px;
    color:#fff;
    line-height:50px;
    text-align:center;

  }
}
.edit_w{
  width:100%;
  height:77px;
  background:#FFFDEF;
  line-height:77px;
  margin: 0 auto;

  .note_w{
   width:280px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color: #333333;
    float:left;
  }
  .edit_wq{
    width:120px;
    height:50px;
    background:rgba(83,192,255,1);
    box-shadow:0px 2px 4px 0px rgba(83,192,255,0.4);
    border-radius:4px 3px 3px 3px;
    color:#fff;
    line-height:50px;
    float:right;
    margin-right: 36px;
    margin-top: 10px;
    background:#F15749;

  }
}
.bottom_foot{
  height:77px;
  line-height:77px;
  a{
    width:210px;
    height:50px;
    background:rgba(241,87,73,1);
    box-shadow:0px 2px 10px 0px rgba(241,87,73,0.5);
    border-radius:4px;
    color:#fff;
    display:inline-block;
    line-height:50px;
   margin:0 20px;
  }
}
</style>
